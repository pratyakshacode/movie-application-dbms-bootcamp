import mongoose from "mongoose";

const movieReviewSchema = new mongoose.Schema({
  movieId: {
    type: String,   // TypeORM Movie ID
    required: true,
    unique: true    // only one document per movie
  },
  reviewComments: [
    {
      rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
      },
      comment: {
        type: String,
        default: ""
      },
      userId: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

export default mongoose.model("MovieReview", movieReviewSchema);