import { Request, Response } from "express";
import Stripe from "stripe";
import { Payment, PaymentStatus } from "../entities/Payment";
import { Booking } from "../entities/Booking";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-07-30.basil",
});

export const stripeSuccess = async (req: Request, res: Response) => {
  
};