"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingController_1 = require("../controllers/bookingController");
const bookingRouter = (0, express_1.Router)();
bookingRouter.get('/myBookings/:userId', bookingController_1.getMyBookings);
bookingRouter.post('/create-session', bookingController_1.createBookingWithPaymentSession);
exports.default = bookingRouter;
//# sourceMappingURL=bookingRouter.js.map