import React from 'react'
import Logo from './Logo'

const LeftSide = () => {
    return (
        <div className='bg-[#DBFF73] h-screen'> 
          <div className="text-left relative ">
            <Logo></Logo>

              
              <div className='ml-20 mb-20 mt-96 '>
                <div className="text-black text-6xl font-bold leading-none ">
                  <div className='ml-96 -mb-20 fixed'>
                    <svg width="192" height="72" viewBox="0 0 192 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="192" height="72" rx="36" fill="#F7FBFA"/>
                          <rect x="32" y="31" width="128" height="8" rx="4" fill="#202025"/>
                          <path d="M145 21L159.5 35.5L145 50" stroke="#202025" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <p>WEL-</p> 
                  <p>COME</p>
                </div>

                <div className='inline-flex mt-5 font-bold' >
                  <div >EMPOWER</div>
                  <div className='ml-96'>YOUR</div>
                  <div className='mt-8 -ml-28'>CREATIVITY</div>
                </div>
              </div>
          </div>
        </div>
       
    )
}

export default LeftSide