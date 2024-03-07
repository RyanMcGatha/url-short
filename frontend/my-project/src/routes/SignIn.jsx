import "./signUp.css";
import { Form, redirect } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const user_name = formData.get("user_name");
  const email = formData.get("email");
  const password = formData.get("password");
  const data = { user_name, email, password };
  const url = "http://localhost:8000/login";
  const addUser = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => response.json());

  if (addUser && addUser.access_token) {
    console.log("Access token obtained:", addUser.access_token);
    return true;
  } else {
    console.log("Failed to obtain access token");
    return false;
  }
}

const SignIn = () => {
  return (
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
  );
};

export default SignIn;
