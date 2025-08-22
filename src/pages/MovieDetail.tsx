import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom"
import Service from "../utils/http";
import Slider from "react-slick";
import { useState } from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Modal from "../components/Modal";

const MovieDetail = () => {

  const { movieId } = useParams();
  const service = new Service();
  const [open, setOpen] = useState(false);

  const getMovieDetails = async () => {
    return await service.get(`movies/${movieId}`);
  }

  const getMoviesPaginated = async () => {
    return await service.get('movies');
  }

  const { data } = useQuery({
    queryKey: ['movieDetails'],
    queryFn: getMovieDetails,
    refetchOnWindowFocus: false
  });

  const { data: paginated } = useQuery<any>({
    queryKey: ['moviesPaginated'],
    queryFn: getMoviesPaginated,
    refetchOnWindowFocus: false,
  });

  const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,   // show 4 movies at a time
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false
  };


  return (
    <>
        <Modal title="Modal Titie" isOpen={open} onClose={() => setOpen(false)} children={<h1>This is our modal</h1>}/>
        <div className="flex flex-col md:flex-row w-full text-white p-4">
          <div className="left h-full w-full flex justify-center relative">
              <div className="overlay absolute h-4/6 w-full m-3 rounded-2xl bg-black/20"></div>
              <img src={data?.data?.image_url} className="h-[60vh] w-full m-3 border border-gray-400 rounded-2xl" />
          </div>
          <div className="right h-full w-full flex flex-col items-center p-4">
              <h1 className="text-4xl">{data?.data?.title}</h1>
              <p className="text-gray-400 mt-5">{data?.data?.description}</p>
              <div className="w-full">
                <Link to={`/bookTicket/${movieId}`} className="border px-8 my-4 mx-1 rounded-xl p-2 hover:bg-gray-600">Book Tickets</Link>
                <button 
                  className="border px-8 my-4 mx-1 rounded-xl p-2 hover:bg-gray-600"
                  onClick={() => setOpen(true)}
                  >Write Review</button>
              </div>
          </div>
        </div>
        <h1 className="text-2xl text-gray-400 mb-4 text-center">More Movies To Book</h1>
        < div className="text-white mt-10 relative flex justify-center">
          <div className="overlay absolute w-[90%] rounded-xl h-full bg-black/40 z-50"></div>
          <div style={{ width: "90%", margin: "0 auto" }}>
          <Slider {...settings}>
            {paginated?.data?.map((movie: any, idx: number) => (
              <div key={idx} className="p-2">
                <img
                  src={movie.image_url}
                  alt={movie.title}
                  className="w-full h-[250px] object-cover rounded-xl"
                />
              </div>
            ))}
          </Slider>
          </div>
        </div>
    </>
  )
}

export default MovieDetail