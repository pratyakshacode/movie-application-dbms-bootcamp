
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
        <div style={{ height: '26rem', width: '20rem' }} className="m-3 border border-gray-500 p-1 rounded-xl">
            <div className="card-image h-3/6 rounded-xl relative">
                <div className="overlay absolute h-full w-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)'}}></div>
                <img src={movie.image_url} style={{ height: '100%', width: '100%' }} className="rounded-t-xl"/>
            </div>
            <h1 className="text-center font-bold text-white m-2">{ movie.title }</h1>
            <div className="h-1/6 text-center m-3 text-white">
                {movie.description.substring(0, 100)}
            </div>
            <div className="h-1/6 text-white flex justify-center items-end">
                <button className="border py-1 px-7 rounded-xl cursor-pointer w-full">Book Now</button>
            </div>
        </div>
    )
}

export default MoviesCard