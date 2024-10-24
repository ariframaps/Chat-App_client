import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/ReactToastify.css";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Chat } from "./pages/Chat";
import { SetAvatar } from "./pages/SetAvatar";
import { isUserLoggedIn } from "./utils/validators";

function App() {
  const user: string | null = isUserLoggedIn();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />}></Route>
        <Route
          path={"/register"}
          element={user ? <Navigate to="/" replace /> : <Register />}
        ></Route>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        ></Route>
        <Route path="/set-avatar" element={<SetAvatar user={user} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
