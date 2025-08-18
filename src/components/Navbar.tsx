import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav>
      <div id="navbar-spot1"></div>
      <div className="font-bold">WowShow</div>
        <div id="navbar-links">
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/contactUs'}>Contact Us</Link></li>
                <li><Link to={'/about'}>About</Link></li>
                <li><Link to={'/movies'}>Movies</Link></li>
            </ul>
        </div>
        <div>Profile</div>
    </nav>
  )
}

export default Navbar