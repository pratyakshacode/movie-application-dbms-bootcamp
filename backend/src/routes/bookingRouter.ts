import { Router } from "express";
import { createBookingWithPaymentSession, getMyBookings } from "../controllers/bookingController";

const bookingRouter = Router();

bookingRouter.get('/myBookings/:userId', getMyBookings);
bookingRouter.post('/create-session', createBookingWithPaymentSession);

export default bookingRouter;