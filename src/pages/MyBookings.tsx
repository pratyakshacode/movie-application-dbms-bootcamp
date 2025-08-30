import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import Service from "../utils/http";
import MovieBookingCard from "../components/MovieBookingCard";

const MyBookings = () => {

    const [userId, setUserId] = useState('');
    const service = new Service();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('wowuser') ?? "{}");
        setUserId(user.id);
    }, []);

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