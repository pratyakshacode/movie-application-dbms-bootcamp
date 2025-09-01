"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const movieReviewSchema = new mongoose_1.default.Schema({
    movieId: {
        type: String, // TypeORM Movie ID
        required: true,
        unique: true // only one document per movie
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
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
});
exports.default = mongoose_1.default.model("MovieReview", movieReviewSchema);
//# sourceMappingURL=review.js.map