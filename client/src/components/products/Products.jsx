import { useState ,useEffect } from "react";
import "./products.css";
import {useNavigate, useLocation,  useSearchParams } from "react-router-dom"
import axios from "axios"
import {API} from "../../API.js"
import Card from "../card/Card"

function Products(props) {
  const history=useNavigate()
  const [query]=useSearchParams()
  const [products ,setProducts]=useState([])
  
  const [filter ,setFilter]=useState({
    category:query.get("category"),
    page:query.get("page"),
    f:query.get("f")
  })

 const handelChaneg=(e)=>{
   setFilter({...filter ,[e.target.name]:e.target.value})
 }
 useEffect(()=>{
   async function getData(){
    try {
      const res=await axios.get(`${API}/api/product/p/filter?category=${filter.category ?filter.category : "all"}&page=${filter.page ?filter.page : 1}&f=${filter.f ? filter.f : "bestseler"}`)
      console.log(res.data.products)
      setProducts(res.data.products)
    } catch (error) {
      console.log(error)
    }
   }
   getData()

 },[filter])


  return (
    <div className="products">
      <div className="filter-products">
        <h3>
          {" "}
          <i className="fa fa-sliders"></i> Filter Products{" "}
        </h3>
        <div className="set">
          <select name="f" value={filter.f } onChange={handelChaneg}>
            <option value="bestsaler">Best Saler</option>
            <option value="new">New</option>
          </select>
        </div>
        <div className="set">
          <select name="category" value={filter.category} onChange={handelChaneg}>
          <option value="all">All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>
      </div>
      <div className="con-products">
       {products
       ?
       products.map(product=>{
        return (
          <>
          <Card product={product}/>
          </> 
        )
       })
       : <></>
       }
      </div>
      {products.length > 15?
      <div className="pag" >
      <button onClick={e=>history(`/products?category=${filter.category}&f=${filter.f}&page=${parseInt(filter.page)+1}`)}> <i className="fa fa-chevron-left"></i>  </button>
      <button>  <i className="fa fa-chevron-right" onClick={e=>history(`/products?category=${filter.category}&f=${filter.f}&page=${parseInt(filter.page)<= 1 ?"1":parseInt(filter.page)-1}`)}></i> </button>
</div> : <></>
    }
    </div>
  );
}

export default Products;
