import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chats from "../../pages/chats/chats";

const Home = lazy(() => import("../../pages/home/home"))
const Layout = lazy(() => import("../../app/layout/layout"))
const Login = lazy(() => import("../../pages/auth/login/login"))
const Signup = lazy(() => import("../../pages/auth/signup/signup"));
const ProtectedRoute = lazy(() => import("../../widget/components/ProtectedRoute"));

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "login",
      element: <Login />
    },
    {
      element: <Layout />,
      path: "/",
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            {
              index: true,
              element: <Home />
            }
          ]
        },
        {
          path:"chat/:id",
          element:<Chats/>
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
