"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
const Logo = () => {

  const router = useRouter();

  const handleToHome = () => {
      router.push("/home");
  }
  return (
    <div className='inline-flex mt-5 ml-5 '>
      <button className='flex ' onClick={handleToHome}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M24 2.3091C21.5247 0.880039 18.4752 0.880039 16 2.3091L6.67944 7.6903C4.20424 9.11936 2.67944 11.7604 2.67944 14.6185V25.3809C2.67944 28.239 4.20424 30.88 6.67944 32.3091L16 37.6903C18.4752 39.1194 21.5247 39.1194 24 37.6903L33.3205 32.3091C35.7957 30.88 37.3205 28.239 37.3205 25.3809V14.6185C37.3205 11.7604 35.7957 9.11936 33.3205 7.6903L24 2.3091ZM20 29.9997C25.5228 29.9997 30 25.5225 30 19.9997C30 14.4769 25.5228 9.9997 20 9.9997C14.4771 9.9997 9.99995 14.4769 9.99995 19.9997C9.99995 25.5225 14.4771 29.9997 20 29.9997Z" fill="#010101"/>
            <circle cx="20" cy="20.0001" r="4.44444" fill="#010101"/>
        </svg>
        <div className="ml-4 mt-1 font-bold text-xl">CREAREON</div>
      </button>
       
  </div>    
  )
}

export default Logo;