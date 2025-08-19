import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const { user, logout } = useUser();

  return (
    <nav className="fixed top-0 left-0 w-full shadow-md z-50 px-6 py-4 flex justify-between items-center">
      <div id="navbar-spot1"></div>
      <div className="font-bold text-xl text-blue-600">WowShow</div>
      <ul className="flex space-x-6">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contactUs">Contact Us</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/movies">Movies</Link></li>
      </ul>
     <div className="space-x-4">
        {user ? (
          <>
            <Link
              to="/profile"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
