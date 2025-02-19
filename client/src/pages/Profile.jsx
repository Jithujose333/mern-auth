


import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfilePicture } from '../redux/user/userSlice';
import { persistor } from '../redux/store';

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(currentUser?.profilePicture || '');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file)); // Show preview before uploading
  };

  const handleUpdateProfile = async () => {
    if (!selectedImage) {
      console.warn('No new image selected.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('userId', currentUser._id);

    setLoading(true);
    try {
      const res = await fetch('/api/upload-profile-picture', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Update Redux state with new profile picture
        dispatch(updateProfilePicture(data.profilePicture));

        // Ensure Redux Persist updates correctly
        persistor.flush().then(() => {
          console.log('Redux Persist cache updated!');
        });

        setPreviewImage(data.profilePicture);
        setSelectedImage(null);
      } else {
        console.error('Upload failed:', data.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    setLoading(false);
  };

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
        <input defaultValue={currentUser?.username} type="text" id='username' placeholder='Username' className='bg-slate-100 rounded-lg p-3'/>
        <input defaultValue={currentUser?.email} type="email" id='email' placeholder='Email' className='bg-slate-100 rounded-lg p-3'/>
        <input type="password" id='password' placeholder='Password' className='bg-slate-100 rounded-lg p-3'/>

        {/* Update Button */}
        <button 
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' 
          disabled={loading || !selectedImage}
          onClick={handleUpdateProfile}
          type="button"
        >
          {loading ? 'Uploading...' : 'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
         <span className='text-red-700 cursor-pointer'>Delete Account</span>
         <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
