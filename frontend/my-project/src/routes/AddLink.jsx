import "./signUp.css";
import { Form, redirect } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const long_url = formData.get("long_url");
  const data = { title, long_url };

  const url = "http://localhost:8000/links/create";
  const addLink = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => response.json());

  console.log(addLink);

  return redirect("/");
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
