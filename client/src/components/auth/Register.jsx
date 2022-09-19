import React, { useState } from 'react';
import {  toast } from 'react-toastify';
import axios from "axios"
import "./auth.scss"
import {API}from "../../API"
function Register() {

    const [user ,setUser]=useState({
        name:"",
        email:"",
        password:""
    })
    const notify = (e) => toast.success(e);
    const notifyError=(e)=> toast.error(e)
    const handelChange=(e)=>{
        setUser({...user , [e.target.name]:e.target.value})
    }
  const handelSubmit=async(e)=>{
        e.preventDefault()
        try {
            axios.post(`${API}/api/auth/register` ,user)
            .then(e=> notify(e.data.msg))
            .catch(e=> {
                console.log(e)
                notifyError(e.response.data.msg)
            })
        }
        catch (error) {
            toast.error("error")
        }
               
    }

    return (
        <div className='register'>
                  <div className="divLogin">
                      <form  onSubmit={handelSubmit} method="POST">
                            <label>Register</label>
                            <input type={"text"}  placeholder='Name' name='name' onChange={handelChange} />
                            <input type={"text"}  placeholder='Email' name='email' onChange={handelChange} />
                            <input type={"password"}  placeholder="Password" name='password'  onChange={handelChange}/>
                            <input  type={"submit"} value="Sign Up" className='btn'  />
                      </form>
                      <p>Or</p>
                      <div className="google">
                             <button className='btn' >
                                  <i className='fa fa-google'></i>
                                   Sign In with Google
                             </button>
                      </div>
               </div>
               
        </div>
    );
}

export default Register;