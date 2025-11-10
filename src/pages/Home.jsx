import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-base-200">
      <div className="hero min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-amber-950">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl md:text-6xl font-bold text-amber-900 dark:text-amber-100">
              The Book Haven
            </h1>
            <p className="py-6 text-lg text-amber-800 dark:text-amber-200">
              Discover, share, and cherish your favorite books in a cozy community of readers.
            </p>
            <div className="space-x-4">
              <Link to="/all-books" className="btn btn-primary">
                Explore Books
              </Link>
              {user ? (
                <Link to="/add-book" className="btn btn-outline">
                  Add a Book
                </Link>
              ) : (
                <Link to="/register" className="btn btn-outline">
                  Join Now
                </Link>
              )}
            </div>
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