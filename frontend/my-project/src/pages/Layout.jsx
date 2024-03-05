import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const primaryNav = [
  { title: "Home", url: "/" },
  { title: "Listings", url: "/" },
  { title: "Add Listing", url: "/" },
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
