"use client"
import Info from '@/pages/editProfile/info'
import Settings from '@/pages/editProfile/settings'
import Header from '@/pages/home/header'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const page = () => {
    const [userData, setUserData] = useState( {
      avatar:null,
      email: '',      
      username: '',   
      bio: ' ', 
      firstName:'',        
      socialLinks: {   
          twitter: '',
          facebook: '',
          instagram: '',
          linkedin: ''
      }

    }
      
    );
    

    useEffect(() => {
        const fetchData = async () => {
          try {
            const userResponse = await axios.get(`http://localhost:8080/profile/profile/me`, {
              withCredentials: true,
            });
            setUserData(userResponse.data);
            console.log(userResponse.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);

      const handleSave = async () => {
        try {
      
          const response = await axios.put(
            `http://localhost:8080/profile/update`,
            userData,  
            { withCredentials: true }
          );
    
          console.log("Profile updated successfully:", response.data);
          alert("Profile updated successfully");
        } catch (error) {
          console.error("Error saving profile data:", error);
          alert("An error occurred while saving your profile data.");
        }
      };

  return (
    <div className="relative">
            <Header />
            <div className="relative flex " >
                <div className="w-1/2 ">
                    <Settings userData={userData} setUserData={setUserData}  handleSave={handleSave}/>
                </div>
                <div className="w-1/2 ">
                    <Info userData={userData} setUserData={setUserData}/>
                </div>
            </div>
        </div>

  )
}

export default page