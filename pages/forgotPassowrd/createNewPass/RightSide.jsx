import React from 'react'

const RightSide = () => {
  return (
    <div className='bg-black flex flex-col text-white h-screen font-bold'>
    <div>
        <button className='absolute top-0 right-0 mt-7 mr-10'><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="58" height="58" rx="29" stroke="#202025" stroke-width="2"/>
            <path d="M39 30H21" stroke="#F7FBFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M29 22L21 30L29 38" stroke="#F7FBFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </div>
    <div className='ml-10 mt-10'>
        Create new password
    </div>
    <div className='text-gray-500 ml-10 mt-2'>
        Forgot password
    </div>
<div className="bg-black flex flex-col justify-center items-center h-screen p-8">
        
        <form className="bg-black p-6 rounded-lg shadow-lg w-full max-w-sm">
        <div className="mb-4 relative" >
            <input className="text-white border bg-black appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"/>
            <div class="absolute inset-y-2 right-1 pl-3  
                        flex items-center  
                        pointer-events-none">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 6.85548C19.7232 8.48958 21 10.792 21 12C21 14 17.5 19 12 19C10.0636 19 8.37512 18.3802 7 17.4898M14 5.22655C13.3678 5.08102 12.7001 5 12 5C6.5 5 3 10 3 12C3 12.73 3.46629 13.8597 4.32592 15" stroke="#F7FBFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.87868 14.1218C11.0503 15.2933 12.9497 15.2933 14.1213 14.1218C15.2929 12.9502 15.2929 11.0507 14.1213 9.87913M11.5 9.04217C10.9063 9.142 10.3368 9.42099 9.87868 9.87913C9.42054 10.3373 9.14155 10.9067 9.04172 11.5005" stroke="#F7FBFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4 20L20 4" stroke="#F7FBFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </div>
        </div>
        <div className="mb-4 relative">
          <input className="text-white shadow bg-black appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
          <div className='absolute inset-y-2 right-1'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 6.85548C19.7232 8.48958 21 10.792 21 12C21 14 17.5 19 12 19C10.0636 19 8.37512 18.3802 7 17.4898M14 5.22655C13.3678 5.08102 12.7001 5 12 5C6.5 5 3 10 3 12C3 12.73 3.46629 13.8597 4.32592 15" stroke="#F7FBFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.87868 14.1218C11.0503 15.2933 12.9497 15.2933 14.1213 14.1218C15.2929 12.9502 15.2929 11.0507 14.1213 9.87913M11.5 9.04217C10.9063 9.142 10.3368 9.42099 9.87868 9.87913C9.42054 10.3373 9.14155 10.9067 9.04172 11.5005" stroke="#F7FBFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4 20L20 4" stroke="#F7FBFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div className='text-gray-500 mt-2 text-sm'>
            Your password must include at least one symbol and be 8 or more charecters long.
          </div>
      </div>
       
    
        
        </form>
        <div>
    
            <div> 
                <button className="bg-white hover:bg-black text-black  hover:text-white outline-white outline outline-offset-0 mt-10 w-60 h-10 font-bold" type="button" >
                Save
                </button>
            </div>
            
            
        </div>
        
    </div>
</div>
  )
}

export default RightSide