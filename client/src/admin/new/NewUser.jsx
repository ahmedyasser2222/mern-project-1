import "./newuser.css";
import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import axios from "axios";
import { API } from "../../API";
import { toast } from "react-toastify";

function NewUser() {
  const [file, setFile] = useState(null);
  const [user ,setUser] = useState({})
  const notify = (e) => toast.success(e);
  const notifyError = (e) => toast.error(e);

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  const submit=(e)=>{
    e.preventDefault()
     axios.post(`${API}/api/auth/register`,user)
     .then((e)=>{ notify(e.data.msg) })
     .catch(e=>console.log(e))
  }

  return (
    <div className="admin">
      <div className="side">
        <Sidebar />
      </div>
      <div className="conadmin bottomnew">
        <div className="left">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
          />
        </div>
        <div className="right">
          <form onSubmit={submit}>
            <div className="forminput">
              <label htmlFor="file">
                Image : <i className="fa fa-upload icon"></i>
              </label>
              <input
                type={"file"}
                placeholder="ahmed_yasser"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <div className="forminput">
              <label htmlFor="name">Name</label>
              <input type={"text"} 
              placeholder="Ahmed Yasser" 
              id="name" onChange={handleChange} />
            </div>
            <div className="forminput">
              <label htmlFor="email">Email</label>
              <input
                type={"email"}
                placeholder="ahmed_yasser@gmail.com"
                id="email" onChange={handleChange}
              />
            </div>
            <div className="forminput">
              <label htmlFor="password">Password</label>
              <input type={"password"} placeholder="*******" id="password" onChange={handleChange}/>
            </div>
            <input type={"submit"} value="Send" className="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewUser;
