import { Router } from 'express'
import { getAllMovies, getMovieById } from '../controllers/movieController';

const movieRouter = Router();

movieRouter.get('/', getAllMovies); 
movieRouter.get('/:movieId', getMovieById);

export default movieRouter;