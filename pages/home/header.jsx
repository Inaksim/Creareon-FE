import React from 'react'
import Logo from './logo';
import UserDropdown from './dropdown';
import SearchProjects from './searchProject';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const handleToCreate = () => {
    router.push('/create')
  }
  
  return (
    <header>
      <div className='fixed w-full bg-white   z-50 shadow-md' >
       <Logo></Logo>
        <div className='absolute top-0 right-0 mt-3 inline-flex'>
          <label></label>
          <div className='relative'>
            <SearchProjects/>
          </div>
          <button className='ml-[20px] mr-[20px]' onClick={handleToCreate}> CREATE +</button>
          <UserDropdown />
        </div>
      </div>
    </header>
  )
}

export default Header;