import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

export default function Navbar() {
  const { loggedIn, user } = useAuth();

  return (
    <header className="bg-white border-b">
      <nav className="mx-auto max-w-6xl px-4 min-h-16 py-3 flex flex-wrap items-center justify-between gap-3">
        <Link to="/" className="text-xl font-semibold tracking-tight">
          blog
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {!loggedIn ? (
            <>
              <Link
                to="/user/login"
                className="inline-flex items-center justify-center h-10 px-3 sm:px-4 rounded-md border text-sm font-medium hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                to="/user/register"
                className="inline-flex items-center justify-center h-10 px-3 sm:px-4 rounded-md bg-black text-white text-sm font-medium hover:opacity-90"
              >
                Register
              </Link>
              <span className="hidden sm:inline ml-2 text-sm text-gray-600">
                Not logged in
              </span>
            </>
          ) : (
            <>
              <Link
                to="/post/new"
                className="inline-flex items-center justify-center h-10 px-3 sm:px-4 rounded-md bg-black text-white text-sm font-medium hover:opacity-90"
              >
                New post
              </Link>
              <Link
                to="/logout"
                className="inline-flex items-center justify-center h-10 px-3 sm:px-4 rounded-md border text-sm font-medium hover:bg-gray-50"
              >
                Logout
              </Link>
              <span className="hidden sm:inline ml-2 text-sm text-gray-600">
                Logged in{user?.name ? `: ${user.name}` : ""}
                {user?.is_admin ? (
                  <span className="ml-2 inline-flex items-center rounded-full bg-black px-2 py-0.5 text-xs font-medium text-white">
                    Admin
                  </span>
                ) : null}
              </span>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
