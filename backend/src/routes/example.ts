import { Router } from "express";
import { Movie } from "../entities/Movies";

const exampleRouter = Router()

exampleRouter.get('/', async (req, res) => {
    try {
        let hasMoreData = true;

        while(hasMoreData) {

            const response = await fetch('https://api.jikan.moe/v4/anime?type=movie');
            let data: any = await response.json();
            hasMoreData = data?.pagination?.has_next_page;
            data = data?.data || [];
            
            for(let i=0; i<data.length; i++) {
                const movieData = data[i];
                
                const image = movieData?.images?.jpg ? movieData?.images?.jpg?.image_url: movieData?.images?.webp?.image_url ?? "";
                const title = movieData.title ?? "";
                const type = movieData.type ?? "Movie";
                const duration = movieData.duration ?? "1 min";
                const rating = movieData.rating ?? 0
                const score = movieData?.score ?? 0
                const description = movieData.synopsis ?? ""
                
                const movie = Movie.create({
                    image_url: image,
                    title,
                    type,
                    duration,
                    rating,
                    score,
                    description
                });
                
                const result = await Movie.save(movie);
                console.log(result);
            }

            hasMoreData = data?.pagination?.has_next_page ?? false;
        }

        return res.status(200).json({ message: "Added all movies" });
    } catch (error) {
        return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error: error.message });
    }
})

export default exampleRouter;