// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import toast from "react-hot-toast";

export default function Register({ setUser }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!form.name || form.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(form.name.trim())) {
      newErrors.name = "Name can only contain letters and spaces";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email (e.g., user@example.com)";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password = "Password must contain an uppercase letter";
    } else if (!/[a-z]/.test(form.password)) {
      newErrors.password = "Password must contain a lowercase letter";
    } else if (!/\d/.test(form.password)) {
      newErrors.password = "Password must contain a number";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (form.photoURL && !/^https?:\/\/.+/i.test(form.photoURL)) {
      newErrors.photoURL = "Enter a valid URL (e.g., https://example.com/image.jpg)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(cred.user, {
        displayName: form.name.trim(),
        photoURL: form.photoURL || null
      });
      setUser(cred.user);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered");
      } else if (err.code === "auth/weak-password") {
        toast.error("Password is too weak");
      } else {
        toast.error("Registration failed. Try again.");
      }
    }
  };

  const handleGoogle = async () => {
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      setUser(cred.user);
      toast.success("Signed up with Google!");
      navigate("/");
    } catch (err) {
      toast.error("Google signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-4">Register</h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="url"
                placeholder="Photo URL (optional)"
                className={`input input-bordered w-full ${errors.photoURL ? 'input-error' : ''}`}
                value={form.photoURL}
                onChange={(e) => setForm({ ...form, photoURL: e.target.value })}
              />
              {errors.photoURL && <p className="text-error text-xs mt-1">{errors.photoURL}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              {errors.password && <p className="text-error text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className={`input input-bordered w-full ${errors.confirmPassword ? 'input-error' : ''}`}
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                required
              />
              {errors.confirmPassword && <p className="text-error text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </form>

          <div className="divider">OR</div>

          <button onClick={handleGoogle} className="btn btn-outline w-full">
            <img src="https://www.google.com/favicon.ico" alt="G" className="w-5 h-5 mr-2" />
            Register with Google
          </button>

          <p className="text-center mt-4 text-sm">
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