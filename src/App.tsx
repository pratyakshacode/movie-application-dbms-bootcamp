import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Movies from './pages/Movies';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <Navbar />
          <div className='pt-16'>
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/' element={<Home />} />
              <Route path='/movies' element={<Movies />} />
            </Routes>
          </div>
        </UserProvider>
      </Router>
    </>
  )
}

export default App
