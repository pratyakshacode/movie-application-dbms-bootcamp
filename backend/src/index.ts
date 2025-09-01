import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/dbConnect';
import exampleRouter from './routes/example';
import movieRouter from './routes/movieRouter';
import authRouter from './routes/authRouter';
import theatreRouter from './routes/theatreRouter';
import showsRouter from './routes/showsRouter';
import paymentRouter from './routes/paymentRouter';
import bookingRouter from './routes/bookingRouter';
import path from 'path';

const app = express();

dotenv.config();

app.use(cors({
    origin: ["http://localhost:5173", 'https://wowshow.onrender.com'],
    credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT;

connectDB();

// routes
app.use("/api/auth", authRouter);
app.use('/api/example', exampleRouter);
app.use('/api/movies', movieRouter);
app.use('/api/theatre', theatreRouter);
app.use('/api/shows', showsRouter);
app.use('/api/bookings', bookingRouter)
app.use('/api/payment', paymentRouter);

app.use(express.static(path.join(__dirname, "../../dist")));
app.get("/*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server Listening on port : ${PORT}`);
})