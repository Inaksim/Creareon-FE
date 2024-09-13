import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
const UserInfo = ({username,avatar,followersCount,followingCount, isFollowing, onFollow, onUnfollow, firstName, bio, socialLinks, userId}) => {
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => { 
    try{
        const user =  axios.get('http://localhost:8080/profile/profile/me', {withCredentials: true });
        setCurrentUser(user.data);


      } catch (error) {
        console.error('Error fetching project:', error);
      };
    })

  if (!socialLinks || !socialLinks) {
    return null;
  }

  const router = useRouter();
  const handleUserClick = () => {
    router.push('/profile/${userid}')
  }
  
  return (
    <div className="">

      <div className="absolute -top-32 left-4 mt-[30px]">
        <img
          src={avatar}
          alt="/images/image.png"
          className="w-[200px] h-[200px] rounded-full   shadow-lg"
        />
      </div>

  
  <div className=' mt-[100px] ml-[40px] flex justify-between'>
    <div>
      <div className="text-2xl font-bold mt-4 cursor-pointer" onClick={handleUserClick}>{username}</div>
      <div className="text-gray-500">{firstName}</div>
    </div>

      {userId == currentUser.id &&(
        <div className='relative mr-[250px]'>
        <button
            onClick={isFollowing ? onUnfollow : onFollow}
            className={`mt-4 px-4 py-2 rounded-sm font-bold outline outline-gray-400 outline-1 ${
              isFollowing ? "bg-white text-black" : "bg-white text-black"
            }`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
  
      </div>
    

      )}
    

  </div>
  
  <div className="mt-6 flex justify-between">
        <div className='ml-[40px]'>
          <h1>{followingCount || 0}</h1>
          <div>Following</div>
        </div>
        <div className='mr-[500px]'>
          <h1>{followersCount || 0}</h1>
          <div>Followers</div>
        </div>
    </div>

   

  

    <div className="mt-[100px] ml-[40px] flex justify-between">
      <div>
        <p className="text-gray-700">BIO</p>
        <div>{bio}</div>
      </div>
      <div className='mr-10'>
      {socialLinks.instagram && (
        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
          <img src='/svg/icons/inst.svg' alt="instagram" />
        </a>
      )}
      {socialLinks.twitter && (
        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
          <img className='mt-3' src='/svg/icons/twitter.svg' alt="Twitter" />
        </a>
      )}
      {socialLinks.linkedin && (
        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
          <img className='mt-3' src='/svg/icons/linkedin.svg' alt="LinkedIn" />
        </a>
      )}
      {socialLinks.facebook && (
        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
          <img className='mt-3' src='/svg/icons/facebook.svg' alt="Facebook" />
        </a>
      )}
    </div>
   
      
    </div>


</div>
  )
}

export default UserInfo