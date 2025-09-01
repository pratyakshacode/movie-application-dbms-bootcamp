"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeSuccess = void 0;
const stripe_1 = __importDefault(require("stripe"));
const Payment_1 = require("../entities/Payment");
const Booking_1 = require("../entities/Booking");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-07-30.basil",
});
const stripeSuccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { sessionId } = req.query;
        const session = yield stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["payment_intent"],
        });
        // Verify payment success
        if (session.payment_status === "paid") {
            const paymentId = (_a = session.metadata) === null || _a === void 0 ? void 0 : _a.paymentId;
            const bookingId = (_b = session.metadata) === null || _b === void 0 ? void 0 : _b.bookingId;
            if (!paymentId) {
                return res.status(400).json({ status: "BAD_REQUEST", message: "Payment Id Not Found" });
            }
            if (!bookingId) {
                return res.status(400).json({ status: "BAD_REQUEST", message: "Booking Id Not Found" });
            }
            yield Payment_1.Payment.update({ id: paymentId }, { status: Payment_1.PaymentStatus.SUCCESS, transactionId: session.id });
            yield Booking_1.Booking.update({ id: bookingId }, { status: "BOOKED" });
            return res.status(200).json({ status: "SUCCESS", message: "Payment Success", paymentId });
        }
        return res.status(400).json({ status: "BAD_REQUEST", msg: "Payment not completed" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ status: 'INTERNAL_SERVER_ERROR', error: err });
    }
});
exports.stripeSuccess = stripeSuccess;
//# sourceMappingURL=paymentController.js.map