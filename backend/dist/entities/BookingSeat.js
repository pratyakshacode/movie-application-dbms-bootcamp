"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSeat = void 0;
const typeorm_1 = require("typeorm");
const Booking_1 = require("./Booking");
const Seat_1 = require("./Seat");
let BookingSeat = class BookingSeat extends typeorm_1.BaseEntity {
};
exports.BookingSeat = BookingSeat;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], BookingSeat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Booking_1.Booking, (booking) => booking.bookingSeats),
    __metadata("design:type", Booking_1.Booking)
], BookingSeat.prototype, "booking", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Seat_1.Seat, (seat) => seat.bookingSeats),
    __metadata("design:type", Seat_1.Seat)
], BookingSeat.prototype, "seat", void 0);
exports.BookingSeat = BookingSeat = __decorate([
    (0, typeorm_1.Entity)()
], BookingSeat);
//# sourceMappingURL=BookingSeat.js.map