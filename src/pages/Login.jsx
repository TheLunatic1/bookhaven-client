import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import toast from "react-hot-toast";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      setUser(cred.user);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      setUser(cred.user);
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <button onClick={handleGoogle} className="btn btn-outline w-full">
            <img src="https://www.google.com/favicon.ico" alt="G" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>

          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}