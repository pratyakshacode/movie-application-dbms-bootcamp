"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const showsController_1 = require("../controllers/showsController");
const showsRouter = (0, express_1.Router)();
showsRouter.get('/:movieId', showsController_1.getAllShowsForMovie);
showsRouter.post('/', showsController_1.addShow);
exports.default = showsRouter;
//# sourceMappingURL=showsRouter.js.map