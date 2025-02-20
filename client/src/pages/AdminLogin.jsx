import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { loginStart, loginSuccess ,loginFailure } from '../redux/user/userSlice.js'
import {useDispatch, useSelector} from 'react-redux'




function AdminLogin() {
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

    const res = await fetch('/api/auth/admin/login',{
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
    navigate('/admin/dashboard')
      
      
    } catch (error) {
      dispatch(loginFailure(error.message|| "something went wrong"))
 
    }
    
  } 
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>Admin Login</h1>
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
    
    <p className='text-red-700 mt-5'>{error}</p>
     
    </div>
  )
}

export default AdminLogin
