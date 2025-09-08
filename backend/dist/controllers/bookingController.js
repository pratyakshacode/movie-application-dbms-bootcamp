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
const Booking_1 = require("../entities/Booking");
const Payment_1 = require("../entities/Payment");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-07-30.basil",
});
const createBookingWithPaymentSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // write the logic for creating the stripe session and initializing payment.
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