"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movieController_1 = require("../controllers/movieController");
const movieRouter = (0, express_1.Router)();
movieRouter.get('/all', movieController_1.getAllMovies);
movieRouter.get('/', movieController_1.getMoviesWithPagination);
movieRouter.get('/reviews/:movieId', movieController_1.getAllReviewOfMovie);
movieRouter.post('/review/:movieId', movieController_1.addReviewForAMovie);
movieRouter.get('/:movieId', movieController_1.getMovieById);
exports.default = movieRouter;
//# sourceMappingURL=movieRouter.js.map