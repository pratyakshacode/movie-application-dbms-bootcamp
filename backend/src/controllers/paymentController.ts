import { Request, Response } from "express";
import Stripe from "stripe";
import { Payment, PaymentStatus } from "../entities/Payment";
import { Booking } from "../entities/Booking";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-07-30.basil",
});

export const stripeSuccess = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.query;

    const session = await stripe.checkout.sessions.retrieve(sessionId as string, {
      expand: ["payment_intent"],
    });

    // Verify payment success
    if (session.payment_status === "paid") {
      const paymentId = session.metadata?.paymentId;
      const bookingId = session.metadata?.bookingId;

      if(!paymentId) {
        return res.status(400).json({ status: "BAD_REQUEST", message: "Payment Id Not Found" });
      }

      if(!bookingId) {
        return res.status(400).json({ status: "BAD_REQUEST", message: "Booking Id Not Found" });
      }
      
      await Payment.update(
        { id: paymentId },
        { status: PaymentStatus.SUCCESS, transactionId: session.id }
      );

      await Booking.update(
        { id: bookingId },
        { status: "BOOKED" }
      )

      return res.status(200).json({ status: "SUCCESS", message: "Payment Success", paymentId });
    }

    return res.status(400).json({ status: "BAD_REQUEST", msg: "Payment not completed" });

  } catch (err) {

    console.error(err);
    res.status(500).json({ status: 'INTERNAL_SERVER_ERROR', error: err });

  }
};