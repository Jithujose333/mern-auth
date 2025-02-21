


import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null); // Reset error before making the request

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) { // If response is not 2xx, handle error
        setError(data.message || "Something went wrong");
        return;
      }
     toast.success("user created successfully")
      navigate('/login'); // Redirect to login after successful signup

    } catch (error) {
      setLoading(false);
      setError("Network error, please try again");
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
         <h1 className=' text-center font-bold text-3xl bg-gradient-to-bl from-green-500 via-emerald-500 to-violet-500 bg-clip-text text-transparent leading-normal'>Auth App</h1>

      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' id='username'
          className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <input type="email" placeholder='Email' id='email'
          className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <input type="password" placeholder='Password' id='password'
          className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 
          rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div>
        <p>Already have an account?</p>
        <Link to="/login">
          <span className='text-blue-500'>Login</span>
        </Link>
      </div>
      {error && <p className='text-red-700 mt-5'>{error}</p>}
    </div>
  );
}

export default Signup;
