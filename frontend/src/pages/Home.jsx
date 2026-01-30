import { useEffect, useState } from "react";
import { getPosts } from "../lib/posts";

function Home() {
  const [posts, setPosts] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setPending(true);
      setError("");

      try {
        const data = await getPosts();
        if (!cancelled) setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load posts.");
      } finally {
        if (!cancelled) setPending(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Posts</h1>
      <p className="text-gray-600 mt-2">Public endpoint: GET /posts</p>

      {pending ? <p className="mt-6 text-gray-600">Loading...</p> : null}
      {error ? <p className="mt-6 text-sm text-red-600">{error}</p> : null}

      {!pending && !error ? (
        <div className="mt-6 grid gap-4">
          {posts.length === 0 ? (
            <p className="text-gray-600">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="rounded-lg border bg-white p-4"
              >
                <h2 className="text-lg font-semibold">
                  {post.title || `Post #${post.id}`}
                </h2>

                <div className="mt-1 text-sm text-gray-600">
                  {post.user?.name ? <span>By {post.user.name}</span> : null}
                  {post.created_at ? (
                    <span>
                      {post.user?.name ? " • " : ""}
                      {post.created_at}
                    </span>
                  ) : null}
                </div>

                {post.content ? (
                  <p className="mt-3 text-gray-800 whitespace-pre-wrap">
                    {String(post.content).slice(0, 300)}
                    {String(post.content).length > 300 ? "..." : ""}
                  </p>
                ) : null}
              </article>
            ))
          )}
        </div>
      ) : null}
    </section>
  );
}

export default Home;
