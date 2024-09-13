"use client"
import React from 'react'
import axios from 'axios';


const Settings = ({ userData, setUserData, handleSave }) => {

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:8080/image/upload', formData, { withCredentials: true });
      const avatar = response.data;
      console.log(avatar);
      setUserData(prevData => ({
        ...prevData,
        avatar: avatar
      }));
    } catch (error) {
      console.error('Error uploading new avatar:', error);
    }
  };



  return (
      <div className='mt-[100px]'>
        <div className="bg-white p-4">
          <div className='flex justify-between'>
            <h1 className='font-bold text-6xl'>Settings</h1>
            <button
              onClick={handleSave}
              className="h-[60px] w-[147px] bg-black text-white py-2 
              rounded-lg justify-center flex items-center gap-2 mr-[200px]"
            >
              Save
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12.4444L9.26035 17L19 7" stroke="#F7FBFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
  
          <div className="flex justify-between mt-[80px]">
            <img src={userData.avatar} 
            alt='No avatar'
             className="w-[200px] h-[200px] rounded-sm mb-4" />
            <div className='mr-[200px]'>
              <div>Profile Photo</div>
              <div>We recommended you an image of at least 800x800</div>
              <input type="file" className="mt-10" onChange={handleAvatarChange} />
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Settings