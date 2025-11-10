// src/components/Navbar.jsx
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
      toast.success("Logged out!");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-2xl font-bold text-primary border-0 bg-transparent shadow-none">
          <span className="text-3xl text-white ">The Book Haven</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/all-books">All Books</Link></li>
          <li><Link to="/add-book">Add Book</Link></li>
          <li><Link to="/my-books">My Books</Link></li>
        </ul>

        <label className="swap swap-rotate mx-3">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="swap-on">Dark Mode On</span>
          <span className="swap-off">Light Mode On</span>
        </label>

        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user.photoURL || "https://i.pravatar.cc/150"}
                  alt={user.displayName || "User"}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <div className="justify-between">
                  {user.displayName || user.email}
                  <span className="badge badge-xs badge-primary">Logged in</span>
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

      <div className="md:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-60">
            <li><Link to="/all-books">All Books</Link></li>
            <li><Link to="/add-book">Add Book</Link></li>
            <li><Link to="/my-books">My Books</Link></li>
            <li className="menu-title">Theme</li>
            <li>
              <label className="swap swap-rotate">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <span className="swap-on">Dark Mode On</span>
                <span className="swap-off">Light Mode On</span>
              </label>
            </li>
            {user ? (
              <>
                <li><div>{user.displayName || user.email}</div></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}