import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router"; // or 'react-router-dom'
import Home from "./pages/Home.jsx";
import HomeDetail from "./pages/HomeDetail.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Registration from "./pages/Registration.jsx";
import Login from "./pages/Login.jsx";
import { useContext } from "react";
import { AppContext } from "./Provider.jsx";

const Navigation = () => {
  const { accessUser } = useContext(AppContext);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={accessUser ? <App /> : <Login />}>
            <Route path="/home" element={accessUser ? <Home /> : <Login />} />
            <Route
              path="/home/:id"
              element={accessUser ? <HomeDetail /> : <Login />}
            />
            <Route
              path="/create-post"
              element={accessUser ? <CreatePost /> : <Login />}
            />
          </Route>
          <Route index path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Navigation;
