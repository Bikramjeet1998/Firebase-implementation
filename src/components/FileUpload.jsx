import React, { useState } from 'react';
import { FileDrop } from 'react-file-drop';
import axios from 'axios';
import { createC2pa } from 'https://cdn.jsdelivr.net/npm/c2pa@0.17.2/+esm';

const FileUpload = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [manifestStore, setManifestStore] = useState(null);
  const [activeManifest, setActiveManifest] = useState(null);

  const handleFileDrop = (files) => {
    uploadFile(files[0]);
  };

  const handleFileSelect = (event) => {
    uploadFile(event.target.files[0]);
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setMessage('');
    setFileUrl('');
    setManifestStore(null);
    setActiveManifest(null);

    axios.post('https://ivalt-wordpress.site/rest-apis/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(async (response) => {
      setMessage('File uploaded successfully!');
      setFileUrl(response.data.fileUrl);

      // Initialize the c2pa-js SDK
      const c2pa = await createC2pa({
        wasmSrc: 'https://cdn.jsdelivr.net/npm/c2pa@0.17.2/dist/assets/wasm/toolkit_bg.wasm',
        workerSrc: 'https://cdn.jsdelivr.net/npm/c2pa@0.17.2/dist/c2pa.worker.min.js',
      });

      try {
        const sampleImage = response.data.fileUrl;
        // Read in the uploaded image and get a manifest store
        const { manifestStore } = await c2pa.read(sampleImage);
        setManifestStore(manifestStore);

        // Get the active manifest
        const activeManifest = manifestStore?.activeManifest;
        setActiveManifest(activeManifest);
      } catch (err) {
        console.error('Error reading image:', err);
      }
    })
    .catch(error => {
      setMessage('File upload failed.');
      console.error('Error:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Upload a File</h1>
        <FileDrop
          onDrop={handleFileDrop}
          className="border-4 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer relative"
          draggingOverFrameClassName="bg-gray-200"
          draggingOverTargetClassName="bg-gray-200"
        >
          <p>Drop your files here or click to upload</p>
          <input
            type="file"
            onChange={handleFileSelect}
            className="opacity-0 absolute inset-0 cursor-pointer"
          />
        </FileDrop>

        {message && <p className="mt-4 text-center text-lg">{message}</p>}
        {fileUrl && (
          <p className="mt-4 text-center text-lg">
            <a href={fileUrl} download target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              Download File
            </a>
          </p>
        )}
        {/* 
        {manifestStore && (
          <div className="mt-4 text-center text-lg">
            <h2 className="font-bold">Manifest Store</h2>
            <pre className="bg-gray-200 p-2 rounded">{JSON.stringify(manifestStore, null, 2)}</pre>
          </div>
        )}
        {activeManifest && (
          <div className="mt-4 text-center text-lg">
            <h2 className="font-bold">Active Manifest</h2>
            <pre className="bg-gray-200 p-2 rounded">{JSON.stringify(activeManifest, null, 2)}</pre>
          </div>
        )}
        */}
      </div>
    </div>
  );
};

export default FileUpload;
