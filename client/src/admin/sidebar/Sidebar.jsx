import "./sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar(props) {
  const history=useNavigate()
  return (
    <div className="sidebar">
      <div className="top">
        <NavLink to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo">Admin</span>
        </NavLink>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <i className="fa fa-th"></i>
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <li onClick={e=>history('/admin/users')}>
            <i className="fa fa-users"></i>
              <span>Users</span>
          </li>
          <li  onClick={e=>history('/admin/products')}>
            <i className="fa fa-product-hunt"></i>
              <span>Products</span>
          </li>
          <li onClick={e=>history('/admin/orders')}>
            <i className="fa fa-first-order"></i>
            <span>Orders</span>
          </li>
          <li>
            <i className="fa fa-motorcycle"></i>
            <span>Delivery</span>
          </li>
          <li onClick={e=>history('/admin/messages')}>
            <i className="fa fa-commenting-o"></i>
            <span>Messages</span>
          </li>
          <li onClick={e=>history('/logout')}>
            <i className="fa fa-sign-out"></i>
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
