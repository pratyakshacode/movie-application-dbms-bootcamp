import { Router } from 'express'
import { addReviewForAMovie, getAllMovies, getAllReviewOfMovie, getMovieById, getMoviesWithPagination } from '../controllers/movieController';

const movieRouter = Router();

movieRouter.get('/all', getAllMovies); 
movieRouter.get('/', getMoviesWithPagination);
movieRouter.get('/reviews/:movieId', getAllReviewOfMovie);
movieRouter.post('/review/:movieId', addReviewForAMovie)
movieRouter.get('/:movieId', getMovieById);

export default movieRouter;