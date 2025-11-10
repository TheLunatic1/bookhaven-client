import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">
          The Book Haven
        </Link>
      </div>

      <div className="flex-none gap-2">
        
        <ul className="menu menu-horizontal px-1 hidden md:flex">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/all-books">All Books</Link></li>
          <li><Link to="/add-book">Add Book</Link></li>
          <li><Link to="/my-books">My Books</Link></li>
        </ul>

        
        <div className="dropdown dropdown-end md:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/all-books">All Books</Link></li>
            <li><Link to="/add-book">Add Book</Link></li>
            <li><Link to="/my-books">My Books</Link></li>
          </ul>
        </div>
        
        <label className="swap swap-rotate mx-2">
          <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <div className="swap-on">Dark Mode On</div>
          <div className="swap-off">Light Mode On</div>
        </label>

        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "https://i.pravatar.cc/150"} alt="User" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <div className="justify-between">
                  {user.displayName || user.email}
                  <span className="badge badge-sm">Logged in</span>
                </div>
              </li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
            <Link to="/register" className="btn btn-outline btn-sm">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}