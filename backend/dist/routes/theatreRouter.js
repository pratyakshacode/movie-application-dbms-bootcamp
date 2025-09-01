"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const theatreController_1 = require("../controllers/theatreController");
const theatreRouter = (0, express_1.Router)();
theatreRouter.get('/all', theatreController_1.getAllTheatres);
theatreRouter.get('/seats/:theatreId/:showTimeId', theatreController_1.getAllSeatsOfTheatre);
theatreRouter.post('/add', theatreController_1.addTheatre);
exports.default = theatreRouter;
//# sourceMappingURL=theatreRouter.js.map