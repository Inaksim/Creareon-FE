import { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import Quote from '@editorjs/quote'
import axios from 'axios';

const Editor = ({ onChange }) => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const editorInstance = new EditorJS({
      holder: editorRef.current,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
          config: {
            placeholder: 'Enter a header'
          }
        },
        image: {
          class: Image,
          config: {
            uploader: {
              uploadByFile(file) {
                const formData = new FormData();
                formData.append('file', file);

                return axios.post('http://localhost:8080/image/upload', formData, { withCredentials: true })
                  .then(response => ({
                    success: 1,
                    file: {
                      url: response.data
                    }
                  }));
              }
            }
          }
        },
        paragraph: {
          inlineToolbar: true
        },
        quote: {
          class: Quote,
          inlineToolbar:true
        },


      },
      onChange: () => {
        editorInstance.save().then(data => {
            console.log("content" + data);
          onChange(data);
        });
      }
    });
    setEditor(editorInstance);
    return () => {
    };
  }, []);

  return <div ref={editorRef}></div>;
};

export default Editor;
