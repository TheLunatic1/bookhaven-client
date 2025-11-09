import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import toast from "react-hot-toast";

export default function Register({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validatePassword = (p) => {
    return p.length >= 6 && /[A-Z]/.test(p) && /[a-z]/.test(p);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      toast.error("Password must be 6+ chars with uppercase & lowercase");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name, photoURL: photoURL || null });
      setUser(cred.user);
      toast.success("Account created!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      setUser(cred.user);
      toast.success("Signed up with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Register</h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="url"
              placeholder="Photo URL (optional)"
              className="input input-bordered w-full"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
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
              Register
            </button>
          </form>

          <div className="divider">OR</div>

          <button onClick={handleGoogle} className="btn btn-outline w-full">
            <img src="https://www.google.com/favicon.ico" alt="G" className="w-5 h-5 mr-2" />
            Register with Google
          </button>

          <p className="text-center mt-4">
            Have an account?{" "}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}