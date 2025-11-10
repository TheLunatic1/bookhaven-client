import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AllBooks from "./pages/AllBooks";
import AddBook from "./pages/AddBook";
import MyBooks from "./pages/MyBooks";
import BookDetails from "./pages/BookDetails";
import EditBook from "./pages/EditBook";

function App() {
  const { user, loading, setUser } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout user={user} setUser={setUser} />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/all-books" element={<AllBooks />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/my-books" element={<MyBooks />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;