import "./signUp.css";
import { Form, redirect } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const long_url = formData.get("long_url");

  const linkData = { title, long_url };

  try {
    const url = "http://localhost:8000/links/create";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(linkData),
    });

    const statusCode = response.status;

    return statusCode === 200 ? true : false;
  } catch (error) {
    console.error("ERROR: ", error);
    return false;
  }
}

const AddLink = () => {
  return (
    <div id="head">
      <div id="mainLink">
        <div className="login-box-shadow">
          <div className="login-box">
            <Form method="POST">
              <div className="user-box">
                <input type="text" name="title" />
                <label>Link Title</label>
              </div>
              <div className="user-box">
                <input type="text" name="long_url" />
                <label>Link To Shorthen</label>
              </div>
              <div className="user-box">
                <button className="btn" type="submit">
                  SHORTEN
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLink;
