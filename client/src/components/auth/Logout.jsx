import { useEffect } from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCountCart } from '../../redux/slices/cartSlice';
import {  logout } from '../../redux/slices/userSlice';

function Logout() { 
     const dispatch=useDispatch()
     const history= useNavigate()
     const {user}=useSelector(state=>state.user)
    useEffect(()=>{
        function Logout(){
            if(user === null || !user){
                 history("/" , {replace:true})
            }else{
                localStorage.removeItem("user")
                localStorage.removeItem("token")
                dispatch(logout())
                dispatch(setCountCart(0))
                history("/" , {replace:true})
                window.location.reload()
            }
        }
        Logout()
    } , [])

}

export default Logout;