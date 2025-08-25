import { useMutation, useQuery } from "@tanstack/react-query"
import Service from "../utils/http"
import { useEffect, useState } from "react";
import TextInput from "../components/TextInput";

const AddShows = () => {

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [price, setPrice] = useState<number>(0);

    const [movieName, setMovieName] = useState('');
    const [movieValue, setMovieValue] = useState('')
    const [theatreName, setTheatreName] = useState('');
    const [theatreValue, setTheatreValue] = useState('')
    const [movieOptions, setMovieOptions] = useState([]);
    const [theatreOptions, setTheatreOptions] = useState([]);

    const service = new Service();
    const getAllTheatres = async () => {
      return await service.get('theatre/all');
    }

    const getMovies = async () => {
      return await service.get(`movies?name=${movieName}`)
    }

    const { data } = useQuery({
        queryFn: getAllTheatres,
        queryKey: ['theatres'],
        refetchOnWindowFocus: false
    });

    useEffect(() => {
      const options = data?.data?.map((theatre: any) => ({ label: theatre.name, value: theatre.id }))
      setTheatreOptions(options);
    }, [data])


    const { data: movies } = useQuery({
        queryKey: ['movies', movieName],
        queryFn: getMovies
    });
    

    const handleSelectMovie = (option: { label: string; value: string }) => {
      setMovieValue(option.value);
    };

    const handleTheatreSelect = (option: { label: string; value: string }) => {
      setTheatreValue(option.value)
    };

    const handleFormSubmit = (e: any) => {
      e.preventDefault();

    }

    const addShow = async () => {
      return await service.post('shows', { startTime, endTime, movie: movieValue, theatre: theatreValue, price });
    }

    const { mutate } = useMutation({
      mutationFn: addShow,
      mutationKey: ['addShows'],
      onSuccess(json) {
        alert(json.message ?? "Show Added!" );
        console.log(json);
      },
      onError(error: any) {
        alert(error?.response?.data?.message ?? "Error in adding show!" );
        console.error(error);
      }
    })

    const validateInputsAndAddShow = () => {
        if(!startTime) {
            alert("Start Time Required.");
            return;
        }
        if(!endTime) {
            alert("End Time Required.");
            return;
        }
        if(!price || price == 0) {
            alert("Price should be greater than 0");
            return;
        }
        if(!movieValue) {
            alert("Please Select One Movie");
            return;
        }
        if(!theatreValue) {
            alert("Please Select the theatre.");
            return;
        }

        mutate();
    }

    useEffect(() => {
      const options = movies?.data?.map((movie: any) => ({label: movie.title, value: movie.id }));
      setMovieOptions(options);
    }, [movies]);


  return (
    <>  
        <h1 className="text-3xl text-center my-4 text-white">Add Shows For Movie</h1>
        <div className="flex flex-col h-[70vh] justify-center my-5 items-center text-white">
            <form onSubmit={handleFormSubmit} className="w-full flex justify-center p-2">
                <div className="h-full w-3/5 rounded-2xl flex justify-center items-center flex-col">
                <label htmlFor="startTime" className="w-3/5">
                    <h1 className="text-left w-full ">Start Time</h1>
                </label>
                <input 
                  type="datetime-local" 
                  id="startTime" 
                  className="h-[40px] w-3/5 rounded-xl outline-none bg-gray-500 my-1 p-2" 
                  onChange={(e) => setStartTime(e.target.value)}
                  value={startTime}
                />
                <label htmlFor="startTime" className="w-3/5">
                    <h1 className="text-left w-full ">End Time</h1>
                </label>
                <input 
                  type="datetime-local" 
                  id="endTime" 
                  className="h-[40px] w-3/5 rounded-xl outline-none bg-gray-500 my-1 p-2" 
                  onChange={(e) => setEndTime(e.target.value)}
                  value={endTime}
                />
                <label htmlFor="price" className="w-3/5">
                    <h1 className="text-left w-full">Price</h1>
                </label>
                <input 
                  type="number" 
                  id="price" 
                  className="h-[40px] w-3/5 rounded-xl outline-none bg-gray-500 my-1 p-2" 
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                  value={price}
                  />

                <TextInput inputValue={movieName} setInputValue={setMovieName} label="Movie" placeholder="Choose your Movie" options={movieOptions} onSelect={handleSelectMovie}/>
                <TextInput inputValue={theatreName} setInputValue={setTheatreName} label="Theatre" placeholder="Choose your Movie" options={theatreOptions} onSelect={handleTheatreSelect}/>

                <button className="px-10 py-2 border hover:bg-gray-500 rounded-xl my-4" onClick={validateInputsAndAddShow}> 
                    Add Show
                </button>

            </div>
            </form>

        </div>
    </>
  )
}

export default AddShows