import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function BookDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await API.get(`/books/${id}`);
        setBook(res.data);
      } catch (err) {
        toast.error("Book not found");
        navigate("/all-books");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await API.delete(`/books/${id}`, { data: { userEmail: user.email } });
      toast.success("Book deleted");
      navigate("/my-books");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      const res = await API.post(`/books/${id}/comment`, {
        text: comment,
        userName: user.displayName || "User",
        photoURL: user.photoURL,
        userEmail: user.email,
      });
      setBook(prev => ({
        ...prev,
        comments: [...prev.comments, res.data]
      }));
      setComment("");
      setShowModal(false);
      toast.success("Comment added!");
    } catch (err) {
      toast.error("Failed to comment");
    }
  };

  if (loading) return <div className="flex justify-center p-8"><span className="loading loading-spinner loading-lg"></span></div>;
  if (!book) return null;

  const isOwner = user && book.userEmail === user.email;

  return (
    <div className="container mx-auto p-4">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="lg:w-1/3">
          <img src={book.coverImage} alt={book.title} className="h-full object-cover rounded-xl" />
        </figure>
        <div className="card-body lg:w-2/3">
          <h1 className="card-title text-3xl">{book.title}</h1>
          <p className="text-lg">by <span className="font-semibold">{book.author}</span></p>
          <p className="badge badge-primary">{book.genre}</p>
          <div className="flex items-center gap-1 my-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xl ${i < book.rating ? "text-warning" : "text-base-300"}`}>★</span>
            ))}
          </div>
          <p className="text-base">{book.summary}</p>

          {isOwner && (
            <div className="card-actions justify-end mt-4">
              <Link to={`/edit-book/${id}`} className="btn btn-outline btn-sm">Edit</Link>
              <button onClick={handleDelete} className="btn btn-error btn-sm">Delete</button>
            </div>
          )}

          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Comments ({book.comments.length})</h3>
              {user && (
                <button onClick={() => setShowModal(true)} className="btn btn-primary btn-sm">
                  Add Comment
                </button>
              )}
            </div>

            <div className="space-y-4">
              {book.comments.length === 0 ? (
                <p className="text-center text-base-content/60">No comments yet.</p>
              ) : (
                book.comments.map((c, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-base-200 rounded-lg">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={c.photoURL || "https://i.pravatar.cc/150"} alt={c.userName} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{c.userName}</p>
                      <p className="text-sm">{c.text}</p>
                      <p className="text-xs text-base-content/50">
                        {new Date(c.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Comment</h3>
            <form onSubmit={handleComment} className="mt-4">
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Write your comment..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                required
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Post</button>
                <button type="button" onClick={() => setShowModal(false)} className="btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}