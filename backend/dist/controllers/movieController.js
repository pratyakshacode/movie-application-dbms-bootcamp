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
exports.getAllReviewOfMovie = exports.addReviewForAMovie = exports.getMovieById = exports.getMoviesWithPagination = exports.getAllMovies = void 0;
const Movies_1 = require("../entities/Movies");
const typeorm_1 = require("typeorm");
const movieReview_1 = __importDefault(require("../models/movieReview"));
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMovies = yield Movies_1.Movie.find();
        return res.status(200).json({ message: "All Movies Fetched", data: allMovies });
    }
    catch (error) {
        return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error: error.message });
    }
});
exports.getAllMovies = getAllMovies;
const getMoviesWithPagination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { page, limit, name } = req.query;
        if (!page)
            page = "1";
        if (!limit)
            limit = "10";
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);
        const skip = (page - 1) * limit;
        const query = {
            skip,
            take: limit,
        };
        if (name) {
            query.where = { title: (0, typeorm_1.Like)(`%${name}%`) };
        }
        const [movies, total] = yield Movies_1.Movie.findAndCount(query);
        return res.status(200).json({
            status: "SUCCESS",
            message: "Movies Fetched!",
            data: movies,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        });
    }
    catch (error) {
        console.error("Error in getMoviesWithPagination", error);
        return res
            .status(500)
            .json({ status: "INTERNAL_SERVER_ERROR", error: error.message });
    }
});
exports.getMoviesWithPagination = getMoviesWithPagination;
const getMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.movieId;
        const query = {
            where: {
                id
            }
        };
        const movie = yield Movies_1.Movie.findOne(query);
        return res.status(200).json({ message: "Movie Fetched", data: movie });
    }
    catch (error) {
        return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error: error.message });
    }
});
exports.getMovieById = getMovieById;
const addReviewForAMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { movieId } = req.params;
        const { rating, comment, userId } = req.body;
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ status: "BAD_REQUEST", message: "Rating should be between 1 and 5" });
        }
        let review = yield movieReview_1.default.findOne({ movieId });
        if (!review) {
            review = yield movieReview_1.default.create({
                movieId,
            });
        }
        const reviewComments = (_a = review.reviewComments) !== null && _a !== void 0 ? _a : [];
        const index = reviewComments.findIndex((obj) => obj.userId === userId);
        if (index !== -1) {
            return res.status(400).json({ status: "BAD_REQUEST", message: "You already have submitted the review for this movie!" });
        }
        review.reviewComments.push({ rating, comment, userId });
        yield review.save();
        return res.status(200).json({ status: "SUCCESS", message: "Review added for movie" });
    }
    catch (error) {
        console.error("Error in addReviewForAMovie", error.message);
        return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error: error.message });
    }
});
exports.addReviewForAMovie = addReviewForAMovie;
const getAllReviewOfMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        const review = yield movieReview_1.default.findOne({ movieId });
        if (!review) {
            return res.status(200).json({ status: "SUCCESS", message: "No reviews found", data: [] });
        }
        return res.status(200).json({ status: "SUCCESS", message: "Reviews Fetched", data: review.reviewComments });
    }
    catch (error) {
        console.error("Error in getReviewForMovie", error.message);
        return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error: error.message });
    }
});
exports.getAllReviewOfMovie = getAllReviewOfMovie;
//# sourceMappingURL=movieController.js.map