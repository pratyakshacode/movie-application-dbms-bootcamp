import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Movies from './pages/Movies';
import Register from './pages/Register';
import Login from './pages/Login';
import AddTheatre from './pages/AddTheatre';
import AdminOptions from './pages/AdminOptions';
import AddShows from './pages/AddShows';
import MovieDetail from './pages/MovieDetail';
import BookTicket from './pages/BookTicket';
import PaymentSuccess from './pages/PaymentSuccess';
import MyBookings from './pages/MyBookings';

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <Navbar />
          <div className='pt-20'>
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/' element={<Home />} />
              <Route path='/movies' element={<Movies />} />
              <Route path='/bookTicket/:movieId' element={<BookTicket/>} />
              <Route path='/movies/:movieId' element={<MovieDetail/>} />
              <Route path='/admin/addTheatre' element={<AddTheatre/>} />
              <Route path='/admin' element={<AdminOptions/>} />
              <Route path='/admin/addShows' element={<AddShows/>} />
              <Route path='/success' element={<PaymentSuccess/>} />
              <Route path='/myBookings' element={<MyBookings/>} />
            </Routes>
          </div>
        </UserProvider>
      </Router>
    </>
  )
}

export default App
