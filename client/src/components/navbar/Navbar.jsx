import "./navbar.css";
import { Link, NavLink } from "react-router-dom";
import {  useSelector } from "react-redux";
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
  
  return (
    <div className="nav">
      <nav className="container">
        <div className="logo">
          <Link to={"/"} className="link">
            <h1>ShOp</h1>
          </Link>
        </div>
       <div className="menu">
          <i className="fa fa-bars"></i>
       </div>
        <div className="links">
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
              categories
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
