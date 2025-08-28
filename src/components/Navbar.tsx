import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const { user, logout } = useUser();

  return (
    <nav className="fixed top-0 left-0 w-full shadow-md z-50 px-6 py-4 flex justify-between items-center">
      <div id="navbar-spot1"></div>
      <Link to={'/'} className="font-bold text-xl text-white">WowShow</Link>
      <ul className="flex space-x-6">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to={'/admin'}>Admin</Link></li>
      </ul>
     <div className="space-x-4">
        {user ? (
          <>
            <Link
              to="/profile"
              className=" text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition border"
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition border"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition border"
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
