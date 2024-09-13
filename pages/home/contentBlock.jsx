
import React from 'react';
import { useRouter } from 'next/navigation';

const ContentBlock = ({ title, username, image, id, authorAvatar }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/project/${id}`);
  };
  return (
    <div className="p-2 cursor-pointer" onClick={handleCardClick}>
      <img src={image} alt={title} className=" h-[400px] w-[400px] object-cover rounded-md" />
      <h2 className="text-xl font-bold mt-1">{title}</h2>
      <div className='inline-flex gap-3'>
        <img src={authorAvatar} className='h-6 w-6 rounded-full' />
        
        <p className="text-gray-700">{username}</p>
      </div>
      
    </div>
  );
};

export default ContentBlock;