import { useState ,useEffect } from 'react';
import Categories from '../categories/Categories';
import Filter from '../filter/Filter';
import SlideShow from '../slideShow/SlideShow';
import axios from "axios"
import {API} from "../../API"
import Footer from '../footer/Footer';
function Home(props) {
  const [data,setData]=useState({})
  
     useEffect(()=>{
      async  function getData(){
            const res=await axios.get(`${API}/api/product/home/sort`)
            setData(res.data)
        }
        getData()
    },[])
    
    return (
        <div>
               <SlideShow/>
               <Categories/>
              {data ? 
              <>
              <Filter type="best-seler" products={data.sortByOrder}  />
               <Filter type="new"       products={data.newProducts} />
               <Filter type="men"    products={data.menProducts}/>
               <Filter type="women" products={data.womenProducts} />
              </>  : <></>
              }
              <Footer/>
        </div>
    );
}

export default Home;