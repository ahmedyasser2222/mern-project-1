import "./products.css";
import Sidebar from "../sidebar/Sidebar";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../API";

function Products_admin(props) {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState(false);
  const [search,setSearch]=useState("")
  useEffect(() => {
    async function getProducts() {
      try {
        const res = await axios.get(`${API}/api/product`);
        setData(res.data.products);
        setProducts(true);
      } catch (error) {
        setProducts(false);
      }
    }
    getProducts();
  }, []);
 const getProductBySearch =async(e)=>{
   const res=await axios.post(`${API}/api/product/s/product` ,{search:e.target.value})
   setData(res.data.products)
 }
  return (
    <div className="admin products_admin">
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
            <Link to={"/admin/products/new"}>
              <i className="fa fa-shopping-bag"></i>
              <div>add new Product</div>
            </Link>
          </button>
          <input type={"search"} placeholder="Name Product" onChange={getProductBySearch} />
          <button>
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div className="table">
          {products ? (
            <table>
              <thead>
                <tr class="table100-head">
                  <th class="column1 col">Image</th>
                  <th class="column2 col">Title</th>
                  <th class="column4 col">Price</th>
                  <th class="column5 col">Amount</th>
                  <th class="column5 col">actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? data.map((product) => {
                  return (
                    <tr>
                      <td class="column1 col col-img" ><img src={product.image}/></td>
                      <td class="column2 col" >{product.title.substring(0,15)+"..."}</td>
                      <td class="column3 col">{product.price}</td>
                      <td class="column4 col">{product.amount}</td>
                      <td class="column4 col">
                           <i className="fa fa-trash"></i>
                          <Link to={`/admin/product/${product._id}`} className="fa fa-pencil"></Link>
                      </td>

                    </tr>
                  );
                }) : <div>There are not Products </div>}
              </tbody>
            </table>
          ) : (
            <div className="not-user">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Products_admin;