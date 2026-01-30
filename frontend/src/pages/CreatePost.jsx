import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPost } from "../lib/posts";
import Container from "../components/ui/Container";
import TextInput from "../components/ui/TextInput";
import Textarea from "../components/ui/Textarea";
import Button from "../components/ui/Button";
import FormError from "../components/ui/FormError";

export default function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setPending(true);

    try {
      const data = await createPost(title, content);
      if (data?.id) navigate(`/post/${data.id}`);
      else navigate("/");
    } catch (err) {
      setError(err?.message || "");
    } finally {
      setPending(false);
    }
  }

  return (
    <Container className="py-8">
      <Link to="/" className="text-sm text-gray-600 hover:underline">
        ← Back to posts
      </Link>

      <h1 className="mt-4 text-2xl font-semibold">Create post</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <TextInput
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={255}
        />

        <Textarea
          className="min-h-40"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <FormError message={error} />

        <Button type="submit" disabled={pending}>
          {pending ? "Creating..." : "Create"}
        </Button>
      </form>
    </Container>
  );
}

