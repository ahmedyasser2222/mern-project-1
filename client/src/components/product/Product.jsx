import './product.css';
import axios from "axios"
import {API} from "../../API"
import { useState ,useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom"
import Footer from "../footer/Footer"
import { useDispatch } from 'react-redux';
import {increament , decreament} from "../../redux/slices/cartSlice"
import { toast } from 'react-toastify';

function Product(props) {
    const params=useParams()
    const dispatch=useDispatch()
    const history=useNavigate()
    const [product ,setProduct] = useState({
        productId:{desc:""}
    })
    
    const [showMore ,setShowMore]=useState(false)
    useEffect(()=>{
        async function getProduct(){
            const res=await axios.get(`${API}/api/product/${params.id}`)
            setProduct({...product , productId:res.data.product[0]})       
            setPrice(res.data.product[0].price)
            window.scrollTo =0
        }
        getProduct()

    },[])
    const [quantity,setQuantity]=useState(1)
    const [price,setPrice]=useState(0)
    const changePrice=(x)=>{
      setQuantity(quantity + x)
      setPrice(product.productId.price * (quantity+x))
   }
   const toOrder=()=>{
    history('/order' , {state:{products:[product], count:quantity ,totalPrice:price}})
  }
    const addToCart=async(product)=>{
        try {
            dispatch(increament())
            const Product={products:[{productId:product.productId._id , quantity:1}]}
            axios.post(`${API}/api/cart`,Product ,{headers:{token:localStorage.getItem("token")}})
             .then(()=>{
                  toast.success("Product added to Cart")
             })
             .catch(e=>{
               dispatch(decreament())
               toast.error(e.response.data.message)
             })
            } catch (error) {
             dispatch(decreament())
            }
    }
    return (
        <div className='con-product'>
               <div>
               {product ?
               <div className="product">
               <div className="left divimg">
                     <img src={product.productId.image} />
               </div>
               <div className="right">
                   <h1>{product.productId.title}</h1>
                   <p className='price'>Price : {price ? price :product.productId.price} $</p>
                   <p className='rate'>Rate  : 4.5/5</p>
                   <div className="btns">
                   <button
                    onClick={(s) => changePrice(1)}
                    >+</button>
                      <input
                        type={"number"}
                        className="count"
                        value={quantity}
                        onChange={e=>""}
                      />
                      <button
                        onClick={(s) => changePrice(-1)}
                        disabled={(quantity <= 1) ? true : false}
                      >
                        -
                      </button>
                   </div>
                   <p className='desc'>
                    {!showMore ? product.productId.desc.slice(0,50) : product.productId.desc} 
                    <span style={{color:"blue" ,cursor:"pointer"}} 
                    onClick={e=>setShowMore(!showMore)}
                    
                    >  {!showMore ? "...المزيد " : "اخفاء"}
                    </span>
                    </p>
                    <button onClick={e=>addToCart(product)}>
                         add to cart
                         <i className='fa fa-cart-plus'></i>
                    </button>
                    <button onClick={e=>toOrder()}>
                         bay now
                    </button>
               </div>
           </div>
           : <></>
            }
               </div>
               <div>
                <Footer/>
               </div>
            
        </div>
    );
}

export default Product;