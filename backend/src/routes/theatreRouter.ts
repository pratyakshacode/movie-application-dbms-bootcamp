import { Router } from 'express';
import { addTheatre, getAllTheatres } from '../controllers/theatreController';

const theatreRouter = Router();

theatreRouter.get('/all', getAllTheatres);
theatreRouter.post('/add', addTheatre)


export default theatreRouter;