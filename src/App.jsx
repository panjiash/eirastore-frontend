import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./redux/authSlice";

import Login from "./pages/Auth/Login";
import HomeIndex from "./pages/Home/Index";
import Register from "./pages/Auth/Register";
import VerifikasiIndex from "./pages/Auth/Verification";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import MainMenuIndex from "./pages/MainMenu/Index";
import UserIndex from "./pages/User/Index";
import RoleIndex from "./pages/Role/Index";
import PermissionIndex from "./pages/Permission/Index";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const whiteListRoute = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify/*",
    "/reset-password/*",
  ];

  useEffect(() => {
    if (!whiteListRoute.includes(location.pathname) && !user) {
      dispatch(getMe());
    }
  }, [dispatch, location.pathname, user]);

  return (
    <Routes>
      {/* auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify/:id" element={<VerifikasiIndex />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:id" element={<ResetPassword />} />

      {/* dashboard */}
      <Route path="/" element={<HomeIndex userLogin={user} />} />
      <Route path="/main-menu" element={<MainMenuIndex userLogin={user} />} />
      <Route path="/user" element={<UserIndex userLogin={user} />} />
      <Route path="/role" element={<RoleIndex userLogin={user} />} />
      <Route
        path="/permission"
        element={<PermissionIndex userLogin={user} />}
      />
    </Routes>
  );
}

export default App;
