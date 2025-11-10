import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function EditBook() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await API.get(`/books/${id}`);
        if (res.data.userEmail !== user.email) {
          toast.error("Not authorized");
          navigate("/my-books");
          return;
        }
        setForm(res.data);
      } catch (err) {
        toast.error("Book not found");
        navigate("/my-books");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchBook();
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/books/${id}`, { ...form, userEmail: user.email });
      toast.success("Book updated!");
      navigate(`/book/${id}`);
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  if (loading || !form) return <div className="flex justify-center p-8"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Book</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" placeholder="Title" className="input input-bordered w-full" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <input type="text" placeholder="Author" className="input input-bordered w-full" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} required />
            <input type="text" placeholder="Genre" className="input input-bordered w-full" value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} required />
            <input type="url" placeholder="Cover Image URL" className="input input-bordered w-full" value={form.coverImage} onChange={e => setForm({ ...form, coverImage: e.target.value })} required />
            <textarea placeholder="Summary" className="textarea textarea-bordered w-full" value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} required />
            <select className="select select-bordered w-full" value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })}>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Star{n>1?'s':''}</option>)}
            </select>
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary flex-1">Save</button>
              <button type="button" onClick={() => navigate(`/book/${id}`)} className="btn btn-outline flex-1">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}