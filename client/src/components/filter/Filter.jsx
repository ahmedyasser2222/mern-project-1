import { useRef ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./filter.css";
import Card from "../card/Card";

function Filter({type ,products }) {   
     const CardsWidth=useRef()     
    const Right=()=>{
         CardsWidth.current.scrollLeft +=350
    }
    const Left=()=>{
        CardsWidth.current.scrollLeft -=350
    }   
   const data={
    title:"",
    link:""
   }
   switch (type){
    case 'best-seler': 
            data.title="اكثر مبيعا" ;
            data.link ="/products?category=all&f=bestseler&page=1"
         break;
     case 'new' :
      data.title="منتجات جديدة";
        data.link ="/products?category=all&f=new&page=1"
     break ;
     case 'men': 
            data.title="رجال" ;
            data.link ="/products?category=men&f=bestseler&page=1"
         break;
     case 'women' :
      data.title="حريمي";
        data.link ="/products?category=women&f=bestseler&page=1"
     break ;
     case 'kids' :
      data.title="اطفال";
        data.link ="/products?category=all&f=new&page=1"
     break ;
   }
    
  return (
    <>
      <div className="con">
        <div className="head">
          <h3> 
            <Link to={data.link} className="more">
            <i className="fa fa-arrow-left"></i>
                المزيد 
            </Link>
            </h3>
          <label>{data.title}</label>
        </div>
        <div className="conin" id="concards" ref={CardsWidth}>
          <div className="cards" >
           { 
           products ? products.map(e=>{
            return(
                 <>
                 <Card  product={e}/>
                 </>
            )
           }) : <></>
           }
          </div>
        </div>
        <a className="next" onClick={Left}>
          <i className="fa  fa-chevron-left" ></i>
        </a>
        <a className="prev"  onClick={Right}>
          <i className="fa  fa-chevron-right" ></i>
        </a>
      </div>
    </>
  );
}

export default Filter;
