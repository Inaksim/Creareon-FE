import { useEffect, useState } from 'react';
import axios from 'axios';
import editorJsHtml from 'editorjs-html';

const ProjectPage = ({ projectId }) => {
  const { id } = projectId; 
  const [project, setProject] = useState(null);
  console.log(projectId);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/project/${projectId.id}`, {
          withCredentials: true,
        });
        setProject(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const editorHtml = editorJsHtml();
  const contentHtml = editorHtml.parse(JSON.parse(project.content));

  return (
    <div>
    <h1>{project.title}</h1>
    <img src={project.cover} alt={project.title} style={{ maxWidth: '100%' }} />
    <div>
      <h3>Tags</h3>
      <ul>
        {project.tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </div>
    <div>
      {contentHtml.map((block, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: block }} />
      ))}
    </div>
  </div>
);
};

export default ProjectPage;
