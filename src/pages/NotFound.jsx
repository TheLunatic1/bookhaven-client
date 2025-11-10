import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="text-2xl font-semibold mt-4">Page Not Found</p>
        <p className="text-base-content/70 mt-2">The book you're looking for doesn't exist... yet!</p>
        <Link to="/" className="btn btn-primary mt-8">
          Return Home
        </Link>
      </div>
    </div>
  );
}