"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/pages/projectPage/header';
import UserInfo from '@/pages/profilePage/userInfo';
import UserContent from '@/pages/profilePage/userContent';


const page = () => {
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const me = useState(false);
    useEffect(() => {
      const fetchData = async () => {
        try {
    
          const userResponse = await axios.get(`http://localhost:8080/profile/profile/me`, {
            withCredentials: true,
          });
          setUser(userResponse.data);
          console.log(userResponse.data);
          
          
   
          const postsResponse = await axios.get(`http://localhost:8080/project/get/my`, {
            withCredentials: true,
          });
          setPosts(postsResponse.data);
          console.log(postsResponse.data);
  
     
          const likedPostsResponse = await axios.get(`http://localhost:8080/like/liked`, {
            withCredentials: true,
          });
          setLikedPosts(likedPostsResponse.data);
          console.log(likedPostsResponse.data);
  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);

    

  return (
    <div className='relative' >
      <Header/>
      <div className="relative flex">
        <div className="w-1/2">
            <UserInfo 
            username={user.username}
            firstName={user.firstName}
            avatar={user.avatar}
            socialLinks={user.socialLinks}
            followersCount={user.followersCount}
            followingCount={user.followingCount}
            bio={user.bio}
            userId={user.id}
            />
        </div>
        <div className="w-1/2">
            <UserContent 
              posts={posts}
              likedPosts={likedPosts}/>
        </div>
      </div>
    </div>
  )
}

export default page