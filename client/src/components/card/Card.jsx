import { useNavigate } from 'react-router-dom';
import './card.css';
import {increament,decreament} from "../../redux/slices/cartSlice"
import axios from "axios"
import {useDispatch} from "react-redux"
import {API} from "../../API.js"
import {  toast } from 'react-toastify';

function Card({product}) {
 
    const history=useNavigate()
    const dispatch=useDispatch()

    const addToCart=async(product)=>{
        try {
        dispatch(increament())
        const Product={products:[{productId:product._id , quantity:1}]}
       await axios.post(`${API}/api/cart`,Product ,{headers:{token:localStorage.getItem("token")}})
        toast.success("Product added to Cart")
        } catch (error) {
            dispatch(decreament())
           console.log(error)
            toast.error(error.response.data.message)
        }
      }




    return (
        <div className='single-card'>
              <div className="divimg">
                   <img src={product.image}/>
              </div>
              <div className="con-txt">
                    <div className="txt">
                           <h4 onClick={e=>history(`/product/${product._id}`)}>{product.title.length > 15 ? product.title.substring(0,15)+"..." : product.title}</h4>
                           <p>{product.price} $</p>
                    </div>
                    <div className="icon" onClick={e=>addToCart(product)}>
                          <i className='fa fa-cart-plus'></i>
                    </div>
              </div>
        </div>
    );
}

export default Card;