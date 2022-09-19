import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../API";
import Page404 from "../page404/Page404.jsx"

function VerifyEmail(props) {
  const params = useParams();
  const [valid, setValid] = useState(false);
  const notify = (e) => toast.success(e);
  const notifyError = (e) => toast.error(e);
  useEffect(() => {
    async function verify() {
      try {
        const res = await axios.get(
          `${API}/api/auth/${params.id}/verify/${params.token}`
        );
        setValid(true);
      } catch (error) {
        setValid(false);
      }
    }
    verify();
  }, []);


  return (
    <>
     {valid ? 
    <div className="verifyEmail">
      <div className="mainDiv">
         
            <div className="divimg">
          <img
            src="https://i.pinimg.com/736x/2e/11/72/2e1172a0a13555af1e8058bb545babdc.jpg"
            style={{ backgroundColor: "red" }}
          />
        </div>
        <div className="btn">
          <p>Verify Successfully </p>
          <Link to={"/auth/login"} className="loginbtn link">
            Login
          </Link>
        </div>
            
      </div>
    </div>
    : <Page404/>}
    </>
  );
}

export default VerifyEmail;
