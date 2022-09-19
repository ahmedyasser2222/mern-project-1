import React from 'react';
import { Link } from 'react-router-dom';
import "./widegt.css"

function Widegt({type , count ,link}) {
    let data;
    const amount =100;
    const deff=20;
    switch(type){
        case 'user':
            data={
                title:"USERS",
                isMoney:false,
                link:"View All Users",
                icon:"fa fa-user"
            }; break;
            case 'order':
                data={
                    title:"ORDERS",
                    isMoney:false,
                    link:"View all Orders",
                    icon:"fa fa-cart-plus"
                }; break;
            case 'earning':
                data={
                    title:"ERARINGS",
                    isMoney:true,
                    link:"View net earnings",
                    icon:"fa fa-usd"
                } ; break;
            case 'products':
                    data={
                        title:"Products",
                        isMoney:false,
                        link:"See Products",
                        icon:"fa fa-credit-card"
                    } ; break;   
    default : break;
    }
    return (

        <div className="widget">
            <div className="left">
                <div><span className="title">{data.title}</span></div>
                <div><span className="counters"> {data.isMoney && "$"}{count} </span> </div>
                <div><Link to={`/admin/${link}`} className="linkwidget" >{data.link}</Link></div>
            </div>
            <div className="right">
                <div className="percentage positive">
                  {deff}%
                </div>
                <i className={data.icon}></i>
            </div>  
       </div>
    );
}

export default Widegt;