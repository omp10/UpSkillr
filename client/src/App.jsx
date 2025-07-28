import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";
import Navbar from "./components/ui/Navbar";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import { ThemeProvider } from "./ThemeProvider";
import MainLayout from "./MainLayout";
import { RouterProvider } from "react-router";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/admin/lecture/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import Course from "./pages/student/Course";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <>
              <HeroSection />
              {/* <Courses/> */}
              
            </>
          ),
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "my-learning",
          element: <MyLearning/>,
        },
        {
          path:"profile",
          element:<Profile/>
        },{
          path:"admin",
          element:<Sidebar/>,
          children:[
            {
              path:"dashboard",
              element:<Dashboard/>
            },
            {
              path:"course",
              element:<CourseTable/>

            },
            {
              path:"course/create",
              element:<AddCourse/>
            },
            {
              path:"course/:courseId",
              element:<EditCourse/>
            }
          ]
        }
      ],
    },
  ]);

  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
