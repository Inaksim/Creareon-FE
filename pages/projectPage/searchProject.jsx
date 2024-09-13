"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SearchProjects = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]); 
  const router = useRouter();

  useEffect(() => {
    if (query.length > 0) {
      const fetchProjects = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/project/search?keyword=${query}`, {
            withCredentials: true,
          });
          setSuggestions(response.data); 
        } catch (error) {
          console.error('Error searching projects:', error);
        }
      };

      fetchProjects();
    } else {
      setSuggestions([]); 
    }
  }, [query]);

  const clearSearch = () => {
    setQuery(''); 
    setSuggestions([]); 
  };

  const handleCardClick = (id) => {
    router.push(`/project/${id}`);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative inline-flex ">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects..."
          className="w-[300px] p-2 pr-10 border-2 border-gray-300 rounded text-white placeholder-white xl:bg-transparent" 
        />
        
        {query && (
          <button
            onClick={clearSearch}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 inline-flex"
          > 
            <svg width="81" height="24" viewBox="0 0 81 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.58239 10.4347H6.4517C6.4233 10.2159 6.36506 10.0185 6.27699 9.84233C6.18892 9.66619 6.07244 9.51562 5.92756 9.39062C5.78267 9.26562 5.6108 9.17045 5.41193 9.10511C5.21591 9.03693 4.99858 9.00284 4.75994 9.00284C4.33665 9.00284 3.97159 9.10653 3.66477 9.31392C3.3608 9.52131 3.12642 9.82102 2.96165 10.2131C2.79972 10.6051 2.71875 11.0795 2.71875 11.6364C2.71875 12.2159 2.80114 12.7017 2.96591 13.0938C3.13352 13.483 3.3679 13.777 3.66903 13.9759C3.97301 14.1719 4.33239 14.2699 4.74716 14.2699C4.98011 14.2699 5.19176 14.2401 5.3821 14.1804C5.57528 14.1207 5.74432 14.0341 5.8892 13.9205C6.03693 13.804 6.15767 13.6634 6.25142 13.4986C6.34801 13.331 6.41477 13.142 6.4517 12.9318L8.58239 12.9446C8.54545 13.331 8.43324 13.7116 8.24574 14.0866C8.06108 14.4616 7.80682 14.804 7.48295 15.1136C7.15909 15.4205 6.7642 15.6648 6.2983 15.8466C5.83523 16.0284 5.30398 16.1193 4.70455 16.1193C3.91477 16.1193 3.20739 15.946 2.58239 15.5994C1.96023 15.25 1.46875 14.7415 1.10795 14.0739C0.747159 13.4062 0.566761 12.5937 0.566761 11.6364C0.566761 10.6761 0.75 9.86222 1.11648 9.1946C1.48295 8.52699 1.97869 8.01989 2.60369 7.6733C3.22869 7.3267 3.92898 7.15341 4.70455 7.15341C5.23295 7.15341 5.72159 7.22727 6.17045 7.375C6.61932 7.51989 7.0142 7.73295 7.35511 8.0142C7.69602 8.29261 7.97301 8.63494 8.18608 9.04119C8.39915 9.44744 8.53125 9.91193 8.58239 10.4347ZM11.8294 16V7.27273H13.9388V14.2869H17.5695V16H11.8294ZM20.7014 16V7.27273H26.7867V8.9858H22.8108V10.7756H26.4756V12.4929H22.8108V14.2869H26.7867V16H20.7014ZM32.0355 16H29.7684L32.713 7.27273H35.5213L38.4659 16H36.1988L34.1491 9.47159H34.0809L32.0355 16ZM31.7329 12.5653H36.4716V14.1676H31.7329V12.5653ZM41.4455 16V7.27273H45.0506C45.704 7.27273 46.268 7.39062 46.7424 7.62642C47.2197 7.85937 47.5876 8.1946 47.8461 8.6321C48.1046 9.06676 48.2339 9.58239 48.2339 10.179C48.2339 10.7841 48.1018 11.2983 47.8376 11.7216C47.5734 12.142 47.1984 12.4631 46.7126 12.6847C46.2268 12.9034 45.6515 13.0128 44.9867 13.0128H42.7069V11.3509H44.5947C44.9128 11.3509 45.1785 11.3097 45.3915 11.2273C45.6074 11.142 45.7708 11.0142 45.8816 10.8438C45.9924 10.6705 46.0478 10.4489 46.0478 10.179C46.0478 9.90909 45.9924 9.68608 45.8816 9.50994C45.7708 9.33097 45.6074 9.19744 45.3915 9.10938C45.1756 9.01847 44.91 8.97301 44.5947 8.97301H43.5549V16H41.4455ZM46.3589 12.0114L48.5322 16H46.231L44.1003 12.0114H46.3589Z" fill="#A6AEAD"/>
                <path d="M63 18L75 6" stroke="#A6AEAD" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M75 18L63 6" stroke="#A6AEAD" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

          </button>
        )}
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-2 max-h-60 overflow-y-auto ">
          {suggestions.map((item) => (
            <li key={item.id} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"  onClick={() => handleCardClick(item.id)}>
              <img src={item.cover} alt={item.title} className="w-12 h-12 object-cover rounded-lg mr-4" />
              <div className="flex flex-col">
                <span className="text-xl font-bold">{item.title}</span>
                <span className="text-xs text-gray-500 font-bold">{item.username}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default SearchProjects;
