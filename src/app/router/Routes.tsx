import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = lazy(() => import("../../pages/home/home"))
const Layout = lazy(() => import("../../app/layout/layout"))
const Login = lazy(() => import("../../pages/auth/login/login"))
const Signup = lazy(() => import("../../pages/auth/signup/signup"));
const Routes = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      path: "/",
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "signup",
          element: <Signup />
        }
      ]
    }
    
  ])

  return <RouterProvider router={router} />
}

export default Routes
