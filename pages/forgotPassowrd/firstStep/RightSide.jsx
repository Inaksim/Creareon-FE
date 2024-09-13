"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react'
import validator from 'validator';


const RightSide = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [code, setCode] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const [timeLeft, setTimeLeft] = useState(300);
    const [verificationCode, setverificationCode] = useState('');
  

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };

      const handleNextStep = () => {
        if (validateEmail()) {
          setErrors({});
          
          setStep(2);
          console.log("step", step);
          if(step == 1) {
            sendCode();
          }
        }
      };

    const handlePreviousStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleChange = (e, index) => {
      const value = e.target.value;
      if (/^[0-9]$/.test(value) || value === '') {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
  
        if (value !== '' && index < 3) {
          inputRefs.current[index + 1].focus();
        }
      }
    };

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


    const handleResendCode = async () => {
      try {
        const response = await axios.post('http://localhost:8080/auth/send-verification-code', { email });
        if (response.status === 200) {
          console.log('Code resent successfully:', response.data);
          setTimeLeft(300); 
        }
      } catch (error) {
        console.error('Failed to resend code:', error.response ? error.response.data : error.message);
      }
    };

    const handleKeyDown = (e, index) => {
      if (e.key === 'Backspace' && code[index] === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    };
  
    const handlePaste = (e) => {
      const paste = e.clipboardData.getData('text').slice(0, 4);
      const newCode = [...code];
      paste.split('').forEach((char, index) => {
        if (/^[0-9]$/.test(char)) {
          newCode[index] = char;
        }
      });
      setCode(newCode);
    };

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);
  
    useEffect(() => {
      if (timeLeft === 0) {
        handleResendCode();
      }
    }, [timeLeft]);
   
    const handleCode = () => {
    
      setverificationCode(code.join(''));
      setStep(3);
    }

    const validateEmail = () => {
        if (!validator.isEmail(email)) {
          setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email address' }));
          return false;
        }
        return true;
      };

      const sendCode = async () => {
        try {
          console.log(email);
          const response = await axios.post('http://localhost:8080/auth/send-verification-code', { email });
          
        } catch (error) {
          console.error('Failed to send code:', error.response ? error.response.data : error.message);
        }
      }

    const validatePassword = () => {
        const passwordErrors = [];
        if (!validator.isLength(password, { min: 8 })) {
          passwordErrors.push('Password must be at least 8 characters long.');
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
          passwordErrors.push('Password must include at least one symbol.');
        }
        if (password !== confirmPassword) {
          passwordErrors.push('Passwords do not match.');
        }
    
        if (passwordErrors.length > 0) {
          setErrors((prevErrors) => ({ ...prevErrors, password: passwordErrors.join(' ') }));
          return false;
        }
    
        return true;
      };

    const handleSubmit = async (e) => {
     const currentErrors = {};

        if (step === 3) {
            if (!validatePassword(password)) {
                currentErrors.password = 'Password must be at least 8 characters long and include at least one symbol';
            }
            if (password !== confirmPassword) {
                currentErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(currentErrors);

        if (Object.keys(currentErrors).length === 0) {
            try {
                
                const response = await axios.put('http://localhost:8080/auth/reset-password', {email, password, verificationCode});
                
                if (response.status === 200) {
                    router.push('/');
                }
            } catch (error) {
                if (error.response) {
                    alert("Error", error.response)
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error setting up request:', error.message);
                }
            }
        }
    };

  return (
    <div>
    {step === 1 && (
      <div className='bg-black flex flex-col text-white h-screen font-bold'>
        <div>
          <button className='absolute top-0 right-0 mt-7 mr-10' onClick={handlePreviousStep}>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="58" height="58" rx="29" stroke="#202025" strokeWidth="2" />
              <path d="M39 30H21" stroke="#F7FBFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M29 22L21 30L29 38" stroke="#F7FBFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className='ml-10 mt-10'>Forgot your password?</div>
        <div className='text-gray-500 ml-10 mt-2'>Input your email</div>
        <div className="bg-black flex flex-col justify-center items-center h-screen p-8">
          <form
            className="bg-black p-6 rounded-lg shadow-lg w-full max-w-sm"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}>
            <div className="mb-4 relative">
              <input
                className="text-white border bg-black appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute inset-y-2 right-1 pl-3 flex items-center pointer-events-none">
                <img src='svg/icons/mail.svg' alt="Mail Icon" />
              </div>
            </div>
            {errors.email && <p className="text-red-500 text-xs mb-[20px]">{errors.email}</p>}
          </form>
          <div>
            <button
              className="bg-white hover:bg-black text-black  hover:text-white outline-white outline outline-offset-0 mt-10 w-60 h-10 font-bold"
              type="button"
              onClick={handleNextStep}>
              Submit
            </button>
          </div>
        </div>
      </div>
    )}
    {step == 2 && (
      
      <div className='bg-black flex flex-col text-white h-screen font-bold'>
      <div>
          <button className='absolute top-0 right-0 mt-7 mr-10'><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handlePreviousStep}>
              <rect x="1" y="1" width="58" height="58" rx="29" stroke="#202025" stroke-width="2"/>
              <path d="M39 30H21" stroke="#F7FBFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M29 22L21 30L29 38" stroke="#F7FBFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
          </button>
      </div>
      <div className='ml-10 mt-10'>
          OTP Verification
      </div>
      <div className='text-gray-500 ml-10 mt-2'>
          Create your account
      </div>
  <div className="bg-black flex flex-col justify-center items-center h-screen p-8">
          <form className="bg-black p-6 rounded-lg shadow-lg w-full max-w-sm"  onSubmit={(e) => {e.preventDefault(); handleSubmit();}}>
              <div className="mb-4 relative space-x-5 flex justify-center" onPaste={handlePaste} >

              {code.map((digit, index) => (
                 <input  key={index}  type="text"
                 maxLength="1"
                 value={digit}
                 onChange={(e) => handleChange(e, index)}
                 onKeyDown={(e) => handleKeyDown(e, index)}
                 ref={(el) => (inputRefs.current[index] = el)}
                 className="w-16 h-12 bg-black text-center text-white border-2 border-white rounded-lg"/>
             ))}
          </div>
          <div className='flex justify-between'>
              <div className='text-sm ml-3 text-gray-500'>Send code reload in</div>
              <div className='text-sm mr-3 text-gray-500'>{formatTime(timeLeft)}</div>
          </div>
          </form>
          <div>
              <div> 
                  <button className="bg-white hover:bg-black text-black  hover:text-white outline-white outline outline-offset-0 mt-10 w-60 h-10 font-bold" type="button" onClick={handleCode}>
                  Submit
                  </button>
              </div>
          </div>
      </div>
  </div>
    )}
    {step === 3 && (
      <div className='bg-black flex flex-col text-white h-screen font-bold'>
        <div>
          <button className='absolute top-0 right-0 mt-7 mr-10' onClick={handlePreviousStep}>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="58" height="58" rx="29" stroke="#202025" strokeWidth="2" />
              <path d="M39 30H21" stroke="#F7FBFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M29 22L21 30L29 38" stroke="#F7FBFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className='ml-10 mt-10'>Create new password</div>
        <div className='text-gray-500 ml-10 mt-2'>Forgot password</div>
        <div className="bg-black flex flex-col justify-center items-center h-screen p-8">
          <form
            className="bg-black p-6 rounded-lg shadow-lg w-full max-w-sm"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}>
            <div className="mb-4 relative">
              <input
                className="text-white border bg-black appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div className='absolute inset-y-2 right-1 cursor-pointer' onClick={toggleShowPassword}>
                <img src={showPassword ? "/svg/icons/eye.svg" : "/svg/icons/eyeof.svg"} alt="Toggle Password Visibility" />
              </div>
            </div>
            <div className="mb-4 relative">
              <input
                className="text-white shadow bg-black appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                id="confPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className='absolute inset-y-2 right-1 cursor-pointer' onClick={toggleShowPassword}>
                <img src={showPassword ? "/svg/icons/eye.svg" : "/svg/icons/eyeof.svg"} alt="Toggle Password Visibility" />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              <div className='text-gray-500 mt-2 text-sm'>
                Your password must include at least one symbol and be 8 or more characters long.
              </div>
            </div>
          </form>
          <div>
            <button
              className="bg-white hover:bg-black text-black  hover:text-white outline-white outline outline-offset-0 mt-10 w-60 h-10 font-bold"
              type="button"
              onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default RightSide;