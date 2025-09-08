import { Request, Response } from "express"
import { Movie } from "../entities/Movies"
import { FindManyOptions, FindOneOptions, Like } from "typeorm";
import movieReview from "../models/movieReview";

export const getAllMovies = async (req: Request, res: Response) => {
    try {

        // write the api for getting all the movies

    } catch (error) {
        return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error: error.message });
    }
}

export const getMoviesWithPagination = async (req: Request, res: Response) => {
  try {
    // implement the pagination for the movie application
  } catch (error: any) {
    console.error("Error in getMoviesWithPagination", error);
    return res
      .status(500)
      .json({ status: "INTERNAL_SERVER_ERROR", error: error.message });
  }
};

export const getMovieById = async (req: Request, res: Response) => {
    try {
        // write the api for getting the details for the movie

    } catch (error) {
         return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error: error.message });
    }
}

export const addReviewForAMovie = async (req: Request, res: Response) => {
  try {

      // write the api for creating the review 

  } catch (error) {
    
      console.error("Error in addReviewForAMovie", error.message);
      return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error: error.message });
  }
}

export const getAllReviewOfMovie = async(req: Request, res: Response) => {
  try {

      const { movieId } = req.params;
      const review = await movieReview.findOne({ movieId });

      if (!review) {
          return res.status(200).json({ status: "SUCCESS", message: "No reviews found", data: [] });
      }

      return res.status(200).json({ status: "SUCCESS", message: "Reviews Fetched", data: review.reviewComments });

  } catch (error) {
      console.error("Error in getReviewForMovie", error.message);
      return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error: error.message });
  }
}