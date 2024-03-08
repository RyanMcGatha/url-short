import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./nav.css";

const Navigation = ({ navItems }) => {
  return (
    <nav>
      <div id="itemContainer">
        {navItems.map((link, index) => {
          return (
            <div id="items" key={`${link.title}-${index}`}>
              <Link className="idek" to={link.url}>
                {link.title}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  navItems: PropTypes.array,
};

export default Navigation;
