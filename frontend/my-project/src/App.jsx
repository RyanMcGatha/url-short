import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./routes/Home";
import SignUp, { action as addUserAction } from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import AddLink from "./routes/AddLink";

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
      },
      {
        path: "/addlink",
        element: <AddLink />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
