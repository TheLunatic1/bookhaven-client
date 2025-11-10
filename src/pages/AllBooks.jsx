import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function AllBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books");
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <div className="flex justify-center p-8"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book._id} className="card bg-base-100 shadow-xl">
            <figure className="px-4 pt-4">
              <img src={book.coverImage} alt={book.title} className="rounded-xl h-48 object-cover w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{book.title}</h2>
              <p className="text-sm text-base-content/70">by {book.author}</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-xl ${i < book.rating ? "text-warning" : "text-base-300"}`}>★</span>
                ))}
              </div>
              <p className="text-sm line-clamp-2">{book.summary}</p>
              <div className="card-actions justify-end mt-4">
                <Link to={`/book/${book._id}`} className="btn btn-primary btn-sm">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}