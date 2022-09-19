import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {  toast } from 'react-toastify';
import {API} from "../../API"

function ForgetPassword(props) {
    const [user ,setUser]=useState({
        email:"",
        name:""
    })
    const notify = (e) => toast.success(e);
    const notifyError=(e)=> toast.error(e)

     const  handelSubmit=async(e)=>{
        e.preventDefault()
        try {
            axios.post(`${API}/api/auth/resetpassword` ,user)
            .then(e=> {
                notify(e.data.msg)
            })
            .catch(e=> {
                notifyError(e.response.data.msg)
            })
        }
        catch (error) {
            alert("2 error")
        }
     }


    return (
        <div className='login'>
               <div className="divLogin">
                      <form  onSubmit={handelSubmit} method="POST">
                            <label>Forget Password</label>
                            <input type={"email"} placeholder='Email'name='email'onChange={e=>setUser({[e.currentTarget.name]:e.currentTarget.value})} value={user.email}/>
                            <input  type={"submit"} value="Send"  className='btn'/>
                      </form>
               </div>
              
        </div>
    );
}

export default ForgetPassword;