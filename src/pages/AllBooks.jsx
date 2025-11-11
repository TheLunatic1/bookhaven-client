import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

export default function AllBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
  const filtered = books.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );
  const [sortBy, setSortBy] = useState("newest");
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


  const filteredAndSorted = books
    .filter(b =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "rating-high") return b.rating - a.rating;
      if (sortBy === "rating-low") return a.rating - b.rating;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  if (loading) return <div className="flex justify-center p-8"><span className="loading loading-spinner loading-lg"></span></div>;





  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Books</h1>
      <div className="max-w-md mx-auto mb-6 flex flex-col justify-between md:flex-row gap-4 ">
        <input
          type="text"
          placeholder="Search by title or author..."
          className="input input-bordered w-full"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="rating-high">Rating: High → Low</option>
          <option value="rating-low">Rating: Low → High</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSorted.map((book) => (
          <div key={book._id} className="card bg-base-100 shadow-xl">
            <figure className="px-4 pt-4">
              <img src={book.coverImage} alt={book.title} onError={e => e.target.src = "https://via.placeholder.com/300x450?text=No+Cover"} className="rounded-xl h-48 object-cover w-full" />
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
            <Tooltip id="author-tooltip" />
          </div>
        ))}
      </div>
    </div>
  );
}