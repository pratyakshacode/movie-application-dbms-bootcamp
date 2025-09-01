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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSeatsOfTheatre = exports.getAllTheatres = exports.addTheatre = void 0;
const Theatre_1 = require("../entities/Theatre");
const Seat_1 = require("../entities/Seat");
const utils_1 = require("../utils/utils");
const dbConnect_1 = require("../config/dbConnect");
const BookingSeat_1 = require("../entities/BookingSeat");
const addTheatre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const qr = dbConnect_1.AppDataSource.createQueryRunner();
    yield qr.connect();
    yield qr.startTransaction();
    try {
        const { theatreName, location } = req.body;
        const newTheatre = qr.manager.create(Theatre_1.Theatre, {
            name: theatreName,
            location,
        });
        yield qr.manager.save(newTheatre);
        const seats = utils_1.defaultSeatMap.map((s) => qr.manager.create(Seat_1.Seat, {
            seatNumber: s.seatNumber,
            seatType: s.seatType,
            theatre: newTheatre,
        }));
        yield qr.manager.save(seats);
        yield qr.commitTransaction();
        return res.status(200).json({ status: "SUCCESS", message: "Theatre and seats added successfully" });
    }
    catch (error) {
        yield qr.rollbackTransaction();
        console.error("Error in add Theatre", error);
        return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error: error.message });
    }
    finally {
        yield qr.release();
    }
});
exports.addTheatre = addTheatre;
const getAllTheatres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {};
        const theatres = yield Theatre_1.Theatre.find(query);
        return res.status(200).json({ status: "SUCCESS", message: "All theatres fetched!", data: theatres });
    }
    catch (error) {
        console.error("Error in getAllTheatres", error);
        return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error: error.message });
    }
});
exports.getAllTheatres = getAllTheatres;
const getAllSeatsOfTheatre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { theatreId, showTimeId } = req.params; // use showTimeId instead of showId
        const allSeats = yield Seat_1.Seat.find({
            where: { theatre: { id: theatreId } },
        });
        const bookedSeats = yield BookingSeat_1.BookingSeat.find({
            where: {
                booking: {
                    showTime: { id: showTimeId },
                    status: "BOOKED", // make sure Booking has a status column
                },
            },
            relations: ["seat"],
        });
        const bookedSeatIds = bookedSeats.map((bs) => bs.seat.id);
        const seatsWithStatus = allSeats.map((seat) => (Object.assign(Object.assign({}, seat), { isBooked: bookedSeatIds.includes(seat.id) })));
        return res.status(200).json({
            status: "SUCCESS",
            message: "Seats with booking status fetched!",
            data: seatsWithStatus,
        });
    }
    catch (error) {
        console.error("Error in getAllSeatsOfTheatre", error);
        return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error: error.message });
    }
});
exports.getAllSeatsOfTheatre = getAllSeatsOfTheatre;
//# sourceMappingURL=theatreController.js.map