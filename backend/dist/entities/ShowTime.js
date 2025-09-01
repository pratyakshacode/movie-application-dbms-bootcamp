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
exports.ShowTime = void 0;
const typeorm_1 = require("typeorm");
const Movies_1 = require("./Movies");
const Booking_1 = require("./Booking");
const Theatre_1 = require("./Theatre");
let ShowTime = class ShowTime extends typeorm_1.BaseEntity {
};
exports.ShowTime = ShowTime;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ShowTime.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], ShowTime.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], ShowTime.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ShowTime.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Movies_1.Movie, (movie) => movie.showTimes),
    __metadata("design:type", Movies_1.Movie)
], ShowTime.prototype, "movie", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Booking_1.Booking, (booking) => booking.showTime),
    __metadata("design:type", Array)
], ShowTime.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Theatre_1.Theatre, (theatre) => theatre.showTimes),
    __metadata("design:type", Theatre_1.Theatre)
], ShowTime.prototype, "theatre", void 0);
exports.ShowTime = ShowTime = __decorate([
    (0, typeorm_1.Entity)()
], ShowTime);
//# sourceMappingURL=ShowTime.js.map