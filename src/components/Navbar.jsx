import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Tooltip } from "react-tooltip";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();


  useEffect(() => {
    const checkboxes = document.querySelectorAll(".theme-controller");
    if (checkboxes.length === 0) return;

    const handleChange = (e) => {
      const isDark = e.target.checked;
      const theme = isDark ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", isDark);

      checkboxes.forEach(cb => cb.checked = isDark);
    };

    checkboxes.forEach(cb => cb.addEventListener("change", handleChange));

    const saved = localStorage.getItem("theme");
    const isDark = saved === "dark";
    checkboxes.forEach(cb => cb.checked = isDark);
    document.documentElement.setAttribute("data-theme", saved || "light");
    document.documentElement.classList.toggle("dark", isDark);

    return () => {
      checkboxes.forEach(cb => cb.removeEventListener("change", handleChange));
    };
  }, []);

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
        <Link to="/" className="btn btn-ghost text-2xl font-bold border-0 bg-transparent shadow-none">
          <img src="https://i.ibb.co.com/600XFQ8r/bhj.png" alt="Book Haven Logo" className="h-8 w-8 logo-light" />
          <img src="https://i.ibb.co.com/n86sQrNR/bhk.png" alt="Book Haven Logo" className="h-8 w-8 logo-dark" />
          <span className="text-3xl">The Book Haven</span>
        </Link>
      </div>

      <div className="hidden md:flex justify-center items-center gap-2">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/all-books">All Books</Link></li>
          <li><Link to="/add-book">Add Book</Link></li>
          <li><Link to="/my-books">My Books</Link></li>
        </ul>

        <label className="swap swap-rotate mx-3">
          <input type="checkbox" className="theme-controller" />
          <div className="swap-on text-sm">Dark</div>
          <div className="swap-off text-sm">Light</div>
        </label>

        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar" data-tooltip-id="user-tooltip" data-tooltip-content={user.displayName || user.email}>
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL || "https://i.pravatar.cc/150"} alt={user.displayName || "User"} />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><div className="justify-between">{user.displayName || user.email}<span className="badge badge-xs badge-primary">Logged in</span></div></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
            <Tooltip id="user-tooltip" place="bottom" />
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
              <label className="swap swap-rotate w-full justify-center">
                <input type="checkbox" className="theme-controller" />
                <div className="swap-on">Dark</div>
                <div className="swap-off">Light</div>
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