"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyBookings = exports.createBookingWithPaymentSession = void 0;
const dbConnect_1 = require("../config/dbConnect");
const Booking_1 = require("../entities/Booking");
const BookingSeat_1 = require("../entities/BookingSeat");
const Payment_1 = require("../entities/Payment");
const Seat_1 = require("../entities/Seat");
const stripe_1 = __importDefault(require("stripe"));
const ShowTime_1 = require("../entities/ShowTime");
const typeorm_1 = require("typeorm");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-07-30.basil",
});
const createBookingWithPaymentSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, showTimeId, seatsIds, amount } = req.body;
    const qr = dbConnect_1.AppDataSource.createQueryRunner();
    yield qr.connect();
    yield qr.startTransaction();
    try {
        const showTime = yield qr.manager.findOne(ShowTime_1.ShowTime, {
            where: { id: showTimeId },
            relations: ['theatre']
        });
        if (!showTime) {
            return res.status(404).json({ status: "NOT_FOUND", message: "SHowTime not found." });
        }
        const seats = yield qr.manager.find(Seat_1.Seat, {
            where: {
                id: (0, typeorm_1.In)(seatsIds),
                theatre: { id: showTime.theatre.id }
            },
            lock: { mode: "pessimistic_write" }
        });
        if (seats.length !== seatsIds.length) {
            yield qr.rollbackTransaction();
            return res.status(400).json({ status: "BAD_REQUEST", message: "Some seats not found or already locked." });
        }
        const existingBooking = yield qr.manager.find(BookingSeat_1.BookingSeat, {
            where: {
                seat: { id: (0, typeorm_1.In)(seatsIds) },
                booking: {
                    showTime: { id: showTimeId },
                    status: (0, typeorm_1.In)(['BOOKED', 'PENDING'])
                }
            }
        });
        if (existingBooking.length > 0) {
            yield qr.rollbackTransaction();
            return res.status(400).json({ status: "BAD_REQUEST", message: "Some seats are already booked!" });
        }
        const booking = qr.manager.create(Booking_1.Booking, {
            user: { id: userId },
            showTime: { id: showTimeId },
            bookingTime: new Date(),
            status: "PENDING",
        });
        yield qr.manager.save(booking);
        const bookingSeats = seats.map((seat) => qr.manager.create(BookingSeat_1.BookingSeat, {
            seat,
            booking
        }));
        yield qr.manager.save(bookingSeats);
        const payment = qr.manager.create(Payment_1.Payment, {
            booking,
            amount,
            status: Payment_1.PaymentStatus.PENDING,
        });
        yield qr.manager.save(payment);
        const session = yield stripe.checkout.sessions.create({
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
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            metadata: {
                bookingId: booking.id,
                paymentId: payment.id,
            },
        });
        yield qr.commitTransaction();
        return res.status(200).json({ status: "SUCCESS", message: "Session Created!", data: { booking, payment, checkoutUrl: session.url } });
    }
    catch (error) {
        yield qr.rollbackTransaction();
        console.error("Error in createBookingWithPaymentSession", error.message);
        return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error: error.message });
    }
    finally {
        try {
            yield qr.release();
        }
        catch (error) {
        }
    }
});
exports.createBookingWithPaymentSession = createBookingWithPaymentSession;
const getMyBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const query = {
            where: { user: { id: userId }, payment: { status: Payment_1.PaymentStatus.SUCCESS } },
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
        const allBookings = yield Booking_1.Booking.find(query);
        const data = [];
        for (let i = 0; i < allBookings.length; i++) {
            const booking = allBookings[i];
            const bookingData = {};
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
    }
    catch (error) {
        console.error("Error in getMyBookings", error.message);
        return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", message: "Error in getting bookings" });
    }
});
exports.getMyBookings = getMyBookings;
//# sourceMappingURL=bookingController.js.map