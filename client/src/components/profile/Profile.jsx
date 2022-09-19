import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { API } from "../../API";
import "./profile.css";
import { toast } from "react-toastify";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const history = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [userUpdate, setUserUpdate] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([
    { image: "", title: "", price: "" },
  ]);
  const [updatedPassword, setUpdatedPassword] = useState({
    curentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    async function getUser() {
      const res = await axios.get(`${API}/api/user/me/profile`, {
        headers: { token: localStorage.getItem("token") },
      });
      setUser(res.data.user);
      setUserUpdate(res.data.user);
    }
    getUser();
  }, []);
  const getOrders = async () => {
    try {
      const res = await axios.get(`${API}/api/order/user`, {
        headers: { token: localStorage.getItem("token") },
      });
      setOrders(res.data.orders);
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const deleteOrder = async (product) => {
    let newOrders = [...orders];
    const index = newOrders.indexOf(product);
    newOrders.splice(index, 1);
    try {
        const res = await axios.delete(`${API}/api/order/${product._id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      toast.success(res.data.message);
      setOrders(newOrders);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleChange = (e, u) => {
    if (u === "user")
      setUserUpdate({ ...userUpdate, [e.target.id]: e.target.value });
    if (u === "pass")
      setUpdatedPassword({ ...updatedPassword, [e.target.id]: e.target.value });
    console.log(updatedPassword);
  };
  const updatePassword = async (e) => {
    e.preventDefault();
    if (
      updatedPassword.newPassword === "" ||
      updatedPassword.confirmNewPassword === "" ||
      updatedPassword.curentPassword === ""
    )
      return toast.warn("Please inter Password");
    if (updatedPassword.newPassword != updatedPassword.confirmNewPassword)
      return toast.error("password does not match");
    try {
      const res = await axios.put(
        `${API}/api/auth/update-password`,
        updatedPassword,
        { headers: { token: localStorage.getItem("token") } }
      );
      toast.success(res.data.message);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      history("/auth/login", { replace: true });
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("card");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.target.className += " active";
  }
  return (
    <div className="con-profile">
      <div className="profile">
        <div className="head">
          <div>
            <button className="tab active" onClick={(e) => openCity(e, "t1")}>
              Information
            </button>
          </div>
          <div>
            <button className="tab" onClick={(e) => openCity(e, "t2")}>
              Update Password
            </button>
          </div>
          <div>
            <button
              className="tab"
              onClick={(e) => {
                openCity(e, "t3");
                getOrders();
              }}
            >
              Orders
            </button>
          </div>
        </div>
        <div className="card main-card" id="t1">
          <div className="top">
            <div className="divimg">
              <img src="https://www.taager.com/assets/img/personal-i.png" />
            </div>
            <div className="set-top">
              <h3>Personal Information</h3>
              <p>You can adjust your personal information and some settings</p>
            </div>
          </div>
          <hr />
          <div className="info">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={user.name} />
            <label htmlFor="email">Email</label>
            <input type={"email"} name="email" value={user.email} />
            <label htmlFor="phone">Phone</label>
            <input type={"tel"} name="phone" />
            <input type={"submit"} value="Update" className="submit" />
          </div>
        </div>
        <div className="card" id="t2">
          <div className="top">
            <div className="divimg">
              <img src="https://www.taager.com/assets/img/password-i.png" />
            </div>
            <div className="set-top">
              <h3>Change Password</h3>
              <p>You can change the password from here</p>
            </div>
          </div>
          <hr />
          <div className="info">
            <label htmlFor="curentPass">Enter the current password</label>
            <input
              type={"password"}
              id="curentPassword"
              autoComplete="new-password"
              onChange={(e) => handleChange(e, "pass")}
            />
            <label htmlFor="newPassword">New Password</label>
            <input
              type={"password"}
              id="newPassword"
              autoComplete="new-password"
              onChange={(e) => handleChange(e, "pass")}
            />
            <label htmlFor="confirmNewPassword">Confirm the new password</label>
            <input
              type={"password"}
              id="confirmNewPassword"
              autoComplete="new-password"
              onChange={(e) => handleChange(e, "pass")}
            />
            <input
              type={"submit"}
              value="Update Password   "
              className="submit"
              onClick={(e) => updatePassword(e)}
            />
          </div>
        </div>
        <div className="card" id="t3">
          <div className="top">
            <div className="divimg">
              <img src="https://www.taager.com/assets/img/account-navigation-icons/orders.svg" />
            </div>
            <div className="set-top">
              <h3>Your Orders</h3>
              <p>You can follow the status of the order and modify it</p>
            </div>
          </div>
          <hr />
          {orders.length > 0 ? (
            <div className="con-orders">
              <div className="orders_">
                <div className="head-order ">
                  <div className="divimg">image</div>
                  <div className="title">Title</div>
                  <div className="count">Quantity</div>
                  <div className="price">Price</div>
                  <div className="date">Date</div>
                  <div className="status">Status</div>
                  <div className="action">Action</div>
                </div>
                {orders.map((order) => {
                  return (
                    <>
                      <div className="order_" key={order._id}>
                        <div className="products_">
                          {products ? (
                            products[orders.indexOf(order)].map((product) => {
                              return (
                                <>
                                  <div className="product_">
                                    <div className="divimg">
                                      <img
                                        src={
                                          product.image
                                        }
                                      />
                                    </div>
                                    <div
                                      className="title"
                                      onClick={(e) =>
                                        history(`/product/${product._id}`)
                                      }
                                    >
                                      <p>
                                        {product.title.length >12
                                        ? product.title.substring(0, 12) + "..."
                                        : product.title}
                                      </p>
                                    </div>
                                    <div className="count">
                                      <p>
                                        {
                                          order.products[
                                            products[
                                              orders.indexOf(order)
                                            ].indexOf(product)
                                          ].quantity
                                        }
                                      </p>
                                    </div>
                                    <div className="price">
                                      <p>{product.price}$</p>
                                    </div>
                                  </div>
                                </>
                              );
                            })
                          ) : (
                            <p>product</p>
                          )}
                        </div>
                        <div className="date">
                          {moment(order.createdAt).format(`DD/MM/YYYY`)}
                          <br />
                          {moment(order.createdAt).format(`hh:mm a`)}
                        </div>
                        <div className="status">{order.status}</div>
                        <div className="action">
                          <i
                            className="fa fa-trash-o"
                            onClick={(e) => deleteOrder(order)}
                          ></i>
                          <i className="fa fa-eye"></i>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="not-orders">You not have orders</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
