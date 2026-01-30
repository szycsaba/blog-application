import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/", {
      replace: true,
      state: { flash: "Successfully logged out." },
    });
  }, [logout, navigate]);

  return (
    <Container className="py-10">
      <Card className="p-4">
        <p className="text-sm text-gray-600">Logout...</p>
      </Card>
    </Container>
  );
}
