import React, { useEffect, useState } from 'react'
import Logo from './logo'
import SearchProjects from './searchProject'
import UserDropdown from '../home/dropdown'
import axios from 'axios'


const Header = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/profile/profile/me', {
          withCredentials: true,
        });
        console.log(user);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <header
      className='relative h-[400px] bg-cover bg-center'
      style={{backgroundImage: "url('/images/header-bg.png')"}}>
    
      <div className='relative p-4' >
       <Logo></Logo>
       {user && (
        <div className='absolute top-0 right-0 mt-3 inline-flex'>
        <label></label>
        <div className='relative'>
          <SearchProjects/>
        </div>
          <div>
            <img 
              src={user.avatar}
              alt="avatar"
              className='ml-[20px] mr-[20px] h-[48px] w-[48px]'></img>
          </div>
        <UserDropdown />
      </div>

       )}
        
      </div>
      </header>
  )
}

export default Header