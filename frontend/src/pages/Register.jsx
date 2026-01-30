import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import Container from "../components/ui/Container";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";
import FormError from "../components/ui/FormError";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setPending(true);

    try {
      await register(name, email, password);
      navigate("/user/login");
    } catch (err) {
      setError(err.message || "Register failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Container size="sm" className="py-10">
      <h1 className="text-2xl font-semibold">Register</h1>
      <p className="text-gray-600 mt-2">
        Already have an account?{" "}
        <Link to="/user/login" className="hover:underline">
          Login
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3" noValidate>
        <TextInput
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={255}
          autoComplete="name"
        />

        <TextInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <TextInput
          type="password"
          placeholder="Password (min 8 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
          minLength={8}
        />

        <FormError message={error} />

        <Button type="submit" disabled={pending} fullWidth>
          {pending ? "Creating account..." : "Register"}
        </Button>
      </form>
    </Container>
  );
}
