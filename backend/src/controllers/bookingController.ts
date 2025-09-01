import { Request, Response } from "express";
import { AppDataSource } from "../config/dbConnect";
import { Booking } from "../entities/Booking";
import { BookingSeat } from "../entities/BookingSeat";
import { Payment, PaymentStatus } from "../entities/Payment";
import { Seat } from "../entities/Seat";
import Stripe from "stripe";
import { ShowTime } from "../entities/ShowTime";
import { FindManyOptions, In } from "typeorm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-07-30.basil",
});

export const createBookingWithPaymentSession = async (req: Request, res: Response) => {

    const { userId, showTimeId, seatsIds, amount, FRONTEND_URL } = req.body;
    const qr = AppDataSource.createQueryRunner();

    await qr.connect();
    await qr.startTransaction();

    try {

        const showTime = await qr.manager.findOne(ShowTime, {
            where: { id: showTimeId },
            relations: ['theatre']
        })

        if(!showTime){
            return res.status(404).json({ status: "NOT_FOUND", message: "SHowTime not found." })
        }

        const seats = await qr.manager.find(Seat, {
            where: {
                id: In(seatsIds),
                theatre: { id: showTime.theatre.id }
            },
            lock: { mode: "pessimistic_write" }
        });


        if (seats.length !== seatsIds.length) {
            await qr.rollbackTransaction();
            return res.status(400).json({ status: "BAD_REQUEST", message: "Some seats not found or already locked." });
        }

        const existingBooking = await qr.manager.find(BookingSeat, {
            where: {
                seat: { id: In(seatsIds) },
                booking: {
                    showTime: { id: showTimeId },
                    status: In(['BOOKED', 'PENDING'])
                }
            }
        });


        if(existingBooking.length > 0) {
            await qr.rollbackTransaction();
            return res.status(400).json({ status: "BAD_REQUEST", message: "Some seats are already booked!" });
        }

        const booking = qr.manager.create(Booking, {
            user: { id: userId },
            showTime: { id: showTimeId },
            bookingTime: new Date(),
            status: "PENDING",
        });

        await qr.manager.save(booking);

        const bookingSeats = seats.map((seat: any) =>
            qr.manager.create(BookingSeat, { 
                seat,
                booking
             })
        );

        await qr.manager.save(bookingSeats);

        const payment = qr.manager.create(Payment, {
            booking,
            amount,
            status: PaymentStatus.PENDING,
        });

        await qr.manager.save(payment);

        const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
            {
            price_data: {
                currency: "inr",
                product_data: { name: "Movie Ticket" },
                unit_amount: Math.round(amount * 100), // Stripe = cents
            },
            quantity: seatsIds.length,
            },
        ],
        success_url: `${FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${FRONTEND_URL}/cancel`,
        metadata: {
            bookingId: booking.id,
            paymentId: payment.id,
        },
        });
        

        await qr.commitTransaction();
        return res.status(200).json({ status: "SUCCESS", message: "Session Created!", data: { booking, payment, checkoutUrl: session.url } });

    } catch (error) {
        await qr.rollbackTransaction();
        console.error("Error in createBookingWithPaymentSession", error.message);
        return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error: error.message });
    } finally {
        try {
            await qr.release();
        } catch (error) {
            
        }
    }
};

export const getMyBookings = async (req: Request, res: Response) => {
    try {

        const { userId } = req.params;
        const query: FindManyOptions<Booking> = {
            where: { user: { id: userId }, payment: { status: PaymentStatus.SUCCESS } },
            relations: ['showTime', 'bookingSeats', 'payment', 'showTime.movie', "bookingSeats.seat", 'showTime.theatre'],
            select: {
                id: true,
                showTime: {
                    id: true,
                    startTime: true,
                    endTime: true,
                    movie: {
                        id: true,
                        title: true,
                        image_url: true
                    },
                    theatre: {
                        id: true,
                        name: true
                    }
                },
                status: true,
                bookingSeats: { id: true, seat: { seatNumber: true, seatType: true, theatre: true } },
                payment: { id: true, status: true, amount: true },
            }
        };
        
        const allBookings = await Booking.find(query);

        const data = [];

        for(let i=0; i<allBookings.length; i++) {
            const booking = allBookings[i];
            const bookingData = {}
            bookingData['startTime'] = booking.showTime.startTime;
            bookingData['endTime'] = booking.showTime.endTime;
            bookingData['movieName'] = booking.showTime.movie.title;
            bookingData['imageUrl'] = booking.showTime.movie.image_url;
            bookingData['seats'] = booking.bookingSeats;
            bookingData['payment'] = booking.payment;
            bookingData['theatre'] = booking.showTime.theatre.name;

            data.push(bookingData);

        }
        return res.status(200).json({ status: "SUCCESS", message: "Booking Fetched!", data });

    } catch (error) {
        console.error("Error in getMyBookings", error.message);
        return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", message: "Error in getting bookings" });
    }
}