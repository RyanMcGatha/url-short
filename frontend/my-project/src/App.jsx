import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./routes/Home";
import SignUp, { action as addUserAction } from "./routes/SignUp";
import SignIn, { action as userLoginAction } from "./routes/SignIn";
import AddLink, { action as addLinkAction } from "./routes/AddLink";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
