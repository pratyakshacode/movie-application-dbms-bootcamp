const MovieBookingCard = (props: any) => {
  return (
    <div className='h-[25rem] w-[19rem] border border-gray-500 rounded-2xl flex flex-col items-center text-white p-3'>
        <div className='image-container h-[200px] w-[200px] rounded-full'>
            <img src={props.imageUrl} className='h-full w-full rounded-full'/>
        </div>
        <h1 className='text-xl bg-slate-500 w-full text-center mt-2'>
            {props.movieName}
        </h1>
        <div className='flex justify-center flex-col p-3 w-full items-center gap-2 mt-3 rounded-xl bg-teal-700/30'>
            <span>Date: {new Date(props.startTime).toLocaleDateString()}</span>
            <span>From : {new Date(props.startTime).toLocaleTimeString()}</span>
            <span>To : {new Date(props.endTime).toLocaleTimeString()}</span>
            <span>Theatre: {props.theatre}</span>
        </div>
    </div>
  )
}

export default MovieBookingCard