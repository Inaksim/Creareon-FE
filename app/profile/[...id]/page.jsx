"use client"
import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '@/pages/projectPage/header';
import UserInfo from '@/pages/profilePage/userInfo';
import UserContent from '@/pages/profilePage/userContent';



const ProfilePage = ({params}) => {
    const { id } = params;
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
 
    useEffect(() => {
      const fetchData = async () => {
        try {
    
          const userResponse = await axios.get(`http://localhost:8080/profile/${id}`, {
            withCredentials: true,
          });
          setUser(userResponse.data);
          
          console.log("links" + user.socialLinks);
          
   
          const postsResponse = await axios.get(`http://localhost:8080/project/projects/${id}`, {
            withCredentials: true,
          });
          setPosts(postsResponse.data);
          console.log(postsResponse.data);
  
     
          const likedPostsResponse = await axios.get(`http://localhost:8080/like/projects/${id}`, {
            withCredentials: true,
          });
          setLikedPosts(likedPostsResponse.data);
          console.log(likedPostsResponse.data);
  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, [id]);

    



  return (
    <div className='relative' >
        <Header/>
        <div className="relative flex">
            <div className="w-1/2">
                <UserInfo 
                userid={user.id}
                username={user.username}
                avatar={user.avatar}
                bio={user.bio}
                socialLinks={user.socialLinks}
                followersCount={user.followersCount}
                followingCount={user.followingCount}/>
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

export default ProfilePage;