import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/dbConnect';
import exampleRouter from './routes/example';
import movieRouter from './routes/movieRouter';

const app = express();

dotenv.config();

app.use(cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT;

connectDB();

// routes
app.use('/api/example', exampleRouter);
app.use('/api/movies', movieRouter);

app.listen(PORT, () => {
    console.log(`Server Listening on port : ${PORT}`);
})