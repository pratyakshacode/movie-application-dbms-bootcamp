import { Request, Response } from "express"
import { Movie } from "../entities/Movies"
import { FindManyOptions, FindOneOptions, Like } from "typeorm";
import movieReview from "../models/movieReview";

export const getAllMovies = async (req: Request, res: Response) => {
    try {

        const allMovies = await Movie.find();
        return res.status(200).json({ message: "All Movies Fetched", data: allMovies });

    } catch (error) {
        return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error: error.message });
    }
}

export const getMoviesWithPagination = async (req: Request, res: Response) => {
  try {
    let { page, limit, name }: any = req.query;

    if (!page) page = "1";
    if (!limit) limit = "10";

    page = parseInt(page as string, 10);
    limit = parseInt(limit as string, 10);

    const skip = (page - 1) * limit;

    const query: FindManyOptions<Movie> = {
      skip,
      take: limit,
    };

    if(name) {
        query.where = { title : Like(`%${name}%`)}
    }

    const [movies, total] = await Movie.findAndCount(query);

    return res.status(200).json({
      status: "SUCCESS",
      message: "Movies Fetched!",
      data: movies,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    });
  } catch (error: any) {
    console.error("Error in getMoviesWithPagination", error);
    return res
      .status(500)
      .json({ status: "INTERNAL_SERVER_ERROR", error: error.message });
  }
};

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

export const addReviewForAMovie = async (req: Request, res: Response) => {
  try {

      const { movieId } = req.params;
      const { rating, comment, userId } = req.body;

      if(rating < 1 || rating > 5) {
        return res.status(400).json({ status: "BAD_REQUEST", message: "Rating should be between 1 and 5" });
      }
      
      let review = await movieReview.findOne({ movieId });
      if(!review) {
        review = await movieReview.create({
            movieId,
        });
      }

      const reviewComments = review.reviewComments ?? []
      const index = reviewComments.findIndex((obj: any) => obj.userId === userId);

      if(index !== -1) {
        return res.status(400).json({ status: "BAD_REQUEST", message: "You already have submitted the review for this movie!" });
      }

      review.reviewComments.push({ rating, comment, userId });
      await review.save();

      return res.status(200).json({ status: "SUCCESS", message: "Review added for movie" });

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