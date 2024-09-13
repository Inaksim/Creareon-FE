import React from 'react'
import { useRouter } from 'next/navigation'

const ProjectCard = ({index ,title, cover, id} ) => {

  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/project/${id}`);
  };


  return (
    <div key={index} className="bg-white p-4 rounded-lg shadow cursor-pointer" onClick={handleCardClick} >
        <img src={cover} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
        <h3 className="text-xl font-bold">{title}</h3>
       
  </div>
  )
}

export default ProjectCard