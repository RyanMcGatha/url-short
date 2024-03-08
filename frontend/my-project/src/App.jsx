import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./routes/Home";
import SignUp, { action as addUserAction } from "./routes/SignUp";
import SignIn, { action as userLoginAction } from "./routes/SignIn";
import AddLink, { action as addLinkAction } from "./routes/AddLink";
import { AuthProvider } from "./routes/AuthContacs";
import LogOut from "./routes/LogOut";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
        action: addUserAction,
      },
      {
        path: "/signin",
        element: <SignIn />,
        action: userLoginAction,
      },
      {
        path: "/addlink",
        element: <AddLink />,
        action: addLinkAction,
      },
      {
        path: "/logout",
        element: <LogOut />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}

export default App;
