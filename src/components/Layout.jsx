import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

export default function Layout({ user, setUser }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} setUser={setUser} />
      <main className="flex-1"><Outlet /></main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}