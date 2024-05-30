import React, { useState } from "react";
import { FileDrop } from "react-file-drop";
import axios from "axios";
import { createC2pa } from "https://cdn.jsdelivr.net/npm/c2pa@0.17.2/+esm";

const FileUpload = () => {
  //   {
  //     documentId: null,
  //     format: "image/jpeg",
  //     hash: null,
  //     instanceId: "xmp:iid:4eff2e25-acda-4e1f-b3c3-b08729f3b540",
  //     isParent: true,
  //     manifest: {
  //       title: 'CA.jpg',
  //       format: 'image/jpeg',
  //       vendor: null,
  //       claimGenerator: 'C2PA Testing',
  //       claimGeneratorHints: null,
  //     },
  //     metadata: null,
  //     provenance: null,
  //     thumbnail: { blob: new Blob(), contentType: 'image/jpeg', hash: () => {}, getUrl: () => {} },
  //     title: "CA.jpg",
  //     validationStatus: []
  //   },
  //   {
  //     title: 'CAI.jpg',
  //     format: 'image/jpeg',
  //     documentId: null,
  //     instanceId: 'xmp:iid:4f66b468-ec33-47bd-87aa-7faa279ab025',
  //     provenance: null,
  //   }
  // ];
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
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
    formData.append("file", file);

    setLoading(true);
    setMessage("");
    setFileUrl("");
    setManifestStore(null);
    setActiveManifest(null);

    axios
      .post("https://ivalt-wordpress.site/rest-apis/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (response) => {
        setMessage("File uploaded successfully!");
        setFileUrl(response.data.fileUrl);

        // Initialize the c2pa-js SDK
        const c2pa = await createC2pa({
          wasmSrc:
            "https://cdn.jsdelivr.net/npm/c2pa@0.17.2/dist/assets/wasm/toolkit_bg.wasm",
          workerSrc:
            "https://cdn.jsdelivr.net/npm/c2pa@0.17.2/dist/c2pa.worker.min.js",
        });

        try {
          const sampleImage =
            "https://raw.githubusercontent.com/contentauth/c2pa-js/main/tools/testing/fixtures/images/CAICAI.jpg";
          // const sampleImage = response.data.fileUrl;
          // Read in the uploaded image and get a manifest store
          const { manifestStore } = await c2pa.read(sampleImage);
          setManifestStore(manifestStore);
          // console.log(manifestStore)

          // Get the active manifest
          const activeManifest = manifestStore?.activeManifest;
          setActiveManifest(activeManifest);
          //  console.log('Active Manifest:', activeManifest);
        } catch (err) {
          console.error("Error reading image:", err);
        }
      })
      .catch((error) => {
        setMessage("File upload failed.");
        console.error("Error:", error);
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
            <a
              href={fileUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Download File
            </a>
          </p>
        )}
        <div>
          {activeManifest && (
            <div className="container mx-auto p-4">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <p className="font-semibold text-center text-lg">
                    Active Manifest
                  </p>
                </div>
                <table className="min-w-full bg-white table-auto">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {activeManifest.title}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Format
                      </th>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {activeManifest.format}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Instance ID
                      </th>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {activeManifest.instanceId}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Signature Info
                      </th>
                      <td className="py-3 px-4 text-sm text-gray-700 whitespace-normal">
                        {activeManifest.signatureInfo
                          ? Object.keys(activeManifest.signatureInfo).map(
                              (key) => (
                                <div key={key} className="mb-1">
                                  <span className="font-semibold">
                                    {key.replace(/_/g, " ")}:
                                  </span>{" "}
                                  {String(activeManifest.signatureInfo[key])}
                                </div>
                              )
                            )
                          : "No Signature Info"}
                      </td>
                    </tr>
                    {/* <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Instance</th>
              <td className="py-3 px-4 text-sm text-gray-700">{activeManifest.instance}</td>
            </tr> */}
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Ingredients
                      </th>
                      <td className="py-3 px-4 text-sm text-gray-700 whitespace-normal">
                        {activeManifest.ingredients.length > 0
                          ? activeManifest.ingredients.map(
                              (ingredient, index) => (
                                <div key={index} className="mb-2">
                                  <div>
                                    <span className="font-semibold">
                                      Title:
                                    </span>{" "}
                                    {ingredient.title}
                                  </div>
                                  <div>
                                    <span className="font-semibold">
                                      Format:
                                    </span>{" "}
                                    {ingredient.format}
                                  </div>
                                  <div>
                                    <span className="font-semibold">
                                      Instance ID:
                                    </span>{" "}
                                    {ingredient.instanceId}
                                  </div>
                                  <div className="mt-1 border-t border-gray-300"></div>
                                </div>
                              )
                            )
                          : "No Ingredients"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
