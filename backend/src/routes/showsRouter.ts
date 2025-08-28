import { Router } from "express";
import { addShow, getAllShowsForMovie } from "../controllers/showsController";

const showsRouter = Router();

showsRouter.get('/:movieId', getAllShowsForMovie);
showsRouter.post('/', addShow)

export default showsRouter;