"use client"

import React from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react'
import validator, { rtrim } from 'validator';


const RightSide = () => {

    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [code, setCode] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const [timeLeft, setTimeLeft] = useState(300);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});


    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const redirectToWelcome = () => {
      router.push('/');
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
    
    const handleSubmit = async () => {
      const verificationCode = code.join('');
      console.log(verificationCode);
      console.log(email);

    try {
      const response = await axios.post('http://localhost:8080/auth/check-verification-code', {
        email,
        verificationCode,
        
      });

      if (response.status === 200) {
        console.log('Verification successful:', response.data);
        router.push('/')

      
      }
    } catch (error) {
      console.error('Verification failed:', error.response ? error.response.data : error.message);
    }
  };
    

    const router = useRouter();

    const handleNextStep = () => {
      if(step == 1) {
        if(!firstName) {alert("Enter firstName"); return}
        if(!username) {alert("Enter username"); return}
      }
      if(step == 2) {
        if(!validateEmail()) {alert("Wrond email"); return}
      }
      if(step == 3) {
        if(password == confirmPassword) {
          if(!validatePassword()) {
            alert("wrond password")
          }
        }
      }
    setStep(step+1);
    
     
      
    };

    const handlePreviousStep = () => {
        setStep((prevStep) => prevStep - 1);
      };
    

    const handleRegister = async (e) => {
     console.log(firstName, username, email, password);
      if(password == confirmPassword) {
        if(!validatePassword()) {
          alert("wrond password");return;
          } else {
              try {
                const response = await axios.post('http://localhost:8080/auth/sign-up', {
                    firstName,
                    username,
                    email,
                    password,
                    });
            
                  if (response.status === 200) {
                    console.log('Регистрация успешна:', response.data);
                    
                    setStep(step+1);
                  }
                  } catch (error) {
                      alert('Ошибка регистрации:', error.data);
                  }
                } 
      } else {
          alert("no match");
      }
          

    }


        
    
    
    

    const handleVerifyCode = async () => {
        try {
          const response = await axios.post('http://localhost:8080/auth/check-verification-code/', {
            email,
            code: verificationCode,
          });
    
          if (response.status === 200) {
            console.log('Подтверждение успешно:', response.data);
            router.push('/welcome'); 
          }
        } catch (error) {
          console.error('Ошибка подтверждения:', error.response ? error.response.data : error.message);
        }
      };
      
      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
      };

      const validateEmail = () => {
        if (!validator.isEmail(email)) {
          setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email address' }));
          return false;
        }
        return true;
      };


  

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

  return (

    <div>
        {step === 1 && (
        <div className='bg-black flex flex-col text-white h-screen font-bold'>
            <div>
                <button className='absolute top-0 right-0 mt-7 mr-10'><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" onClickCapture={redirectToWelcome}>
                    <rect x="1" y="1" width="58" height="58" rx="29" stroke="#202025" stroke-width="2"/>
                    <path d="M39 30H21" stroke="#F7FBFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M29 22L21 30L29 38" stroke="#F7FBFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div className='ml-10 mt-10'>
                What is your name ?
            </div>
            <div className='text-gray-500 ml-10 mt-2'>
                Create new account
            </div>
        <div className="bg-black flex flex-col justify-center items-center h-screen p-8">
                <form className="bg-black p-6 rounded-lg shadow-lg w-full max-w-sm" onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
                <div className="mb-4 relative">
                    <input className="text-white border bg-black appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text"  placeholder="First Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <div class="absolute inset-y-2 right-1 pl-3  
                                flex items-center  
                                pointer-events-none">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 18.5C20 20.0294 16.5714 21 12 21C7.42857 21 4 20.0294 4 18.5C4 16.2692 8 15 12 15C16 15 20 16.5 20 18.5Z" stroke="#F7FBFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 12C14.4853 12 16.5 9.98528 16.5 7.5C16.5 5.01472 14.4853 3 12 3C9.51472 3 7.5 5.01472 7.5 7.5C7.5 9.98528 9.51472 12 12 12Z" stroke="#F7FBFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div className="mb-4 relative">
                    <input className="text-white shadow bg-black appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={username} placeholder="Username" required onChange={(e) => setUsername(e.target.value)}  />
                        <div className='absolute inset-y-2 right-1'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 18.5C20 20.0294 16.5714 21 12 21C7.42857 21 4 20.0294 4 18.5C4 16.2692 8 15 12 15C16 15 20 16.5 20 18.5Z" stroke="#F7FBFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 12C14.4853 12 16.5 9.98528 16.5 7.5C16.5 5.01472 14.4853 3 12 3C9.51472 3 7.5 5.01472 7.5 7.5C7.5 9.98528 9.51472 12 12 12Z" stroke="#F7FBFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
            
                    </div>
                    {errors.username && <p className="text-red-500 text-xs mb-[20px]">{errors.username}</p>}

                </div>
                </form>
                <div>
            
                    <div> 
                        <button className="bg-white hover:bg-black text-black  hover:text-white outline-white outline outline-offset-0 mt-10 w-60 h-10 font-bold" type="button" onClick={handleNextStep} >
                        Next
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
        )}

        {step === 2 && (

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
                What is your email?
            </div>
            <div className='text-gray-500 ml-10 mt-2'>
                Create new account
            </div>
            <div className="bg-black flex flex-col justify-center items-center h-screen p-8">
                <form className="bg-black p-6 rounded-lg shadow-lg w-full max-w-sm">
                <div className="mb-4 relative" >
                    <input className="text-white border bg-black appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div class="absolute inset-y-2 right-1 pl-3  
                                flex items-center  
                                pointer-events-none">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.6 19.6C13.8 19.9 12.9 20 12 20C7.6 20 4 16.4 4 12C4 7.6 7.6 4 12 4C16.4 4 20 7.6 20 12C20 12.5 20 12.2 20 12.5C19.5 16.5 16.6388 16.6433 15.5 15.2C14.6148 14.0781 15.1 12.5 16.2 9.3M13.0539 8.33156C14.7871 9.05394 15.4859 11.3338 14.6148 13.4238C13.7437 15.5139 11.6326 16.6225 9.89937 15.9002C8.16619 15.1778 7.46734 12.8979 8.33844 10.8079C9.20954 8.71787 11.3207 7.60918 13.0539 8.33156Z" stroke="#F7FBFA" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mb-[20px]">{errors.email}</p>}

                </div>
                </form>
                <div>
            
                    <div> 
                        <button className="bg-white hover:bg-black text-black  hover:text-white outline-white outline outline-offset-0 mt-10 w-60 h-10 font-bold" type="button" onClick={handleNextStep} >
                        Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )}
        
        {step === 3 && (
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
                Create new password
            </div>
            <div className='text-gray-500 ml-10 mt-2'>
                Create your account
            </div>
        <div className="bg-black flex flex-col justify-center items-center h-screen p-8">
                <form className="bg-black p-6 rounded-lg shadow-lg w-full max-w-sm">
                <div className="mb-4 relative">
              <input
                className="text-white border bg-black appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                    <div> 
                        <button className="bg-white hover:bg-black text-black  hover:text-white outline-white outline outline-offset-0 mt-10 w-60 h-10 font-bold" type="button"
                         onClick={handleRegister} >
                        Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )}
        
        {step === 4 && (

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
                         <button className="bg-white hover:bg-black text-black  hover:text-white outline-white outline outline-offset-0 mt-10 w-60 h-10 font-bold" type="button" onClick={handleSubmit}>
                         Submit
                         </button>
                     </div>
                 </div>
             </div>
         </div>
        )}
    </div>
   
    
  );
};

export default RightSide