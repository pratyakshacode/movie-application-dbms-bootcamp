import { useMutation } from '@tanstack/react-query';
import Service from '../utils/http'
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

interface BookTicketButtonProps {
    showTimeId: string,
    seatsIds: any[],
    amount: number
}

const BookTicketButton = ({ showTimeId, seatsIds, amount } : BookTicketButtonProps) => {

    const service = new Service();
    const [userId, setUserId] = useState('')
    

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('wowuser') ?? "{}");
        setUserId(user.id);
    }, [])

    const createStripeSession = async () => {
        return await service.post('bookings/create-session', { userId, showTimeId, seatsIds, amount });
    }
    const { mutate, isPending } = useMutation({
        mutationFn: createStripeSession,
        mutationKey: ['createStripeSession'],
        onSuccess(response) {
              window.location.href = response.data.checkoutUrl;
        },
        onError(error: any) {
            alert(error?.response?.data?.message ?? "Seat Already Booked or is in progress of booking." );
        }
    })


    return (
        <button
            disabled={!showTimeId}
            className={`px-10 py-2 ${!showTimeId ? "bg-gray-500" : "bg-teal-600"} text-white rounded-xl h-[40px] w-[200px]`} onClick={() => mutate()}>
            { isPending ? <Spinner size={20} color='white' /> : "Book Ticket"}
        </button>
    )
}

export default BookTicketButton