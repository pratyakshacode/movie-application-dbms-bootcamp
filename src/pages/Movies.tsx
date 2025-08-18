import { useQuery } from "@tanstack/react-query";
import Service from "../utils/http"
import MoviesCard from "../components/MoviesCard";

const Movies = () => {

    const service = new Service();

    const getAllMovies = async () : Promise<any[]> => {
        const response = await service.get('movies');
        return response;
    }

    const { data } : { data: any} = useQuery({
        queryKey: ['all_movies'],
        queryFn: getAllMovies,
        refetchOnWindowFocus: false,
    });

    

  return (

    <div className="flex justify-center items-center w-full flex-wrap">
        {
            data?.data?.map((movie: any, index: number) => {
                return <MoviesCard { ...movie } key={index}/>
            })
        }
    </div>
  )
}

export default Movies