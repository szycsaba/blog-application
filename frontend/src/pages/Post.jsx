import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createComment, deleteComment, deletePost, getPost } from "../lib/posts";
import { useAuth } from "../features/auth/AuthContext";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Textarea from "../components/ui/Textarea";
import Button from "../components/ui/Button";
import FormError from "../components/ui/FormError";

function Post() {
  const { id } = useParams();
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [pending, setPending] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [comment, setComment] = useState("");
  const [commentPending, setCommentPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setPending(true);
      setError("");

      try {
        const data = await getPost(id);
        if (!cancelled) {
          const comments = Array.isArray(data?.comments) ? data.comments : [];
          const sortedComments = [...comments].sort((a, b) =>
            String(b?.created_at || "").localeCompare(String(a?.created_at || ""))
          );
          setPost(data ? { ...data, comments: sortedComments } : data);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load post.");
      } finally {
        if (!cancelled) setPending(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleDelete() {
    if (!loggedIn) return;
    if (!post?.id) return;

    const ok = window.confirm("Are you sure you want to delete this post?");
    if (!ok) return;

    setError("");
    setDeleting(true);
    try {
      await deletePost(post.id);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to delete post.");
    } finally {
      setDeleting(false);
    }
  }

  async function handleCommentSubmit(e) {
    e.preventDefault();
    if (!post?.id) return;

    const trimmed = comment.trim();
    if (!trimmed) return;

    setError("");
    setCommentPending(true);
    try {
      const newComment = await createComment(post.id, trimmed);
      setComment("");

      // Append the new comment to the current post in memory.
      setPost((prev) => {
        if (!prev) return prev;
        const current = Array.isArray(prev.comments) ? prev.comments : [];
        return {
          ...prev,
          comments: [newComment, ...current].filter(Boolean),
        };
      });
    } catch (err) {
      setError(err.message || "Failed to create comment.");
    } finally {
      setCommentPending(false);
    }
  }

  async function handleDeleteComment(commentId) {
    if (!loggedIn) return;

    const ok = window.confirm("Are you sure you want to delete this comment?");
    if (!ok) return;

    setError("");
    setDeletingCommentId(commentId);
    try {
      await deleteComment(commentId);
      setPost((prev) => {
        if (!prev) return prev;
        const current = Array.isArray(prev.comments) ? prev.comments : [];
        return { ...prev, comments: current.filter((c) => c.id !== commentId) };
      });
    } catch (err) {
      setError(err.message || "Failed to delete comment.");
    } finally {
      setDeletingCommentId(null);
    }
  }

  return (
    <Container className="py-8">
      <div className="flex items-center justify-between gap-3">
        <Link to="/" className="text-sm text-gray-600 hover:underline">
          ← Back to posts
        </Link>

        {loggedIn ? (
          <div className="flex items-center gap-3">
            <Link
              to={`/post/${id}/edit`}
              className="text-sm text-gray-600 hover:underline"
            >
              Edit
            </Link>

            <Button variant="danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        ) : null}
      </div>

      {pending ? <p className="mt-6 text-gray-600">Loading...</p> : null}
      <FormError message={error} className="mt-6" />

      {!pending && !error ? (
        !post ? (
          <p className="mt-6 text-gray-600">Post not found.</p>
        ) : (
          <Card as="article" className="mt-6 p-5">
            <h1 className="text-2xl font-semibold">
              {post.title || `Post #${post.id}`}
            </h1>

            <div className="mt-2 text-sm text-gray-600">
              {post.name ? <span>By {post.name}</span> : null}
              {post.created_at ? (
                <span>
                  {post.name ? " • " : ""}
                  {post.created_at}
                </span>
              ) : null}
            </div>

            {post.content ? (
              <p className="mt-4 text-gray-900 whitespace-pre-wrap">
                {post.content}
              </p>
            ) : (
              <p className="mt-4 text-gray-600">No content.</p>
            )}

            <div className="mt-8">
              <h2 className="text-lg font-semibold">Comments</h2>

              <form onSubmit={handleCommentSubmit} className="mt-3 space-y-2">
                <Textarea
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={commentPending}
                  required
                />

                <Button type="submit" disabled={commentPending}>
                  {commentPending ? "Sending..." : "Send"}
                </Button>

                <p className="text-xs text-gray-500">
                  Guest users can also comment.
                </p>
              </form>

              {Array.isArray(post.comments) && post.comments.length > 0 ? (
                <div className="mt-6 grid gap-3">
                  {post.comments.map((c) => {
                    const author = c.user_id ? c.name || `User #${c.user_id}` : "Guest";
                    const isDeletingThis = deletingCommentId === c.id;
                    return (
                      <Card key={c.id} className="p-3 rounded-md">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm text-gray-600">
                            <span>{author}</span>
                            {c.created_at ? <span> • {c.created_at}</span> : null}
                          </div>

                          {loggedIn ? (
                            <Button
                              variant="danger"
                              onClick={() => handleDeleteComment(c.id)}
                              disabled={Boolean(deletingCommentId)}
                            >
                              {isDeletingThis ? "Deleting..." : "Delete"}
                            </Button>
                          ) : null}
                        </div>
                        <p className="mt-2 whitespace-pre-wrap">{c.comment}</p>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-6 text-gray-600">No comments yet.</p>
              )}
            </div>
          </Card>
        )
      ) : null}
    </Container>
  );
}

export default Post;
