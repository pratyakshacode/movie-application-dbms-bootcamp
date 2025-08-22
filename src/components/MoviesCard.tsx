import { Link } from "react-router-dom"

type Movies = {
    id: string,
    image_url: string,
    title: string, 
    type: string,
    duration: string,
    rating: string,
    score: string,
    description: string
}

const MoviesCard = ( movie : Movies ) => {
    return (
        <Link to={`/movies/${movie.id}`} style={{ height: '26rem', width: '20rem' }} className="m-3 border border-gray-500 p-1 rounded-xl">
            <div className="card-image h-3/6 rounded-xl relative">
                <div className="overlay absolute h-full w-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)'}}></div>
                <img src={movie.image_url} style={{ height: '100%', width: '100%' }} className="rounded-t-xl"/>
            </div>
            <h1 className="text-center font-bold text-white m-2">{ movie.title }</h1>
            <div className="h-2/6 text-center m-3 text-gray-400" style={{ maxHeight: '100px'}}>
                {movie.description.substring(0, 100)}
            </div>
        </Link>
    )
}

export default MoviesCard