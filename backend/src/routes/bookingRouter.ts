import { Router } from "express";
import { createBookingWithPaymentSession } from "../controllers/bookingController";

const bookingRouter = Router();


bookingRouter.post('/create-session', createBookingWithPaymentSession);

export default bookingRouter;