import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { loginStart, loginSuccess ,loginFailure } from '../redux/user/userSlice.js'
import {useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-toastify'




function Login() {
  const [formData,setFormData] = useState({})
 const {loading , error} = useSelector((state)=> state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange =(e)=>{ 
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {

    dispatch(loginStart())

    const res = await fetch('/api/auth/login',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    
 
    const data = await res.json()
    
    if(data.success === false){
     dispatch(loginFailure(data.message || "Invalid credentials"))
      return
    }
    

    dispatch(loginSuccess(data))
    toast.success("login successful")
    navigate('/')
      
      
    } catch (error) {
      dispatch(loginFailure(error.message|| "something went wrong"))
 
    }
    
  } 
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
   <h1 className=' text-center font-bold text-3xl bg-gradient-to-bl from-green-500 via-emerald-500 to-violet-500 bg-clip-text text-transparent leading-normal'>Auth App</h1>

    <h1 className='mt-15 text-3xl text-center font-semibold my-7'>Login</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
   
      <input type="text" placeholder='Email' id='email'
      className='bg-slate-100 p-3 rounded-lg' 
      onChange={handleChange} />
      <input type="password" placeholder='Password' id='password'
      className='bg-slate-100 p-3 rounded-lg' 
      onChange={handleChange} />
      <button disabled={loading} className='bg-slate-700 text-white p-3 
      rounded-lg uppercase hover:opacity-95
      disabled:opacity-80'>{loading?'Loading...':'Login'}</button>
    </form>
    <div>
      <p>Don't have an account</p>
      <Link to="/signup"> 
      <span className='text-blue-500'>Sign UP</span>
      </Link>
    </div>
    <p className='text-red-700 mt-5'>{error}</p>
     
    </div>
  )
}

export default Login
