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
const movieReview_1 = __importDefault(require("../models/movieReview"));
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // write the api for getting all the movies
    }
    catch (error) {
        return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error: error.message });
    }
});
exports.getAllMovies = getAllMovies;
const getMoviesWithPagination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // implement the pagination for the movie application
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
        // write the api for getting the details for the movie
    }
    catch (error) {
        return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error: error.message });
    }
});
exports.getMovieById = getMovieById;
const addReviewForAMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // write the api for creating the review 
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