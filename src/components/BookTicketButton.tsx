import Service from '../utils/http'
import { useEffect, useState } from 'react';

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

    const handleClick = async () => {
        const response = await service.post('bookings/create-session', { userId, showTimeId, seatsIds, amount });
        window.location.href = response.data.checkoutUrl;
    }

    return (
        <button
            
        className='px-10 py-2 bg-purple-500 text-white rounded-xl' onClick={handleClick}>Book Tickets</button>
    )
}

export default BookTicketButton