"use client"
import React from 'react'
import GaleryCard from './galeryCard'
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';


const GaleryBlock = () => {

  const [projects, setProjects] = useState([]); // Список проектов
  const [page, setPage] = useState(1); // Номер текущей страницы
  const [loading, setLoading] = useState(false); // Флаг загрузки
  const [hasMore, setHasMore] = useState(true); // Флаг наличи


  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/project/all?page=${page}&size=8`, {
        withCredentials: true,
      });
      
      setProjects(prevProjects => [...prevProjects, ...response.data]); // Добавление новых проектов к существующим
      
      if (response.data.length < 8) { // Если пришло меньше 8 проектов, значит, это последняя страница
        setHasMore(false);
      }
      
      setPage(prevPage => prevPage + 1); 
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

 

  

  return (
    <div className="bg-black w-full">
      <div className="text-2xl font-bold text-white ml-10 mt-[10] mb-14">
        <h2 className="mt-14 text-5xl">Gallery.</h2>
      </div>

      <div className="grid grid-cols-4 gap-4 ml-10">
        {projects.map((item, index) => (
          <GaleryCard key={item.id} title={item.title} id={item.id} image={item.cover} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {hasMore && (
          <button
            onClick={fetchProjects}
            disabled={loading}
            className="px-4 py-2 bg-white text-black rounded  disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default GaleryBlock;