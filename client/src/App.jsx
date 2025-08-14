import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./ThemeProvider";
import MainLayout from "./layout/MainLayout";
import Navbar from "./components/ui/Navbar";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import SearchPage from "./pages/student/SearchPage";
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import Sidebar from "./pages/admin/lecture/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";

import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Public / Home */}
            <Route
              index
              element={
                <>
                  <HeroSection />
                  <Courses />
                </>
              }
            />
            {/* Login */}
            <Route
              path="login"
              element={
                <AuthenticatedUser>
                  <Login />
                </AuthenticatedUser>
              }
            />
            {/* Student routes */}
            <Route
              path="my-learning"
              element={
                <ProtectedRoute>
                  <MyLearning />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="course/search"
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="course-detail/:courseId"
              element={
                <ProtectedRoute>
                  <CourseDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="course-progress/:courseId"
              element={
                <ProtectedRoute>
                  <PurchaseCourseProtectedRoute>
                    <CourseProgress />
                  </PurchaseCourseProtectedRoute>
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="admin"
              element={
                <AdminRoute>
                  <Sidebar />
                </AdminRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="course" element={<CourseTable />} />
              <Route path="course/create" element={<AddCourse />} />
              <Route path="course/:courseId" element={<EditCourse />} />
              <Route
                path="course/:courseId/lecture"
                element={<CreateLecture />}
              />
              <Route
                path="course/:courseId/lecture/:lectureId"
                element={<EditLecture />}
              />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
