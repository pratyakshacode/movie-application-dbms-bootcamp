"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnect_1 = require("./config/dbConnect");
const example_1 = __importDefault(require("./routes/example"));
const movieRouter_1 = __importDefault(require("./routes/movieRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const theatreRouter_1 = __importDefault(require("./routes/theatreRouter"));
const showsRouter_1 = __importDefault(require("./routes/showsRouter"));
const paymentRouter_1 = __importDefault(require("./routes/paymentRouter"));
const bookingRouter_1 = __importDefault(require("./routes/bookingRouter"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", 'https://wowshow.onrender.com'],
    credentials: true
}));
app.use(express_1.default.json());
const PORT = process.env.PORT;
(0, dbConnect_1.connectDB)();
// routes
app.use("/api/auth", authRouter_1.default);
app.use('/api/example', example_1.default);
app.use('/api/movies', movieRouter_1.default);
app.use('/api/theatre', theatreRouter_1.default);
app.use('/api/shows', showsRouter_1.default);
app.use('/api/bookings', bookingRouter_1.default);
app.use('/api/payment', paymentRouter_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../../dist")));
app.get("/*name", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../dist/index.html"));
});
app.listen(PORT, () => {
    console.log(`Server Listening on port : ${PORT}`);
});
//# sourceMappingURL=index.js.map