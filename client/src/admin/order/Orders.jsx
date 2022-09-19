import "./order.css";
import Sidebar from "../sidebar/Sidebar";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import {API} from "../../API"
function Orders(props) {
    useEffect(()=>{
     async function getData(){
     try {
         const res =await axios.get(`${API}/api/order`,{headers:{token:localStorage.getItem("token")}})
          setData({products:res.data.products ,orders:res.data.orders}) 
     } catch (error) {
     }
     }
     getData()
    },[])
    const [data,setData]=useState({
        orders:[{quantity:2}],
        products:[{price:2}]
    })
  return (
    <div className="admin order_admin">
      <div className="side">
        <Sidebar />
      </div>
      <div className="conadmin">
        <div className="head">
          <div className="divimg">
            <img src="https://www.taager.com/assets/img/account-navigation-icons/orders.svg" />
          </div>
          <div className="txt">
            <h2>All Orders</h2>
          </div>
        </div>
        <div className="con-ords">
          <div className="ords">
            {data.orders.length >1 ? 
            data.orders.map(order=>{
                return(
                    <>
                    <div className="ord">
              <div className="prods">
                {data.products[data.orders.indexOf(order)].map(product=>{
                    return(
                        <div className="prod">
                  <div className="img_product">
                    <img src={product.image} />
                  </div>
                  <div className="title">
                    <h4>{product.title}</h4>
                    <div className="price">
                      <p>price : {product.price}</p>
                      <p>count : {order.products[data.products[data.orders.indexOf(order)].indexOf(product)].quantity}</p>
                      <p>total : {product.price * order.products[data.products[data.orders.indexOf(order)].indexOf(product)].quantity}</p>
                      <p><i className="fa fa-trash-o"></i></p>
                    </div>
                  </div>
                </div>
                    )
                })}
             
              </div>
              <div className="user">
                <div className="set">
                <label>Name </label>
                <p>{order.name}</p>
                </div>
                <div className="set">
                <label>Govern </label>
                <p>{order.governorate}</p>
                </div>
                <div className="set">
                <label>City </label>
                <p>{order.address}</p>
                </div>
                <div className="set">
                <label>Phone </label>
                <p>{order.mobileNumber}</p>
                </div>
                <div className="set">
                <label>Products </label>
                <p>{order.countProducts}</p>
                </div>
                <div className="set">
                <label>SE </label>
                <p>35</p>
                </div>
                <div className="set">
                <label>Total Price </label>
                <p>{order.price}</p>
                </div>
                <div className="set">
                    <label>notes  </label>
                    <p></p>
                </div>
                <div className="btns">
                    <button className="confirm">Confirm Order</button>
                    <button>Cancel Order</button>
                    <button>Delay Order</button>
                </div>
              </div>

            </div>
            <hr />
                    </>
                )
            })
            : <div className="not">There are no products
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
