import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/ReactToastify.css";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Chat } from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
