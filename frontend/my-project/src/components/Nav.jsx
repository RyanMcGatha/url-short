import { useAuth } from "../routes/AuthContacs";
import { Link } from "react-router-dom";
import "./nav.css";

export default function Nav() {
  const { isAuth } = useAuth();
  return (
    <nav>
      <div>
        {isAuth && (
          <div className="navItem">
            <Link to="/">Home</Link>
          </div>
        )}
      </div>
      <div>
        {isAuth && (
          <div className="navItem">
            <Link to="/addlink">Add Link</Link>
          </div>
        )}
      </div>
      <div>
        {isAuth ? (
          <div className="navItem">
            <Link to={"/logout"}>Sign Out</Link>
          </div>
        ) : (
          <div className="navItem">
            <Link to={"/signin"}>Sign In</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
