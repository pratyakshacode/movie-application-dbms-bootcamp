import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/dbConnect';
import exampleRouter from './routes/example';
import movieRouter from './routes/movieRouter';
import authRouter from './routes/authRouter';
import theatreRouter from './routes/theatreRouter';

const app = express();

dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT;

connectDB();

// routes
app.use("/api/auth", authRouter);
app.use('/api/example', exampleRouter);
app.use('/api/movies', movieRouter);
app.use('/api/theatre', theatreRouter)

app.listen(PORT, () => {
    console.log(`Server Listening on port : ${PORT}`);
})