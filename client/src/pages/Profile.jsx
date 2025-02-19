

import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, updateProfilePicture, updateUserDetails } from '../redux/user/userSlice';
import { persistor } from '../redux/store';

function Profile() {
  const { currentUser,error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(currentUser?.profilePicture || '');
  const [loading, setLoading] = useState(false);
  const [updatesuccess,setUpdateSuccess] = useState(false)

  // Sync formData with currentUser on initial render and after updates
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    password: '',
  });

  useEffect(() => {
    setFormData({
      username: currentUser?.username || '',
      email: currentUser?.email || '',
      password: '',
    });
    setPreviewImage(currentUser?.profilePicture || '');
  }, [currentUser]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file)); // Show preview before uploading
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      if (formData.username) formDataToSend.append('username', formData.username);
      if (formData.email) formDataToSend.append('email', formData.email);
      if (formData.password) formDataToSend.append('password', formData.password);
      if (selectedImage) formDataToSend.append('image', selectedImage);
      
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Update Redux state with new user data
        dispatch(updateProfilePicture(data.profilePicture));
        dispatch(updateUserDetails({ username: data.username, email: data.email }));

        // Ensure Redux Persist updates correctly
        persistor.flush().then(() => {
          console.log('Redux Persist cache updated!');
        });

        setPreviewImage(data.profilePicture || previewImage);
        setSelectedImage(null);
      } else {
        console.error('Update failed:', data.message);
      }
      setUpdateSuccess(true)
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    setLoading(false);
  };

 
 


 const  handleDeleteAccount = async ()=>{
  try {
    dispatch(deleteUserStart())
    const res = await fetch(`/api/user/delete/${currentUser._id}`,{
     method : 'DELETE',
    });
    const data = await res.json()
    if(data.success === false){
      dispatch(deleteUserFailure(data))
      return
    }
    dispatch(deleteUserSuccess(data))
       
  
  
  } catch (error) {
    dispatch(deleteUserFailure(error))
  }
 }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        {/* Hidden File Input */}
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={handleImageChange} />
        
        {/* Profile Picture Preview */}
        <img
          src={previewImage}
          alt='profile'
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
          onClick={() => fileRef.current.click()}
        />

        {/* Form Fields */}
        <input value={formData.username} type="text" id='username'
          placeholder='Username' className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange} />
        
        <input value={formData.email} type="email" id='email'
          placeholder='Email' className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange} />

        <input value={formData.password} type="password" id='password'
          placeholder='Password (leave blank if unchanged)' className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange} />

        {/* Update Button */}
        <button 
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' 
          disabled={loading}
          onClick={handleUpdateProfile}
          type="button"
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span  onClick={handleDeleteAccount} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error && "Something went wrong"}</p>
      <p className='text-green-700 mt-5'>{updatesuccess && "Profile updated Sucessfully"}</p>
    </div>
  );
}

export default Profile;




