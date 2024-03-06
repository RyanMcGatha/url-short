import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const primaryNav = [
  { title: "Home", url: "/" },
  { title: "Sign Up", url: "/signup" },
  { title: "Add Link", url: "/addlink" },
];

const Layout = () => {
  return (
    <>
      <Nav navItems={primaryNav} />
      <Outlet />
    </>
  );
};

export default Layout;
