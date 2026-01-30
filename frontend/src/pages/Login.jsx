import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import Container from "../components/ui/Container";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";
import FormError from "../components/ui/FormError";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setPending(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to login.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Container size="sm" className="py-10">
      <h1 className="text-2xl font-semibold">Login</h1>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-3">
        <TextInput
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <TextInput
          type="password"
          placeholder="Jelszó"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <FormError message={error} />

        <Button type="submit" disabled={pending} fullWidth>
          {pending ? "Login..." : "Login"}
        </Button>
      </form>
    </Container>
  );
}
