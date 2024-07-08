import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'tailwindcss/tailwind.css';
import './App.css'

const TemplateForm = () => {
  const [templateName, setTemplateName] = useState('');
  const [body, setBody] = useState('');
  const [bodyError, setBodyError] = useState('');
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const fetchTemplates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/templates');
      setTemplates(response.data);
    } catch (error) {
      console.error('There was an error fetching the templates!', error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!body.trim()) {
      setBodyError('Template Body is required');
      return;
    } else {
      setBodyError('');
    }

    try {
      const response = await axios.post('http://localhost:5000/api/templates', { templateName, body });
      alert('Template created successfully');
      console.log(response.data);
      setTemplateName('');
      setBody('');
      fetchTemplates();
    } catch (error) {
      console.error('There was an error creating the template!', error);
    }
  };

  const handleTemplateClick = async (templateId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/templates/${templateId}`);
      setSelectedTemplate(response.data);
    } catch (error) {
      console.error('There was an error fetching the template details!', error);
    }
  };

  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Email Template Creator</h1>
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Template Name:</label>
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Template Body:</label>
          <CKEditor
            editor={ClassicEditor}
            data={body}
            config={{
              ckfinder: {
                uploadUrl: 'http://localhost:5000/api/upload',
              },
              image: {
                toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
                styles: [
                  'full',
                  'side',
                  'alignLeft',
                  'alignCenter',
                  'alignRight',
                  'alignLeft',
                  'alignCenter',
                  'alignRight'
                ],
                resizeUnit: 'px'
              },
              extraPlugins: [MyCustomUploadAdapterPlugin],
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setBody(data);
              if (data.trim()) {
                setBodyError('');
              }
            }}
          />
          {bodyError && <p className="text-red-500">{bodyError}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Template
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Created Templates</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <li
            key={template._id}
            onClick={() => handleTemplateClick(template._id)}
            className="cursor-pointer p-4 border rounded shadow hover:bg-gray-100 transition"
          >
            <h3 className="text-xl font-semibold">{template.templateName}</h3>
          </li>
        ))}
      </ul>

      {selectedTemplate && (
        <div className="mt-8 p-4 border rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Template Details</h2>
          <h3 className="text-xl font-semibold mb-4">{selectedTemplate.templateName}</h3>
          <div
            dangerouslySetInnerHTML={{ __html: selectedTemplate.body }}
            className="prose"
          />
        </div>
      )}
    </div>
  );
};

export default TemplateForm;

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const data = new FormData();
          data.append('upload', file);

          axios
            .post('http://localhost:5000/api/upload', data)
            .then((response) => {
              if (response.data.uploaded) {
                resolve({
                  default: response.data.url,
                });
              } else {
                reject(response.data.error.message);
              }
            })
            .catch((error) => {
              reject('Upload failed');
            });
        })
    );
  }
}
