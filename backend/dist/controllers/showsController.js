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
exports.getAllShowsForMovie = exports.addShow = void 0;
const ShowTime_1 = require("../entities/ShowTime");
const typeorm_1 = require("typeorm");
const addShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startTime, endTime, movie, theatre, price } = req.body;
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);
        const query = {
            where: {
                startTime: (0, typeorm_1.LessThanOrEqual)(endDate),
                endTime: (0, typeorm_1.MoreThanOrEqual)(startDate),
                movie: { id: movie },
                theatre: { id: theatre }
            }
        };
        const showTime = yield ShowTime_1.ShowTime.findOne(query);
        if (showTime) {
            return res.status(400).json({ status: "BAD_REQUEST", message: "There is already a show on this theatre and for selected movie." });
        }
        const newShow = ShowTime_1.ShowTime.create({
            startTime: startDate,
            endTime: endDate,
            movie,
            theatre,
            price
        });
        yield ShowTime_1.ShowTime.save(newShow);
        return res.status(200).json({ status: "SUCCESS", message: "Show added for movie." });
    }
    catch (error) {
        console.error("Error in addShow", error.message);
        return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", message: "Error in adding show for movie." });
    }
});
exports.addShow = addShow;
const getAllShowsForMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        const query = {
            where: {
                movie: { id: movieId },
            },
            relations: ['theatre'],
            select: {
                theatre: {
                    id: true,
                    name: true
                }
            }
        };
        const showTime = yield ShowTime_1.ShowTime.find(query);
        return res.status(200).json({ status: "SUCCESS", message: "Shows fetched!", data: showTime });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ status: "SUCCESS", error: error.message });
    }
});
exports.getAllShowsForMovie = getAllShowsForMovie;
//# sourceMappingURL=showsController.js.map