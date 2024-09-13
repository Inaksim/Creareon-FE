import { useState } from 'react';
import axios from 'axios';
import Editor from '../../components/Editor';
import Header from '../projectPage/header';
import { useRouter } from 'next/navigation';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [cover, setCover] = useState(null);
  const [editorData, setEditorData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', JSON.stringify(editorData));
    formData.append('tags', tags.split(','));
    if (cover) {
      formData.append('cover', cover);
    }
    try {
      await axios.post('http://localhost:8080/project/create', formData, { withCredentials: true });
      alert('Project submitted successfully');
      router.push("/me");
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  const handleOpenModal = async () => {
    if (editorData === 0) {
      alert("Please add some content before proceeding.");
      
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div>
      <Header/>
       <form >
        <button type="button" onClick={handleOpenModal} className='ml-10 mt-10 bg-gray-200 outline outline-1 h-[30px] w-[100px]'>NEXT</button>
        <div>
          <Editor onChange={setEditorData} />
        </div>
      </form>

    {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-lg mx-4 rounded-lg shadow-lg p-6 relative">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Project Details
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Project Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project title"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="coverImage"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Cover Image
                </label>
                <input
                  type="file"
                  onChange={(e) => setCover(e.target.files[0])}
                  className="w-full"
                />
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 mr-4 text-gray-600 rounded-md hover:bg-gray-100 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  SUBMIT
             
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
   
  );
};

export default CreatePage;
