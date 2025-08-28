import { Router } from "express";
import { stripeSuccess } from "../controllers/paymentController";

const paymentRouter = Router();

paymentRouter.get('/verify', stripeSuccess);

export default paymentRouter;