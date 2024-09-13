'use client'

import React from 'react'
import ContentBlock from './contentBlock'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Header from './header'
import GaleryBlock from './galeryBlock'

const HomePage = () => {
  const [data, setData] = useState([]);
  const containerRef = useRef();
  const scroll = 800;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8080/project/top?limit=10', {
          withCredentials:true
        });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching projects', error);
      }
    };
    fetchProjects();
  }, []);

  const handleScroll = (scrollOffset) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: scrollOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div >
      <Header></Header>
      <div className=" ml-10">
      <div className='inline-flex mt-16 font-bold text-8xl h-full w-full ml-[180px] ' >
         <div className='mr-40'>EMPOWER</div>
         <div className='ml-96'>YOUR</div>
         <div className='mt-20 -ml-[635px]'>CREATIVITY</div>
      </div>
      <div className='flex mt-10 '>
         <div className='text-5xl'>BEST WORKS.</div>
         <div className=' inline-flex ml-[1200px] '>
          <button className='flex justify-center items-center mr-3 bg-white rounded-full w-[60px] h-[60px] outline outline-1 outline-gray-500' 
            onClick={() => handleScroll(-scroll)}> 
            <img src='/svg/icons/scrollLeft.svg'></img>
          </button>
          <button className='flex justify-center items-center  bg-black rounded-full w-[60px] h-[60px]'
            onClick={() => handleScroll(scroll)}> 
            <img src='/svg/icons/scrollRight.svg'></img>
          </button>
         </div>
     </div>
     </div>
    <div ref={containerRef} className='overflow-x-scroll scroll-smooth mt-10 mr-20 ml-10' >
      <div className="w-[4000px] flex items-center gap-[10px] " >
      {data.map((item, index) => (
        <ContentBlock
          key={index}
          id={item.id}
          title={item.title}
          username={item.username}
          image={item.cover}
          authorAvatar={item.authorAvatar}
        />
      ))}
      </div>
    </div>
    <div className='flex'>
      <GaleryBlock />
    </div>
  </div>
  );
};
export default HomePage;