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
exports.Theatre = void 0;
const typeorm_1 = require("typeorm");
const Seat_1 = require("./Seat");
const ShowTime_1 = require("./ShowTime");
let Theatre = class Theatre extends typeorm_1.BaseEntity {
};
exports.Theatre = Theatre;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Theatre.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Theatre.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Theatre.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Seat_1.Seat, (seat) => seat.theatre),
    __metadata("design:type", Array)
], Theatre.prototype, "seats", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ShowTime_1.ShowTime, (showTime) => showTime.theatre),
    __metadata("design:type", Array)
], Theatre.prototype, "showTimes", void 0);
exports.Theatre = Theatre = __decorate([
    (0, typeorm_1.Entity)()
], Theatre);
//# sourceMappingURL=Theatre.js.map