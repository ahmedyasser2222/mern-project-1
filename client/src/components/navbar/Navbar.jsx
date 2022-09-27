import "./navbar.css";
import { Link, NavLink } from "react-router-dom";
import {  useSelector } from "react-redux";
import { useState } from "react";
function Navbar(props) {
  const toggel = () => {
    document.getElementById("menu").classList.toggle("toggelShow");
    document.getElementById("menu0").classList.remove("toggelShow");
  };
  const toggel0 = () => {
    document.getElementById("menu0").classList.toggle("toggelShow");
    document.getElementById("menu").classList.remove("toggelShow");
  };
  const user = useSelector((state) => state.user.user);
  const { count_cart } = useSelector((state) => state.cart);
  const [show , setShow]=useState(false)
  return (
    <div className="nav">
      <nav className="container navbar">
        <div className="logo">
          <Link to={"/"} className="link">
            <h1>ShOp</h1>
          </Link>
        </div>
   <div>
    
   </div>
       <div className="menu" style={{display:""}} onClick={e=>setShow(!show)}>
          <i className="fa fa-bars"></i>
       </div>

        <div className={`links  ${show ? "show" : ""}`} >
          <ul>
            {user ? (
              user.isAdmin ? (
                <li>
                  <NavLink to={"/admin"} className="link">
                    Admin
                  </NavLink>
                </li>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            <li onClick={toggel0}>
              Categories
              <i className="fa fa-chevron-down"></i>
              <div className="divul" id="menu0">
                <ul>
                  <li>
                    <NavLink to={"/category/id"} className="link">
                      Clothes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/user/order"} className="link">
                      Electronics
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/"} className="link">
                      Computers
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <NavLink to={"/search "} className="link">
                <i className="fa fa-search"></i>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/cart"} className="link">
                <i className="fa fa-shopping-cart"></i>
                <sup>{count_cart ? count_cart : ""}</sup>
              </NavLink>
            </li>
            {user ? (
              <li
                className="logout"
                style={{ color: "white", cursor: "pointer" }}
                onClick={toggel}
              >
                {user && user.name}
                <i className="fa fa-chevron-down"></i>
                <div className="divul" id="menu">
                  <ul>
                  <li>
                    <NavLink to={"/profile"} className="link">
                      <i className="fa fa-user"></i>
                      Account
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/user/order"} className="link">
                      <i className="fa fa-first-order"></i>
                      My Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/logout"} className="link">
                      <i className="fa fa-sign-out"></i>
                      Logout
                    </NavLink>
                  </li>
                  </ul>
                </div>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to={"/auth/login"} className="link">
                    Login
                    <i className="fa fa-sign-in"></i>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/auth/register"} className="link">
                    Sign Up
                    <i className="fa fa-user-plus"></i>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
