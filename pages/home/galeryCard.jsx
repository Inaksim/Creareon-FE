
import React from 'react';
import { useRouter } from 'next/navigation';

const GaleryCard = ({ title, image, id }) => {
  const router = useRouter();
  
  const handleCardClick = () => {
    router.push(`/project/${id}`);
  };



  return (
    <div className="p-2 cursor-pointer" onClick={handleCardClick} >
      <img src={image} alt={title} className=" h-[330px] w-[330px] object-cover rounded-md" />
      <h2 className="text-xl font-bold mt-1 text-white">{title}</h2>
  </div>
  );
};

export default GaleryCard;