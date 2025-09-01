import { Router } from 'express';
import { addTheatre, getAllSeatsOfTheatre, getAllTheatres } from '../controllers/theatreController';

const theatreRouter = Router();

theatreRouter.get('/all', getAllTheatres);
theatreRouter.get('/seats/:theatreId/:showTimeId', getAllSeatsOfTheatre);
theatreRouter.post('/add', addTheatre)


export default theatreRouter;