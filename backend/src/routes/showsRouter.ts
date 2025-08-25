import { Router } from "express";
import { addShow } from "../controllers/showsController";

const showsRouter = Router();

showsRouter.post('/', addShow)

export default showsRouter;