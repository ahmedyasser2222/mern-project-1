import axios from 'axios';
import { useState , useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {  toast } from 'react-toastify';
import Page404 from "../page404/Page404"
import {API}from "../../API"
function SetPassword(props) {
    const params=useParams()
    const history=useNavigate()
    const [user ,setUser]=useState({
        password:""
    })
    const [valid , setValid]=useState(false)
    const notify = (e) => toast.success(e);
    const notifyError=(e)=> toast.error(e)
    const [loading , setLoading]=useState(true)

     useEffect(()=>{
        return async()=>{
            try {
                const res= await axios.get(`http://localhost:8000/api/auth/${params.id}/${params.token}`)
                   setLoading(true)
                  setLoading(false)
                  setValid(true)
            } catch (error) {
                    setLoading(false)
                    setValid(false)
            }
        }
     },[])

     const  handelSubmit=async(e)=>{
        e.preventDefault()
        try {
            axios.post(`${API}/api/auth/${params.id}/${params.token}`,user)
            .then(e=> {
                notify(e.data.msg)
                history("/auth/login" , {replace:true})
            })
            .catch(e=> {
                notifyError(e.response.data.msg)
            })
        }
        catch (error) {
            alert("2 error")
        }
     }
     const SetPassword=()=>{
        return (
            <div className="divLogin">
                      <form  onSubmit={handelSubmit} method="POST">
                            <label>New Password</label>
                            <input
                            type={"password"} placeholder='Password'
                             name='password'
                            onChange={e=>setUser({...user ,[e.currentTarget.name]:e.currentTarget.value})} 
                            value={user.password}
                            />
                            <input  type={"submit"} value="Update" className='btn'/>
                      </form>
               </div>
        )
     }

    return (
        <div className='login'>
               {
                loading ?<div className='divLogin'> Loading </div>  : ( valid ? <SetPassword/> : <Page404/> )
               }
              
        </div>
    );
}

export default SetPassword;