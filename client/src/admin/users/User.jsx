import axios from "axios";
import "./users.css";
import React, { useEffect, useState } from "react";
import { API } from "../../API";
import Sidebar from "../sidebar/Sidebar";
import { useParams } from "react-router-dom";
function User(props) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(`${API}/api/user/${params.id}`,{headers:{token:localStorage.getItem("token")}});
        setUser(res.data.user[0]);
        loading(false);
      } catch (error) {
        loading(true);
      }
    }
    getUser();
  }, []);
  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  return (
    <div className="admin">
      <div className="side">
        <Sidebar />
      </div>
      <div className="conadmin">
        <div className="table">
          <div className="update">
            <h2>Updaet User :</h2>
            <div className="div">
            <label>Name : </label>
            <input
              type={"text"}
              placeholder="name"
              value={user.name}
              onChange={handleChange}
              id="name"
            />
            </div>
           <div className="div">
           <label>Email :</label>
            <input
              type={"text"}
              placeholder="email"
              value={user.email}
              onChange={handleChange}
              id="email"
            />
           </div>
            <div className="div">
            <label>Password :</label>
            <input
              type={"text"}
              placeholder="new password"
              onChange={handleChange}
              id="name"
            />
            </div>
            <div className="chek">
              <div>
                <label>isAdmin</label>
                <input
                  type={"checkbox"}
                  onChange={(e) =>
                    setUser({ ...user, isAdmin: e.currentTarget.checked })
                  }
                  checked={user.isAdmin}
                />
              </div>
              <div>
                <label>Verifiyed</label>
                <input
                  type={"checkbox"}
                  onChange={(e) =>
                    setUser({ ...user, verified: e.currentTarget.checked })
                  }
                  checked={user.verified}
                />
              </div>
              <label>Order : 20</label>
            </div>
            <button>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
