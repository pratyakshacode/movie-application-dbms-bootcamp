import { Router } from 'express';
import { addTheatre } from '../controllers/theatreController';

const theatreRouter = Router();

theatreRouter.post('/add', addTheatre)

export default theatreRouter;