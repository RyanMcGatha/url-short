import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../routes/AuthContacs";
import Nav from "../components/Nav";

const ProtectedRoutesLayout = () => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/addlink" />;
  }

  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default ProtectedRoutesLayout;
