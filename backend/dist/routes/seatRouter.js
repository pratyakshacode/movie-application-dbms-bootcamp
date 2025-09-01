"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seatRouter = (0, express_1.Router)();
seatRouter.get('/:theatreId', getAllSeatsOfTheatre);
exports.default = seatRouter;
//# sourceMappingURL=seatRouter.js.map