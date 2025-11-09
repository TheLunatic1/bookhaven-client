export default function Footer() {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <p className="font-bold">The Book Haven</p>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div>
      <div>
        <span className="footer-title">Links</span>
        <a href="/" className="link link-hover">Home</a>
        <a href="/all-books" className="link link-hover">All Books</a>
        <a href="/add-book" className="link link-hover">Add Book</a>
      </div>
    </footer>
  );
}