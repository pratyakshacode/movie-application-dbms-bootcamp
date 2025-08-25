import { Link } from 'react-router-dom';
import TheatreImage from '../assets/theatre.png';

const Home = () => {
  return (
    <div className="flex w-full h-[89vh] relative text-white">
        <img src={TheatreImage} className='h-full w-[100vw]' style={{ zIndex: -1000 }} />
        <div className='flex flex-col items-center justify-center h-full w-full absolute bg-black/50'>
            <h1 className='font-bold text-5xl text-gray-300'>Looking For Movie Booking?</h1>
            <h1 className='font-bold text-3xl my-2'>Book On WOWSHOW</h1>
            <div id='home-spot'></div>
            <span className='text-gray-200 mt-5'>Book your tickets quickly and easily! Discover movies, events, and shows near you, select your seats, and pay securely—all in one app</span>
            <Link to={'/movies'} className='px-10 py-2 border hover:bg-gray-400 rounded-xl mt-7'>Explore Movies</Link>
            <div className='mt-36'>The best movie ticket experience you will ever get is here</div>
        </div>
    </div>
  )
}

export default Home