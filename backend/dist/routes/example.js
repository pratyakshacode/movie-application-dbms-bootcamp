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
const express_1 = require("express");
const Movies_1 = require("../entities/Movies");
const exampleRouter = (0, express_1.Router)();
exampleRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    try {
        let hasMoreData = true;
        while (hasMoreData) {
            const response = yield fetch('https://api.jikan.moe/v4/anime?type=movie');
            let data = yield response.json();
            hasMoreData = (_a = data === null || data === void 0 ? void 0 : data.pagination) === null || _a === void 0 ? void 0 : _a.has_next_page;
            data = (data === null || data === void 0 ? void 0 : data.data) || [];
            for (let i = 0; i < data.length; i++) {
                const movieData = data[i];
                const image = ((_b = movieData === null || movieData === void 0 ? void 0 : movieData.images) === null || _b === void 0 ? void 0 : _b.jpg) ? (_d = (_c = movieData === null || movieData === void 0 ? void 0 : movieData.images) === null || _c === void 0 ? void 0 : _c.jpg) === null || _d === void 0 ? void 0 : _d.image_url : (_g = (_f = (_e = movieData === null || movieData === void 0 ? void 0 : movieData.images) === null || _e === void 0 ? void 0 : _e.webp) === null || _f === void 0 ? void 0 : _f.image_url) !== null && _g !== void 0 ? _g : "";
                const title = (_h = movieData.title) !== null && _h !== void 0 ? _h : "";
                const type = (_j = movieData.type) !== null && _j !== void 0 ? _j : "Movie";
                const duration = (_k = movieData.duration) !== null && _k !== void 0 ? _k : "1 min";
                const rating = (_l = movieData.rating) !== null && _l !== void 0 ? _l : 0;
                const score = (_m = movieData === null || movieData === void 0 ? void 0 : movieData.score) !== null && _m !== void 0 ? _m : 0;
                const description = (_o = movieData.synopsis) !== null && _o !== void 0 ? _o : "";
                const movie = Movies_1.Movie.create({
                    image_url: image,
                    title,
                    type,
                    duration,
                    rating,
                    score,
                    description
                });
                const result = yield Movies_1.Movie.save(movie);
                console.log(result);
            }
            hasMoreData = (_q = (_p = data === null || data === void 0 ? void 0 : data.pagination) === null || _p === void 0 ? void 0 : _p.has_next_page) !== null && _q !== void 0 ? _q : false;
        }
        return res.status(200).json({ message: "Added all movies" });
    }
    catch (error) {
        return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error: error.message });
    }
}));
exports.default = exampleRouter;
//# sourceMappingURL=example.js.map