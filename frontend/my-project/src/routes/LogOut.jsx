import { redirect } from "react-router-dom";
import "./logOut.css";

const clearToken = () => {
  localStorage.clear();
  return redirect("/");
};

const LogOut = () => {
  return (
    <div id="main">
      <button className="logOutBtn" onClick={clearToken}>
        <h1>Log Out</h1>
      </button>
    </div>
  );
};

export default LogOut;
