import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom"
import Service from "../utils/http";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Modal from "../components/Modal";

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave } : { filled: boolean, onClick?: () => void, onMouseEnter?: () => void, onMouseLeave?: () => void }) => {
  return (
    <svg onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} style={{ cursor: 'pointer', scale: 1.4 }}  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={filled ? "gold" : "white"} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icon-tabler-star"> <path d="M12 17.75l-6.172 3.245 1.179-6.873-5-4.873 6.9-1 3.093-6.27 3.093 6.27 6.9 1-5 4.873 1.179 6.873z"/></svg>
  )
}
const MovieDetail = () => {

  const { movieId } = useParams();
  const service = new Service();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [userId, setUserId] = useState('')
      
  
  useEffect(() => {
      const user = JSON.parse(localStorage.getItem('wowuser') ?? "{}");
      setUserId(user.id);
  }, [])

  const getMovieDetails = async () => {
    return await service.get(`movies/${movieId}`);
  }

  const getAllReviews = async () => {
    return await service.get(`movies/reviews/${movieId}`);
  }

  const getMoviesPaginated = async () => {
    return await service.get('movies');
  }

  const submitReview = async () => {
    return await service.post(`movies/review/${movieId}`, { rating, comment, userId });
  }

  const { mutate: submitReviewMutation } = useMutation({
    mutationFn: submitReview,
    mutationKey: ['submitReview'],
    onSuccess() {
      setOpen(false);
      alert('Review Submitted!')
    },
    onError(error: any) {
      console.error(error);
      alert(error?.response?.data?.message ?? error.message);
    }
  });

  const { data: reviews } = useQuery({
    queryFn: getAllReviews,
    queryKey: ['getAllReviews', movieId]
  })

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
        <Modal 
            title={`Write Review For ${data?.data?.title}`} 
            isOpen={open}
            onClose={() => setOpen(false)} 
            children={
              <>
                <div className="flex justify-around my-4">
                  {
                    [1, 2, 3, 4, 5].map((star) => {
                        return <Star 
                          onClick={() => setRating(star)} 
                          onMouseEnter={() => setHovered(star)}
                          onMouseLeave={() => setHovered(0)}
                          filled={star <= (hovered || rating)}
                        />
                    })
                  }
                </div>
                <textarea onChange={(e) => setComment(e.target.value)} value={comment} className="h-[200px] border border-black rounded-xl p-3 outline-none mt-4 w-full"/>
                <div className="flex w-full justify-end">
                    <button 
                      className="px-7 my-2 py-2 border bg-teal-600 text-white rounded-xl"
                      onClick={() => submitReviewMutation()}
                    >
                      Submit Review
                    </button>
                </div>
              </>
            }
          />
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
        <h1 className="text-center mt-10 text-gray-400 text-2xl">Latest Movie Reviews</h1>
          <div className="flex w-full my-5 h-[400px] overflow-auto justify-center">
        {reviews?.data?.map((review: { rating: number; comment: string }) => {
          // Always create exactly 5 stars
          const stars = Array.from({ length: 5 }, (_, i) => i);

          return (
            <div
              key={review.comment} // ideally use review.id if available
              className="flex flex-col h-[100px] w-[300px] border p-3 flex-wrap rounded-2xl justify-center"
            >
              <div className="text-white text-center">{review.comment}</div>

              <div className="flex w-full justify-center">
                {stars.map((i) => (
                  <Star key={i} filled={i < review.rating} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </>
  )
}

export default MovieDetail