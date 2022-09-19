import { useState } from 'react';
import './auth.scss';
import axios from "axios"
import {  toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {loginStart , loginFaild ,loginSuccess}from "../../redux/slices/userSlice"
import { useDispatch, useSelector } from 'react-redux';
import {API} from "../../API"
function Login(props) {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [valid ,setValid]=useState(false)
    const [loading ,setLoading]=useState(false)
    
    const [user ,setUser]=useState({
        email:"",
        password:""
    })
    const notify = (e) => toast.success(e);
    const notifyError=(e)=> toast.error(e)
    const handelChange=(e)=>{
        setUser({...user , [e.target.name]:e.target.value})
    }
  
 const validation =()=>{
     if(user.email == "")
      return notifyError("Please Inter Email ") 
      if(user.password == "")
      return notifyError("Please Inter Password ")
      setValid(true)
 }
  const handelSubmit=async(e)=>{
        e.preventDefault()
        validation()
        if(valid){
            dispatch(loginStart())
            setLoading(true)
            axios.post(`${API}/api/auth/login` ,user)
            .then(e=> {
                notify(`Hello ${e.data.user.name}`)
                setLoading(false)
                localStorage.setItem("token" , e.data.token)
                localStorage.setItem("user" , JSON.stringify(e.data.user))  
                dispatch(loginSuccess(e.data.user))   
                 navigate("/" , {replace:true})
            })
            .catch(e=> {
                console.log(e)
                notifyError(e.response.data.message)
                dispatch(loginFaild())
                setLoading(false)
            })
        }// end if 
    }            
    
    const google=()=>{
        window.open(`${API}/auth/google`,'_self')
    }
    return (
        <div className='login'>
               <div className="divLogin">
                      <div className="form">
                            <form  onSubmit={handelSubmit} >
                                    <label>Login</label>
                                    <input type={"email"}  placeholder='Email' name='email' onChange={handelChange} value={user.email}/>
                                    <input type={"password"} placeholder="Password" name='password'  onChange={handelChange} value={user.password}/>
                                    <p className='forget'> 
                                    <Link to={"/auth/forgetpassword"} className="">forget password?</Link>
                                    </p>
                                    <input  type={"submit"} value= {loading ?  "Loading ..." : " Sign In" }  className='btn' />
                            </form>
                            <p>Or</p>
                      </div>
                      <div className="google">
                             <button className='btn' onClick={google}>
                                  <i className='fa fa-google'></i>
                                    Sign In with Google
                             </button>
                      </div>
               </div>
              
        </div>
    );
    }
export default Login;