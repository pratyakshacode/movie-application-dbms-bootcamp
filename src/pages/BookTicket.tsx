import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Service from "../utils/http";
import BookTicketButton from "../components/BookTicketButton";

const BookTicket = () => {

  const { movieId } = useParams();
  const service = new Service();
  const [selectedShow, setSelectedShow] = useState('');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [theatreId, setTheatreId] = useState('');
  const [defaultSeatMap, setDefaultSeatMap] = useState([])
  const [amount, setAmount] = useState(0);
  
  const getMovieById = async () => {
      return await service.get(`movies/${movieId}`);
  }

  const addOrRemoveSeat = (seatId: string) => {
      if(selectedSeats.includes(seatId)) {
          const filteredSeats = selectedSeats.filter((seat) => seat !== seatId);
          setSelectedSeats(filteredSeats);
      }
      else {
        setSelectedSeats([...selectedSeats, seatId]);
      }
  }

  const getSeatsOfTheatre = async () => {
    return await service.get(`theatre/seats/${theatreId}`);
  }

  const { data: seats } = useQuery({
    queryFn: getSeatsOfTheatre,
    queryKey: ['getSeatsOfTheatre', theatreId],
    enabled: theatreId.length > 0
  })

  const { data: movie } = useQuery({
      queryFn: getMovieById,
      queryKey: ['getMovieById'],
      refetchOnWindowFocus: false
  });

  const getShowsForMovie = async () => {
    return await service.get(`shows/${movieId}`);
  }

  const { data: shows } = useQuery({
    queryKey: ['showsForMovie'],
    queryFn: getShowsForMovie
  })

  useEffect(() => {
      setDefaultSeatMap(seats?.data ?? []);
  }, [seats])

  return (
    <div className="flex flex-col justify-center items-center text-gray-400">
      <h1 className="text-center text-3xl my-2 text-white underline underline-offset-8 ">Book Tickets For <span className="text-teal-500">{movie?.data?.title}</span></h1>
      <div className="w-full">
        {selectedShow ? defaultSeatMap.length > 0 ? <SeatLayout seats={defaultSeatMap as Seat[]} addOrRemoveSeat={addOrRemoveSeat} selectedSeats={selectedSeats}/> : <h1 className="text-center text-red-400 my-4 text-xl">Oopss ... No seat available for this theatre. Please choose another</h1> : null}
      </div>
      <h1 className="my-4 text-2xl">Available Shows</h1>
      <div className="flex w-full justify-center flex-wrap mb-10">
          {
            shows?.data?.map((show: any) => {
                return <div className={`border p-4 rounded-xl cursor-pointer mx-4 ${selectedShow === show.id ? "bg-gray-700" : ''}`} key={show.id} onClick={() => {
                  setSelectedShow(show.id);
                  setTheatreId(show.theatre.id);
                  setAmount(show.price ?? 0);
                }}>
                    <p>Theatre: {show?.theatre?.name}</p>
                    <p>From : {new Date(show.startTime).toLocaleTimeString()}</p>
                    <p>To : {new Date(show.endTime).toLocaleTimeString()}</p>
                </div>
            })
          }
      </div>
      <div>
          <BookTicketButton showTimeId={selectedShow} amount={amount * selectedSeats.length} seatsIds={selectedSeats} />
      </div>
    </div>
  )
}

interface Seat {
  id: string;
  seatNumber: string;
  seatType: "LeftView" | "RightView" | "MiddleView";
}

interface SeatLayoutProps {
  seats: Seat[];
  addOrRemoveSeat: (id: string) => void;
  selectedSeats: string[]
}

const SeatLayout = ({ seats, addOrRemoveSeat, selectedSeats }: SeatLayoutProps) => {
  // Split the seats into left, right, middle
  const leftMatrix = seats.filter((s) => s.seatType === "LeftView");
  const rightMatrix = seats.filter((s) => s.seatType === "RightView");
  const bottomMatrix = seats.filter((s) => s.seatType === "MiddleView");

  return (
    <div className="w-full flex flex-col items-center mt-6" >
      {/* SCREEN */}
      <div className="w-4/5 h-4 my-3 bg-gray-300 text-black rounded-md flex items-center justify-center text-sm font-semibold mb-10">
        SCREEN
      </div>

      <div className="h-3/5 flex justify-between w-full gap-8 px-10">
        {/* LEFT MATRIX */}
        <div className="grid grid-cols-6 gap-1">
          {leftMatrix.map((seat) => (
            <div
              key={seat.seatNumber}
              onClick={() => addOrRemoveSeat(seat.id)}
              className={`m-2 p-2 flex items-center justify-center text-xs border rounded cursor-pointer ${(!selectedSeats.includes(seat.id)) ? "hover:bg-gray-600" : ""} ${selectedSeats.includes(seat.id) ? "bg-teal-500" : ""} ${selectedSeats.includes(seat.id) ? "text-black" : ""}`}
            >
              {seat.seatNumber}
            </div>
          ))}
        </div>

        {/* RIGHT MATRIX */}
        <div className="grid grid-cols-6 gap-1">
          {rightMatrix.map((seat) => (
            <div
              key={seat.seatNumber}
              onClick={() => addOrRemoveSeat(seat.id)}
              className={`m-2 p-2 font-bold flex items-center justify-center text-xs border rounded cursor-pointer ${(!selectedSeats.includes(seat.id)) ? "hover:bg-gray-600" : ""} ${selectedSeats.includes(seat.id) ? "bg-teal-500" : ""} ${selectedSeats.includes(seat.id) ? "text-black" : ""}`}
            >
              {seat.seatNumber}
            </div>
          ))}
        </div>
      </div>

      {/* MIDDLE MATRIX */}
      <div className="h-2/5 w-full flex justify-center mt-6">
        <div className="grid grid-cols-12 grid-rows-2 gap-1">
          {bottomMatrix.map((seat) => (
            <div
              key={seat.seatNumber}
              onClick={() => addOrRemoveSeat(seat.id)}
              className={`m-2 p-2 flex items-center justify-center text-xs border rounded cursor-pointer ${(!selectedSeats.includes(seat.id)) ? "hover:bg-gray-600" : ""} ${selectedSeats.includes(seat.id) ? "bg-teal-500" : ""} ${selectedSeats.includes(seat.id) ? "text-black" : ""}`}
            >
              {seat.seatNumber}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookTicket
