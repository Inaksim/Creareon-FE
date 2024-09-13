"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import editorJsHtml from 'editorjs-html';
import Header from '@/pages/projectPage/header';
import { useRouter } from 'next/navigation';




const ProjectPage = ({ params }) => {
  const { id } = params; 
  const [project, setProject] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const router = useRouter();
 
  
  

  useEffect(() => { 
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/project/get/${id}`, {
          withCredentials: true,
        });

        const user = await axios.get('http://localhost:8080/profile/profile/me', {withCredentials: true, });
        setCurrentUser(user.data);
        setProject(response.data);
        setUserHasLiked(response.data.userHasLiked); 
        checkIfFollowing(response.data.authorId)

      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProject();
  }, [id]);

  const checkIfFollowing = (id) => {
    axios.get(`http://localhost:8080/follow/is-following/${id}`, { withCredentials: true })
      .then(response => {
        setIsFollowing(response.data);
      })
      .catch(error => console.error('Error checking follow status:', error));
  };


  const handleLikeToggle = async () => {
    try {
      if (userHasLiked) {
        const response = await axios.delete(`http://localhost:8080/like/unlike/${id}`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setUserHasLiked(false);
        }
      } else {
        const response = await axios.post(`http://localhost:8080/like/like/${id}`, null, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setUserHasLiked(true);
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleUserClick = () => {
    router.push(`/profile/${project.authorId}`)
    
  }


  const handleFollow = () => {
    axios.post(`http://localhost:8080/follow/new-follow/${project.authorId}`, {}, { withCredentials: true })
      .then(() => {
        setIsFollowing(true);
      })
      .catch(error => console.error('Error following user:', error));
  };

  const handleUnfollow = () => {
    axios.post(`http://localhost:8080/follow/unfollow/${project.authorId}`, {}, { withCredentials: true })
      .then(() => {
        setIsFollowing(false);
      })
      .catch(error => console.error('Error unfollowing user:', error));
  };

  if (!project) {
    return <div>Loading...</div>;
  }


  const handleDeleteProject = async () =>  {

    try {
      const response = await axios.delete(`http://localhost:8080/project/delete/${project.id}`, { withCredentials: true })
      console.log(response);
      if (response && response.status === 200) {
        alert("Project deleted successfully!");
        router.push('/me'); 
      } else {
        alert("Failed to delete the project.");
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert("An error occurred while deleting the project.");
    }
   

     
  };

  const editorHtml = editorJsHtml();
  const contentHtml = editorHtml.parse(JSON.parse(project.content));

  return (
    <div>
      
      <Header/>
      <div className='ml-10 mt-10'>
        <div className='flex justify-between'>
          <h1 className='text-4xl font-bold '>{project.title}</h1>
          <button 
          onClick={handleLikeToggle} 
          className="like-button flex items-center justify-center w-[64px] h-[64px] bg-white rounded-full border-4 border-gray hover:bg-gray-300 focus:outline-none mr-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill={userHasLiked ? "red" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`feather feather-heart ${userHasLiked ? 'text-red-500' : 'text-gray-500'}`}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        
        </div>
      
          <div className="font-semibold cursor-pointer text-2xl" onClick={handleUserClick}>{project.username}</div>

          <button className='outline outline-1 w-[100px] mt-3' 
            onClick={isFollowing ? handleUnfollow : handleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>

          {project.authorId == currentUser.id && (
            <div>
              <button className='bg-red-500 text-white h-[30px] w-[100px] mt-3' onClick={handleDeleteProject}>DELETE</button>
            </div>
            )}
      </div>

    <div className='flex flex-col items-center justify-center '>
      {contentHtml.map((block, index) => (
        <div className='p-5' key={index} dangerouslySetInnerHTML={{ __html: block }} />
      ))}
    </div>
  </div>
);
};

export default ProjectPage;
