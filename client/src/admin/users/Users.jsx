import "./users.css";
import Sidebar from "../sidebar/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import {API} from "../../API"
function Users(props) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  console.log(Boolean(data))
  useEffect(() => {
    async function getUsers() {
      setLoading(true)
      try {
        const res = await axios.get(`${API}/api/user` ,{headers:{token:localStorage.getItem("token")}});
        setData(res.data.users);
        setLoading(false)
      } catch (error) {
        setData([])
        setLoading(false)
      }
    }
    getUsers();
  }, []);
  const getUserBySearch =async(e)=>{
    const res=await axios.post(`${API}/api/user/s/user` ,{search:e.target.value})
    setData(res.data.users)
  }

  return (
    <div className="admin users_admin">
      <div className="side">
        <Sidebar />
      </div>
      <div className="conadmin">
        <div className="set-user">
          <select>
            <option value="date">Date</option>
            <option value="update">Last update</option>
            <option value="bay">More Orders</option>
          </select>
          <button>
            <Link to={"/admin/user/new"}>
              <i className="fa fa-user-plus"></i>
              <div>add new user</div>
            </Link>
          </button>
          <input type={"search"} placeholder="Name User" onChange={getUserBySearch} />
          <button>
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div className="table">
          {!loading ? 
          data ? (
            <table>

               <thead>
               <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Orders</th>
                <th>action</th>
              </tr>
               </thead>
              <tbody>
                { (
                  data.map((e) => {
                    return (
                      <tr>
                        <td>{data.indexOf(e)+1}</td>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>5</td>
                        <td>
                          <i className="fa fa-trash"></i>
                          <Link to={`/admin/users/${e._id}`} className="fa fa-pencil"></Link>
                        </td>
                      </tr>
                    );
                  })
                ) }
              </tbody>
            </table>
          ) : (
            <div className="not-user">There are no users</div>
          ) : <div className="not-user">Loading...</div>}
        </div>
      </div>
    </div>
  );
}

export default Users;

/*  */
