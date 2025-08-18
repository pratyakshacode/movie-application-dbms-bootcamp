import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Movies from './pages/Movies';

function App() {

  return (
    <>
      <Router>
          <Navbar/>
              <div className='pt-16'>
                <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/movies' element={<Movies/>} />
              </Routes>
              </div>
      </Router>
    </>
  )
}

export default App
