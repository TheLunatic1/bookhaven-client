import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="flex-1">
        <NavLink to="/" className="btn btn-ghost normal-case text-xl">
          The Book Haven
        </NavLink>
      </div>

      <div className="flex-none gap-2">
        <NavLink to="/" className="btn btn-ghost">Home</NavLink>
        <NavLink to="/all-books" className="btn btn-ghost">All Books</NavLink>
        <NavLink to="/add-book" className="btn btn-ghost">Add Book</NavLink>
        <NavLink to="/my-books" className="btn btn-ghost">My Books</NavLink>

        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || "/default-avatar.png"} alt="user" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>{user.displayName}</a></li>
                <li><a onClick={logout}>Logout</a></li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <NavLink to="/login" className="btn btn-ghost">Login</NavLink>
            <NavLink to="/register" className="btn btn-ghost">Register</NavLink>
          </>
        )}
      </div>
    </div>
  );
}