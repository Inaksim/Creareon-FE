"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/profile/profile/me', {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleToProfile = () => {
    router.push(`/me`);
  };

  const handleToSetting = () => {
    router.push(`/me/settings`);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/logout', {}, {
        withCredentials: true,
      });
      console.log('Successfully logged out:', response);
      router.push("/")
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2  text-white px-4 py-2 rounded-full  focus:outline-none"
      >
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="3" rx="1.5" fill="#E1E2E2"/>
            <rect y="9" width="18" height="3" rx="1.5" fill="#E1E2E2"/>
          </svg>
      </button>

      {isOpen && user && (
        <div className="absolute right-0 mt-2 w-[400px] h-[400px] bg-black rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-4 flex items-center">
            <img
              src={user.avatar} 
              alt='/images/image.png'
              className="w-[70px] h-[70px] rounded-full mr-3"
            />
            <div>
              <p className="font-bold text-white ">{user.firstName}</p>
              <p className="text-sm text-white">{user.username}</p>
            </div>
          </div>
          <div className=" mt-10 divide-y divide-slate-700 ml-[10px]">
            
            <button
              className="w-full text-left px-4 font-bold text-3xl py-2 text-white hover:text-yellow-400 inline-flex" onClick={handleToProfile}
            >
                

              My Profile
              <svg className='ml-[150px]' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 20H35" stroke="#F7FBFA" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21.6665 6.66634L34.9998 19.9997L21.6665 33.333" stroke="#F7FBFA" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
           

           
            <button
              className="w-full text-left px-4 py-2 mt-10 text-white font-bold text-3xl  hover:text-yellow-400 inline-flex" onClick={handleToSetting}
            >
              Settings
              <svg className='ml-[180px]' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 20H35" stroke="#F7FBFA" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21.6665 6.66634L34.9998 19.9997L21.6665 33.333" stroke="#F7FBFA" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

            <button
              className="w-full text-left px-4 py-2 mt-10 text-white font-bold text-3xl  hover:text-yellow-400 inline-flex" onClick={handleLogout}
            >
              Logout
              <svg className='ml-[180px]' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 20H35" stroke="#F7FBFA" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21.6665 6.66634L34.9998 19.9997L21.6665 33.333" stroke="#F7FBFA" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            </div>
          </div>

      )}
    </div>
  );
};

export default UserDropdown;
