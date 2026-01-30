import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPostForEdit, updatePost } from "../lib/posts";
import Container from "../components/ui/Container";
import TextInput from "../components/ui/TextInput";
import Textarea from "../components/ui/Textarea";
import Button from "../components/ui/Button";
import FormError from "../components/ui/FormError";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pending, setPending] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setPending(true);
      setError("");
      try {
        const data = await getPostForEdit(id);
        if (cancelled) return;
        setTitle(data?.title || "");
        setContent(data?.content || "");
      } catch (err) {
        if (!cancelled) setError(err?.message || "");
      } finally {
        if (!cancelled) setPending(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const data = await updatePost(id, title, content);
      navigate(data?.id ? `/post/${data.id}` : `/post/${id}`);
    } catch (err) {
      setError(err?.message || "");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Container className="py-8">
      <Link to={`/post/${id}`} className="text-sm text-gray-600 hover:underline">
        ← Back to post
      </Link>

      <h1 className="mt-4 text-2xl font-semibold">Edit post</h1>

      {pending ? <p className="mt-6 text-gray-600">Loading...</p> : null}
      <FormError message={error} className="mt-6" />

      {!pending && !error ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <TextInput
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={255}
            disabled={saving}
          />

          <Textarea
            className="min-h-40"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={saving}
          />

          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </form>
      ) : null}
    </Container>
  );
}

