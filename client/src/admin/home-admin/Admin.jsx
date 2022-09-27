import  './admin.css';
import Sidebar from "../sidebar/Sidebar"
import Widegt from '../widegt/Widegt';
import { useState , useEffect} from 'react';
import axios from "axios"
import {API} from "../../API.js"
import Chart from '../chart/Chart';
function Admin(props) {
    const [count,setCount]=useState({})
    useEffect(()=>{
     async   function getCount(){
          const res=await axios.get(`${API}/api/user/c/count` ,{headers:{token:localStorage.getItem("token")}})
          setCount(res.data)
        }
        getCount()
    },[])
    const  openNav = ()=> {
        document.getElementById("side").style.flex = 8;
       // document.getElementById("main").style.marginLeft = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }
      function closeNav() {
        document.getElementById("side").style.flex =0;
       // document.getElementById("main").style.marginLeft = "0";
        document.body.style.backgroundColor = "white";
        console.log("s")
      }
    return (
             <div className='admin' id="main">
                <div className="menu" onClick={e=>openNav()}>
                    <i className='fa fa-bars' ></i>
                </div>
                
                <div className="side" id='side'>
                <a  className="closebtn" onClick={e=>closeNav()}>&times;</a>
                     <Sidebar />
                </div>
                <div className="conadmin">
                    <div className="widegts">
                        <Widegt type={"user"} count={count.countUser} link={"users"}/>
                        <Widegt type={"order"} count={count.countOrders} link={"orders"} />
                        <Widegt type={"products"} count={count.countProducts} link={"products"}/>
                        <Widegt type={"earning"} count={count.totalPrice} />
                    </div>
                    <div className="chart">
                    <Chart aspect={2/1} title="Last 6 Month (Revenue)"/>

                    </div>
                </div>      
        </div>
    );
}

export default Admin;
