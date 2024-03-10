import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "./AuthContacs";
import Layout from "../pages/Layout";
import Home from "./Home";
import ProtectedRoutesLayout from "../pages/ProtectedRoutesLayout";
import ErrorPage from "../pages/ErrorPage";
import SignIn, { action as signInAction } from "./SignIn";
import SignUp, { action as signUpAction } from "./SignUp";
import AddLink, { action as addLinkAction } from "./AddLink";
import LogOut, { loader as logOutLoader } from "./LogOut";

const Routes = () => {
  const { isAuth } = useAuth();

  const publicRoutes = [
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signin",
          element: <SignIn />,
          action: signInAction,
        },
        {
          path: "/signup",
          element: <SignUp />,
          action: signUpAction,
        },
        {
          path: "/logout",
          element: <LogOut />,
          loader: logOutLoader,
        },
      ],
    },
  ];

  const protectedRoutes = [
    {
      element: <ProtectedRoutesLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/addlink",
          element: <AddLink />,
          action: addLinkAction,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...publicRoutes,
    ...(isAuth ? protectedRoutes : []),
    ...protectedRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
