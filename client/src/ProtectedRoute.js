import React from "react";
import { useSelector } from "react-redux";
import {  Route , Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
   
    const {user } = useSelector((state) => state.user);
  
       if(!user || user === null){
         return    <Navigate to={"/"} />
       }
       if(user.isAdmin){
          return children
       }else{
        <Navigate  to={"/"} />
       }  
};

export default ProtectedRoute;
