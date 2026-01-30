import { createContext, useContext, useState } from "react";
import {
  getStoredUser,
  isLoggedIn,
  login as loginApi,
  logout as logoutApi,
} from "../../lib/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  async function login(email, password) {
    await loginApi(email, password);
    setLoggedIn(true);
    setUser(getStoredUser());
  }

  function logout() {
    logoutApi();
    setLoggedIn(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth() must be used inside AuthProvider.");
  }
  return ctx;
}
