import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./layouts/AppLayout";
import { AuthProvider } from "./features/auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/post/new" element={<CreatePost />} />
          <Route path="/post/:id/edit" element={<EditPost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
