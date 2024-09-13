import React from 'react'
import {useState, useEffect} from 'react'

const Info = ({ userData, setUserData }) => {

  const [socialNetworks, setSocialNetworks] = useState({
    twitter: '',
    facebook: '',
    instagram: '',
    linkedin: ''
  });


  useEffect(() => {
    if (userData.socialLinks) {
      setSocialNetworks({
        twitter: userData.socialLinks.twitter || '',
        facebook: userData.socialLinks.facebook || '',
        instagram: userData.socialLinks.instagram || '',
        linkedin: userData.socialLinks.linkedin || ''
      });
    }
  }, [userData.socialLinks]);

 const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      socialLinks: {
        ...prevData.socialLinks,
        [name]: value
      }
    }));

    setSocialNetworks(prev => ({
      ...prev,
      [name]: value
    }));
  };

 



return (
  <div className="bg-white p-4 mt-[100px]">
    <div className='mb-[20px] text-2xl'>Information</div>
    <div className="mb-4 relative">
      <input
        className="text-black font-bold border bg-white appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        name="email"
        type="email"
        required
        onChange={handleInputChange}
        value={userData.email}
      />
      <div className="absolute inset-y-1 right-1 pl-3 mb-[23px] mr-[10px] flex items-center pointer-events-none">
        <img src="/svg/icons/email.svg" alt="Email Icon" />
      </div>
      <label className='ml-[10px] mt-[10px] text-gray-500 text-2xs'>Email</label>
    </div>

    <div className="mb-4 relative">
      <input
        className="text-black border font-bold bg-white appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        name="username"
        type="text"
        required
        value={userData.username}
        onChange={handleInputChange}
      />
      <div className="absolute inset-y-1 right-1 pl-3 mb-[23px] mr-[10px] flex items-center pointer-events-none">
        <img src="/svg/icons/profile.svg" alt="Profile Icon" />
      </div>
      <label className='ml-[10px] mt-[10px] text-gray-500 text-2xs'>Display name</label>
    </div>

    <div className="mb-4 relative">
      <input
        className="text-black border font-bold bg-white appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        id="firstName"
        name="firstName"
        type="text"
        required
        value={userData.firstName}
        onChange={handleInputChange}
      />
      <div className="absolute inset-y-1 right-1 pl-3 mb-[23px] mr-[10px] flex items-center pointer-events-none">
        <img src="/svg/icons/profile.svg" alt="Profile Icon" />
      </div>
      <label className='ml-[10px] mt-[10px] text-gray-500 text-2xs'>First name</label>
    </div>

    <div className="mb-4 relative">
      <label className='font-bold'>About you</label>
      <textarea
        className="text-black border bg-white appearance-none rounded w-full py-2 px-3 h-20 leading-tight focus:outline-none focus:shadow-outline"
        id="bio"
        name="bio"
        value={userData.bio}
        onChange={handleInputChange}
      />
      <div className="absolute inset-y-1 right-1 pl-3 mb-[3px] mr-[10px] flex items-center pointer-events-none">
        <img src="/svg/icons/bio.svg" alt="Bio Icon" />
      </div>
      <label className='ml-[10px] mt-[10px] text-gray-500'>Short bio</label>
    </div>

    <div className="mb-4">
    <h3 className="text-lg font-semibold mb-2">Social Links</h3>
        {Object.keys(socialNetworks).map((network) => (
          <div key={network} className="mb-4">
            <input
              type="url"
              name={network}
              onChange={handleSocialLinkChange}
              value={socialNetworks[network]}
              placeholder={`${network.charAt(0).toUpperCase() + network.slice(1)} link`}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <div className={`absolute right-1 pl-3 -mt-[33px] mr-[20px] flex items-center pointer-events-none`}>
              <img src={`/svg/icons/${network}.svg`} alt={`${network} Icon`} />
            </div>
            <label className="block text-gray-700 capitalize">{network}</label>
          </div>
        ))}
    </div>
  </div>
);
};

export default Info;