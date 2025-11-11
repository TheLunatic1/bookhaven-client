// src/pages/MyBooks.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";

export default function MyBooks() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [fetching, setFetching] = useState(true);

  // ——— ALL HOOKS FIRST (NEVER CONDITIONAL) ———
  useEffect(() => {
    if (!user) return; // Skip fetch if not logged in

    API.get(`/books/my?email=${user.email}`)
      .then(res => setBooks(res.data))
      .catch(() => setBooks([]))
      .finally(() => setFetching(false));
  }, [user]);

  // ——— EARLY RETURN (AFTER HOOKS) ———
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    toast.error("Please login to view your books");
    navigate("/login", { replace: true });
    return null;
  }

  // ——— DELETE HANDLER ———
  const handleDelete = async (bookId) => {
    try {
      await API.delete(`/books/${bookId}`, { data: { userEmail: user.email } });
      toast.success("Book deleted");
      setBooks(prev => prev.filter(b => b._id !== bookId));
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  // ——— RENDER ———
  if (fetching) {
    return (
      <div className="flex justify-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Books</h1>
        <Link to="/add-book" className="btn btn-primary">Add Book</Link>
      </div>

      {books.length === 0 ? (
        <p className="text-center text-base-content/60 mt-8">
          You haven’t added any books yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(book => (
            <div key={book._id} className="card bg-base-100 shadow-xl">
              <figure className="px-4 pt-4">
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  className="rounded-xl h-48 object-cover w-full"
                  onError={(e) => e.target.src = "https://via.placeholder.com/300x450?text=No+Cover"}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{book.title}</h2>
                <p 
                  className="text-sm text-base-content/70"
                  data-tooltip-id="author-tooltip"
                  data-tooltip-content={`Added by: ${book.userName || book.userEmail}`}
                >
                  by {book.author}
                </p>
                <div className="card-actions justify-end mt-4">
                  <Link to={`/edit-book/${book._id}`} className="btn btn-sm btn-outline">
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(book._id)} 
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </div>
                <Tooltip id="author-tooltip" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}