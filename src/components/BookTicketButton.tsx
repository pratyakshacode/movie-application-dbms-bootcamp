import { useMutation } from '@tanstack/react-query';
import Service from '../utils/http'
import Spinner from './Spinner';
import { getUserId } from '../utils/functions';

interface BookTicketButtonProps {
    showTimeId: string,
    seatsIds: any[],
    amount: number
}

const BookTicketButton = ({ showTimeId, seatsIds, amount } : BookTicketButtonProps) => {

    const service = new Service();
    const userId = getUserId();

    const createStripeSession = async () => {
        return await service.post('bookings/create-session', { userId, showTimeId, seatsIds, amount, FRONTEND_URL: service.getBaseURL() });
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
            disabled={!showTimeId || seatsIds.length === 0}
            className={`px-10 py-2 ${!showTimeId || seatsIds.length === 0 ? "bg-gray-500" : "bg-teal-600"} text-white rounded-xl h-[40px] w-[200px] flex justify-center`} onClick={() => mutate()}>
            { isPending ? <Spinner size={20} color='white' /> : "Book Ticket"}
        </button>
    )
}

export default BookTicketButton