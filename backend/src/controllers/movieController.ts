import { Request, Response } from "express"
import { Movie } from "../entities/Movies"
import { FindOneOptions } from "typeorm";

export const getAllMovies = async (req: Request, res: Response) => {
    try {

        const allMovies = await Movie.find();
        return res.status(200).json({ message: "All Movies Fetched", data: allMovies });

    } catch (error) {
        return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error: error.message });
    }
}

export const getMovieById = async (req: Request, res: Response) => {
    try {
        const id = req.params.movieId;
        const query: FindOneOptions = {
            where: { 
                id
            }
        }
        const movie = await Movie.findOne(query);
        return res.status(200).json({ message: "Movie Fetched", data: movie });

    } catch (error) {
         return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error: error.message });
    }
}