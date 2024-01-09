import { Routes, Route, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PostJobs from "./pages/PostJobs";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Navbar from "./components/shared/Navbar";
import Banner from "./components/shared/Banner";
import MyJob from "./pages/MyJob";
import UpdateJob from "./pages/UpdateJob";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Navbar />
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Navbar />
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Navbar />
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/post-job"
          element={
            <PrivateRoute>
              <Navbar />
              <PostJobs />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-job"
          element={
            <PrivateRoute>
              <Navbar />
              <MyJob />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-job/:id"
          element={
            <PrivateRoute>
              <Navbar />
              <UpdateJob />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
