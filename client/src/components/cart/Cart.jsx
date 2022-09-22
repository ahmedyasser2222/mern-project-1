import { useState ,useEffect } from "react";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import axios from "axios"
import {API}  from "../../API"
import {decreament} from "../../redux/slices/cartSlice"
import {setProducts} from "../../redux/slices/order"

import {toast} from "react-toastify"
function Cart() {
  const user=JSON.parse(localStorage.getItem("user"))
   useEffect(()=>{
    async function getData(){
    setLoading(true)
      try {
        const res =await axios.get(`${API}/api/cart`,{headers:{token:localStorage.getItem("token")}})
         setData(res.data.products)
         setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    getData()
   },[])
   
  const history = useNavigate(); 
  const dispatch=useDispatch()
  const notifySuccess=(e)=>toast.success(e)
  const errorNotify=(e)=>toast.error(e)
  const [selectProduct, setSelectProduct] = useState([]);
  const [countProductSelected, setCountProductSelected] = useState(0);
  const [totalPrice , setTotalPrice]=useState(0)
  const [price ,setPrice]=useState(0)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(selectProduct)
  const toOrder=()=>{
    dispatch(setProducts({ products:selectProduct,count:countProductSelected ,totalPrice}))
    history('/order')
  }
  const changePrice = (product, x) => {
    const newData = [...data];
    newData.filter((d) => {
      if (d.productId._id == product.productId._id) {
        d.quantity += x;
        calTotalPrice()
        const p = selectProduct.indexOf(product);
        if (p != -1) {
          setCountProductSelected(countProductSelected + x);
        }
      }
    });
    setData(newData);
  }; 
  const calTotalPrice=()=>{
    var f=0
    for(let i=0 ; i<selectProduct.length ; i++){
       f +=selectProduct[i].quantity * selectProduct[i].productId.price
    }
    setTotalPrice(f)
    setPrice(f)
  }
  const selsetChange = (e, product) => {
    if (e.target.checked) {
      setSelectProduct((prev) => [...prev, product]);
      setCountProductSelected(countProductSelected + product.quantity);
      setTotalPrice(totalPrice + (product.quantity * product.productId.price))
      setPrice(price + (product.quantity * product.productId.price))
    } else {
      let set = [...selectProduct];
      const index = set.indexOf(product);
      set.splice(index, 1);
      setSelectProduct(set);
      setCountProductSelected(countProductSelected - product.quantity);
      setTotalPrice(totalPrice - (product.quantity * product.productId.price))
      setPrice(price - (product.quantity * product.productId.price) )
    }
  };
  const deleteItem=async(product)=>{
    // this to update price
    let set = [...selectProduct];
    const indexs = set.indexOf(product);  
    if(indexs != -1){
      set.splice(indexs, 1);
      setSelectProduct(set);
      setCountProductSelected(countProductSelected - product.quantity);
      setTotalPrice(totalPrice - (product.quantity * product.productId.price))
      setPrice(price - (product.quantity * product.productId.price) )
    }
    // to delete from cards
    const newData=[...data]
    const index=newData.indexOf(product)
    newData.splice(index,1)
    setData(newData)
    dispatch(decreament())
    await axios.delete(`${API}/api/cart/delete/${user._id}/${product.productId._id}`)
    .then((e)=>notifySuccess(e.data.message))
    .catch(e=>{errorNotify(e.response.data.message)})
  }
  return (
    <div className="cart container">
      <div className="con-cart">
        <div className="left">
          <h2>
            Shopping Cart
            <i className="fa fa-shopping-cart"></i>
          </h2>
          {!loading ? 
          <div className="cards">
          {data.length  ? (
            data.map((e) => {
              return (
                
                  <div className="card" key={e.productId._id}>
                    <div className="divimg">
                      <img src={e.productId.image} />
                    </div>
                    <div className="desc">
                      <h3 onClick={s=>history(`/product/${e.productId._id}`)}>{e.productId.title} </h3>
                      <h4>Price : {e.productId.price} $</h4>
                      <p>متوفر حاليا</p>
                    </div>
                    <div className="btns">
                      <button onClick={(s) => changePrice(e, 1)}>+</button>
                      <input
                        type={"number"}
                        className="count"
                        value={e.quantity}
                        onChange={e=>""}
                      />
                      <button
                        onClick={(s) => changePrice(e, -1)}
                        disabled={(e.quantity <= 1) ? true : false}
                      >
                        -
                      </button>
                    </div>
                    <div className="action ">
                      <input
                        type={"checkbox"}
                        className="select"
                        onChange={(s) => selsetChange(s, e)}
                      />
                      <i className="fa fa-trash-o" onClick={ele=>deleteItem(e)}></i>
                    </div>
                  </div>
                
              );
            })
          ) : (
            <div className="no-product">Not Found  Products</div>
          )}
        </div>
        : <div className="no-product">Loading...</div>}

          
        </div>
        <div className="right">
          <h2 style={{ textAlign: "center" }}>Order Details </h2>
          <div className="set">
            <p>Number Products</p>
            <p>{selectProduct ? countProductSelected : 0}</p>
          </div>
          <div className="set">
            <p>Price </p>
            <p>{totalPrice}</p>
          </div>
          <hr />
          <div className="set">
            <button onClick={e=>toOrder()}>Continue to Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
