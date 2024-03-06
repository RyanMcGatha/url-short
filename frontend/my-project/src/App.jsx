import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./routes/Home";
import SignUp from "./routes/SignUp";
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
