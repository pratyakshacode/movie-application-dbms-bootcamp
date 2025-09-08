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

    // write the logic for creating the stripe session and initializing payment.
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