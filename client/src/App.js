import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./components/home/Home";
import Page404 from "./components/page404/Page404";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Register from "./components/auth/Register";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "./redux/slices/userSlice";
import { setCountCart } from "./redux/slices/cartSlice";
import Navbar from "./components/navbar/Navbar";
import ForgetPassword from "./components/auth/forgetPassword";
import SetPassword from "./components/auth/SetPassword";
import VerifyEmail from "./components/auth/VerifyEmail";
import Admin from "./admin/home-admin/Admin";
import Users from "./admin/users/Users";
import NewUser from "./admin/new/NewUser";
import NewProduct from "./admin/new/NewProduct";
import User from "./admin/users/User";
import Product from "./components/product/Product";
import axios from "axios";
import { API } from "./API";
import Cart from "./components/cart/Cart";
import Profile from "./components/profile/Profile";
import Order from "./components/order/Order.jsx";
import Products_admin from "./admin/products/Products.jsx";
import Products from "./components/products/Products";
import Product_admin from "./admin/products/Product";
import Orders from "./admin/order/Orders";
import Message from "./admin/message/Message";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
   async function getData(){
    let user = localStorage.getItem("user");
      if (user === (null || "undefined")) {
        dispatch(setCountCart(0));
        return dispatch(logout());
      }else{
        dispatch(loginSuccess(JSON.parse(user)));      
        const res = await axios.get(`${API}/api/cart/count`, {
          headers: { token: localStorage.getItem("token") },
        });
        dispatch(setCountCart(res.data.count)); 
      }
        
   }
   getData()
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/auth/forgetpassword" element={<ForgetPassword />} />
            <Route path="/resetpassword/:id/:token" element={<SetPassword />} />
            <Route path="/:id/verify/:token" element={<VerifyEmail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order" element={<Order />} />
            <Route path="/products" element={<Products />} />
            <Route path="product/:id" element={<Product />} />
          </Route>
          
        
         <Route path="/admin">
            <Route index element={<ProtectedRoute><Admin /></ProtectedRoute> } />
            <Route path="users" element={<ProtectedRoute ><Users /></ProtectedRoute> } />
            <Route path="products" element={<ProtectedRoute> <Products_admin /> </ProtectedRoute> } />
            <Route path="user/new" element={<ProtectedRoute ><NewUser /></ProtectedRoute> } />
            <Route path="products/new" element={<ProtectedRoute ><NewProduct /></ProtectedRoute> } />
            <Route path="users/:id" element={<ProtectedRoute ><User /></ProtectedRoute> } />
            <Route path="products/:id" element={<ProtectedRoute  ><Product_admin /></ProtectedRoute> } />
            <Route path="orders" element={<ProtectedRoute  ><Orders /></ProtectedRoute> } />
            <Route path="messages" element={<ProtectedRoute  ><Message /></ProtectedRoute> } />
         </Route>
    
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
