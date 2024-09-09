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
import JobDetails from "./pages/JobDetails";
import MyProfile from "./pages/MyProfile";
import EditProfile from "./pages/EditProfile";
import Applications from "./pages/Applications";
import UsersApplications from "./pages/UsersApplications";
import ApplicantDetails from "./pages/ApplicantDetails";

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
          path="my-job/update-job/:id"
          element={
            <PrivateRoute>
              <Navbar />
              <UpdateJob />
            </PrivateRoute>
          }
        />
        <Route
          path="my-job/users-applications/:id"
          element={
            <PrivateRoute>
              <Navbar />
              <UsersApplications />
            </PrivateRoute>
          }
        />
        <Route
          path="my-job/users-applications/applicant-details/:jobId/:userId"
          element={
            <PrivateRoute>
              <Navbar />
              <ApplicantDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/job-details/:id"
          element={
            <PrivateRoute>
              <Navbar />
              <JobDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <PrivateRoute>
              <Navbar />
              <Applications />
            </PrivateRoute>
          }
        />
        <Route
          path="/applications/job-details/:id"
          element={
            <PrivateRoute>
              <Navbar />
              <JobDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Navbar />
              <MyProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <PrivateRoute>
              <Navbar />
              <EditProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={
            <>
              <Navbar />
              <NotFound />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
