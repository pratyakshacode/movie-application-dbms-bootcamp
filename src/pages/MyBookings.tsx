import { useQuery } from "@tanstack/react-query"
import Service from "../utils/http";
import MovieBookingCard from "../components/MovieBookingCard";
import { getToken, getUserId } from "../utils/functions";
import NotFound from "./NotFound";

const MyBookings = () => {

    const userId = getUserId();
    const token = getToken()

    if(!token) {
        return <NotFound/>
    }
    const service = new Service();

    const getAllMyBookings = async () => {
        return await service.get(`bookings/myBookings/${userId}`);
    }
    const { data: myBookings } = useQuery({
        queryFn: getAllMyBookings,
        queryKey: ['MyBookings'],
        enabled: userId.length > 0
    });

  return (
    <>
    <h1 className="text-center text-4xl text-white my-5">My Bookings</h1>
    <div className="h-[88vh] w-full overflow-auto flex flex-wrap justify-evenly p-3">
        {
            myBookings?.data?.map((booking: any) => {
                return <MovieBookingCard {...booking} />
            })
        }
    </div>
    </>
  )
}

export default MyBookings