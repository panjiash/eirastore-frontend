import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import HomeIndex from "./pages/Home/Index";
import Register from "./pages/Auth/Register";
import VerifikasiIndex from "./pages/Auth/Verification";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import MainMenuIndex from "./pages/MainMenu/Index";
import UserIndex from "./pages/User/Index";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          {/* auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:id" element={<VerifikasiIndex />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id" element={<ResetPassword />} />

          {/* dashboard */}
          <Route path="/" element={<HomeIndex />} />
          <Route path="/main-menu" element={<MainMenuIndex />} />
          <Route path="/user" element={<UserIndex />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
