import "./addLink.css";
import { Form } from "react-router-dom";

const AddLink = () => {
  return (
    <div id="mainLink">
      <div className="login-box-shadow">
        <div className="login-box">
          <Form method="POST">
            <div className="user-box">
              <input type="text" name="" required="" />
              <label>Link Title</label>
            </div>
            <div className="user-box">
              <input type="text" name="" required="" />
              <label>Link to Shorten</label>
            </div>
            <div className="user-box">
              <button className="btn" type="submit">
                SEND
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddLink;
