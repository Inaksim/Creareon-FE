import React, { useState, useRef } from 'react'
import ProjectCard from './projectCard';


const UserContent = ({posts, likedPosts}) => {
  const [activeTab, setActiveTab] = useState('posts');
  const containerRef = useRef();
  

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }
  return (
    <div className="flex flex-col mt-8">

      <div className="flex space-x-4 border-b border-gray-300">
        <button
          onClick={() => handleTabChange('posts')}
          className={`text-lg font-semibold pb-2 ${activeTab === 'posts' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
        >
          Posts ({posts.length})
        </button>
        <button
          onClick={() => handleTabChange('liked')}
          className={`text-lg font-semibold pb-2 ${activeTab === 'liked' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
        >
          Liked ({likedPosts.length})
        </button>
      </div>


      
      <div ref={containerRef} className="overflow-y-scroll h-[1000px] scroll-smooth mt-4" >
        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post, index) => (
             <ProjectCard 
              index={post.id}
              id={post.id}
              title={post.title}
              cover={post.cover}
              
             />
            ))}
          </div>
        )}
        <div ref={containerRef} className='overflow-y-scroll scroll-smooth h-[500px]'>
        {activeTab === 'liked' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {likedPosts.map((post, index) => (
              <ProjectCard
                id={post.id}
                index={post.id}
                title={post.title}
                cover={post.cover}
                />
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default UserContent;