import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white border-b">
      <nav className="mx-auto max-w-6xl px-4 min-h-16 py-3 flex flex-wrap items-center justify-between gap-3">
        <Link to="/" className="text-xl font-semibold tracking-tight">
          blog
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/login"
            className="inline-flex items-center justify-center h-10 px-3 sm:px-4 rounded-md border text-sm font-medium hover:bg-gray-50"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="inline-flex items-center justify-center h-10 px-3 sm:px-4 rounded-md bg-black text-white text-sm font-medium hover:opacity-90"
          >
            Register
          </Link>

          <span className="hidden sm:inline ml-2 text-sm text-gray-600">
            Not logged in
          </span>
        </div>
      </nav>
    </header>
  );
}
