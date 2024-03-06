import "./addLink.css";

const AddLink = () => {
  return (
    <div id="mainLink">
      <div className="login-box-shadow">
        <div className="login-box">
          <form>
            <div className="user-box">
              <input type="text" name="" required="" />
              <label>Link Title</label>
            </div>
            <div className="user-box">
              <input type="text" name="" required="" />
              <label>Link to Shorten</label>
            </div>
            <center>
              <a href="#">
                SEND
                <span></span>
              </a>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLink;
