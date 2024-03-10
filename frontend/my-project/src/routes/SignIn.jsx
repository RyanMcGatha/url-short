import "./signUp.css";
import { Form, Navigate, useActionData } from "react-router-dom";
import { useAuth } from "./AuthContacs";
import { useEffect } from "react";

export async function action({ request }) {
  const formData = await request.formData();
  const user_name = formData.get("user_name");
  const email = formData.get("email");
  const password = formData.get("password");
  const loginData = { user_name, email, password };

  try {
    const url = "http://localhost:8000/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const statusCode = response.status;
    const data = await response.json();

    const { access_token } = data;
    localStorage.clear();
    localStorage.setItem("access_token", access_token);
    return statusCode === 200 ? true : false;
  } catch (error) {
    console.error("ERROR: ", error);
    return false;
  }
}

const SignIn = () => {
  const { isAuth, setIsAuth } = useAuth();
  const response = useActionData();

  useEffect(() => {
    setIsAuth(response);
  }, [response, setIsAuth]);

  return !isAuth ? (
    <div id="head">
      <div id="mainLink">
        <div className="login-box-shadow">
          <div className="login-box">
            <Form method="POST">
              <div className="user-box">
                <input type="text" name="user_name" />
                <label>User Name</label>
              </div>
              <div className="user-box">
                <input type="text" name="email" />
                <label>Email</label>
              </div>
              <div className="user-box">
                <input type="text" name="password" />
                <label>Password</label>
              </div>
              <div className="user-box">
                <button className="btn" type="submit">
                  SIGN IN
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default SignIn;
