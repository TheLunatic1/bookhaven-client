import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useAuth();
  const [latestBooks, setLatestBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await API.get("/books/latest");
        setLatestBooks(res.data);
      } catch (err) {
        console.error("Failed to load latest books");
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      <motion.div 
        className="hero min-h-screen bg-linear-to-br from-amber-50 to-orange-100 dark:from-[#bdc3c7] dark:to-[#2c3e50]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content text-center">
          <motion.div 
            className="max-w-md"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.img 
              src="https://i.ibb.co.com/n86sQrNR/bhk.png" 
              alt="The Book Haven"
              className="w-32 h-32 mx-auto mb-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-amber-900 dark:text-amber-100"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              The Book Haven
            </motion.h1>
            <motion.p 
              className="py-6 text-lg text-amber-800 dark:text-amber-200"
              initial={{ opacity: 0 }}
              animate krzy={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Discover, share, and cherish your favorite books in a cozy community of readers.
            </motion.p>
            <motion.div 
              className="space-x-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <Link to="/all-books" className="btn btn-outline bg-transparent">
                All Books
              </Link>
              {user ? (
                <Link to="/add-book" className="btn btn-outline bg-transparent">
                  Create Book
                </Link>
              ) : (
                <Link to="/register" className="btn btn-outline bg-transparent">
                  Join Now
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>


      <div className="py-16 px-4 bg-base-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-amber-900 dark:text-amber-100">
            Latest Additions
          </h2>

          {loading ? (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : latestBooks.length === 0 ? (
            <p className="text-center text-base-content/60">No books yet. Be the first to add one!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestBooks.map((book) => (
                <Link
                  key={book._id}
                  to={`/book/${book._id}`}
                  className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border border-amber-200 dark:border-amber-800"
                >
                  <figure className="px-4 pt-4">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="rounded-xl h-48 w-full object-cover"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/300x450?text=No+Cover")}
                    />
                  </figure>
                  <div className="card-body p-4">
                    <h3 className="card-title text-lg line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-base-content/70">by {book.author}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${i < book.rating ? "text-warning" : "text-base-300"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/all-books" className="btn btn-outline">
              View All Books →
            </Link>
          </div>
        </div>
      </div>

      <div className="py-16 px-4 bg-base-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-amber-900 dark:text-amber-100">
            Why Book Lovers Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 dark:bg-amber-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="font-semibold text-lg">Curated Collection</h3>
              <p className="text-sm text-base-content/70">Handpicked books from passionate readers</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 dark:bg-amber-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="font-semibold text-lg">Discuss & Share</h3>
              <p className="text-sm text-base-content/70">Comment, rate, and connect with fellow readers</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 dark:bg-amber-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="font-semibold text-lg">Your Personal Shelf</h3>
              <p className="text-sm text-base-content/70">Build and manage your own book collection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}