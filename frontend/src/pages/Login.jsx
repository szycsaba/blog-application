import { useState } from "react";
// useNavigate is not needed because we do a simple redirect after login.
import { login as loginApi } from "../lib/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setPending(true);

    try {
      await loginApi(email, password);
      // Keep it simple: full reload so Navbar reads the latest localStorage values.
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Sikertelen belépés.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold">Belépés</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          className="w-full h-10 px-3 rounded-md border"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <input
          className="w-full h-10 px-3 rounded-md border"
          type="password"
          placeholder="Jelszó"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full h-10 rounded-md bg-black text-white text-sm font-medium hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Beléptetés..." : "Belépés"}
        </button>
      </form>
    </section>
  );
}
