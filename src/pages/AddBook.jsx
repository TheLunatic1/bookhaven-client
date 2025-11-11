import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function AddBook() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", author: "", genre: "", rating: 5, summary: "", coverImage: ""
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    toast.error("Please login to add a book");
    navigate("/login", { replace: true });
    return null;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/books", { ...form, userEmail: user.email });
      toast.success("Book added!");
      navigate("/my-books");
    } catch (err) {
      toast.error("Failed to add book");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Add New Book</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" placeholder="Title" className="input input-bordered w-full" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <input type="text" placeholder="Author" className="input input-bordered w-full" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} required />
            <input type="text" placeholder="Genre" className="input input-bordered w-full" value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} required />
            <input type="url" placeholder="Cover Image URL" className="input input-bordered w-full" value={form.coverImage} onChange={e => setForm({ ...form, coverImage: e.target.value })} required />
            <textarea placeholder="Summary" className="textarea textarea-bordered w-full" value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} required />
            <select className="select select-bordered w-full" value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })}>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Star{n>1?'s':''}</option>)}
            </select>
            <button type="submit" className="btn btn-primary w-full ">Add Book</button>
          </form>
        </div>
      </div>
    </div>
  );
}