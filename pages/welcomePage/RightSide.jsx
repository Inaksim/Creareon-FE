"use client "
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import validator from 'validator';
axios.defaults.withCredentials = true;

const RightSide = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
  

    const router = useRouter();

    const redirectToSignup = () => {
      router.push('/signup');
    };

    const redirectToForgotenPass = () => {
      router.push('/forgot-password');
    };

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const validatePassword = (password) => {
      const minLength = 8;
      return password.length >= minLength;
    };
  
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateEmail(email)) {
   
        errors.email = 'Invalid email format';
      }
  
      if (!validatePassword(password)) {
     
        errors.password = 'Password must be at least 8 characters long';
      }
  
    
        const loginData = {email, password};
        try {
          const response = await axios.post('http://localhost:8080/auth/sign-in', loginData);
          if (response.status === 200) {
            sessionStorage.setItem('user', JSON.stringify(response.data));
            console.log(response.data);
            router.push('/home');
          }
        } catch (error) { 
          if (error.response) {
            alert('Login failed:', error.response.data);
          } else if (error.request) {
            alert('No response received:', error.request);
          } else {
            alert('Error setting up request:', error.message);
          }
        }


     
    };

  return (
    <div className="bg-black flex flex-col justify-center items-center h-screen p-8">
      <form className="bg-black p-6 rounded-lg shadow-lg w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <input
            className="text-white border bg-black appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="absolute inset-y-2 right-1 pl-3 flex items-center pointer-events-none">
            <img src='/svg/icons/mail.svg' alt="Email Icon" />
          </div>
       
        </div>
        
        <div className="mb-4 relative">
          <input
            className="text-white shadow bg-black appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='absolute inset-y-2 right-1 cursor-pointer' onClick={toggleShowPassword}>
            <img src={showPassword ? "/svg/icons/eye.svg" : "/svg/icons/eyeof.svg"} alt="Toggle Password Visibility" />
          </div>
        </div>
        
        <div className='flex justify-between'>
          
          <a className="inline-block font-bold text-sm text-gray-700 hover:text-white right-12 me-2 mb-2" href="#" onClick={redirectToForgotenPass}>
            Forgot Password?
          </a>
        </div>
        
        <div className='ml-7 static'>
          <button className='text-white hover:bg-white outline hover:text-black outline-offset-0 outline-white mt-10 w-60 h-10 font-bold' onClick={redirectToSignup}>
            Create Account
          </button>
          <button className='text-black bg-white hover:bg-black outline hover:text-white hover:outline-gray-500 outline-offset-0 outline-white mt-10 w-60 h-10 font-bold' type='submit'>
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}
export default RightSide