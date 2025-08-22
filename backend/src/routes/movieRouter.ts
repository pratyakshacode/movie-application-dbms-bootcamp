import { Router } from 'express'
import { getAllMovies, getMovieById, getMoviesWithPagination } from '../controllers/movieController';

const movieRouter = Router();

movieRouter.get('/all', getAllMovies); 
movieRouter.get('/', getMoviesWithPagination);
movieRouter.get('/:movieId', getMovieById);

export default movieRouter;