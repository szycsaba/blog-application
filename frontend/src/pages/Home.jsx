import { useEffect, useState } from "react";
import { getPosts } from "../lib/posts";
import { Link, useLocation } from "react-router-dom";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import FormError from "../components/ui/FormError";
import Button from "../components/ui/Button";

function Home() {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");
  const [flash, setFlash] = useState("");

  useEffect(() => {
    const msg = location.state?.flash;
    if (msg) setFlash(String(msg));
  }, [location.state]);

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
    <Container className="py-8">
      <h1 className="text-2xl font-semibold">Blog</h1>

      {flash ? (
        <Card className="mt-6 p-4 border-green-200 bg-green-50">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-green-800">{flash}</p>
            <Button variant="secondary" onClick={() => setFlash("")}>
              OK
            </Button>
          </div>
        </Card>
      ) : null}

      {pending ? <p className="mt-6 text-gray-600">Loading...</p> : null}
      <FormError message={error} className="mt-6" />

      {!pending && !error ? (
        <div className="mt-6 grid gap-4">
          {posts.length === 0 ? (
            <p className="text-gray-600">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <Card as="article" key={post.id} className="p-4">
                <h2 className="text-lg font-semibold">
                  <Link to={`/post/${post.id}`} className="hover:underline">
                    {post.title || `Post #${post.id}`}
                  </Link>
                </h2>

                <div className="mt-1 text-sm text-gray-600">
                  {post.name ? <span>By {post.name}</span> : null}
                  {post.created_at ? (
                    <span>
                      {post.name ? " • " : ""}
                      {post.created_at}
                    </span>
                  ) : null}
                </div>

                {post.content ? (
                  <p className="mt-3 text-gray-800 whitespace-pre-wrap">
                    {String(post.content).slice(0, 300)}
                    {String(post.content).length > 300 ? (
                      <>
                        <Link
                          to={`/post/${post.id}`}
                          className="text-sm text-gray-600 hover:underline"
                        >
                          ...Read more
                        </Link>
                      </>
                    ) : null}
                  </p>
                ) : null}
              </Card>
            ))
          )}
        </div>
      ) : null}
    </Container>
  );
}

export default Home;
