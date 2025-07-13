import React, { useState } from 'react';
import axios from 'axios';
import ModelViewer from './components/ModelViewer';
import { Loader2, ImageIcon, TextQuote } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL;

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [modelUrl, setModelUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError(null);
      const form = new FormData();
      form.append('prompt', prompt);
      const res = await axios.post(`${API_URL}/generate/`, form);
      setModelUrl(`${API_URL}${res.data.file_url}`);
    } catch (err) {
      setError('Failed to generate model from prompt.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async () => {
    try {
      setLoading(true);
      setError(null);
      const form = new FormData();
      form.append('file', image);
      const res = await axios.post(`${API_URL}/generate-from-image/`, form);
      setModelUrl(`${API_URL}${res.data.file_url}`);
    } catch (err) {
      setError('Failed to generate model from image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        🌀 Meshy AI – Advanced 3D Model Generator
      </h1>

      <div className="bg-gray-800 shadow-xl p-6 rounded-2xl w-full max-w-xl flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <TextQuote className="text-blue-300" />
          <input
            className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
            type="text"
            placeholder="Describe your object (e.g., crystal spaceship)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <button
          onClick={handleGenerate}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded shadow hover:from-blue-600 hover:to-indigo-700"
        >
          🚀 Generate from Text
        </button>

        <div className="flex items-center gap-2">
          <ImageIcon className="text-green-300" />
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button
          onClick={handleImageUpload}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded shadow hover:from-green-600 hover:to-emerald-700"
        >
          🖼️ Generate from Image
        </button>

        {loading && (
          <div className="flex items-center justify-center gap-2 text-blue-400 mt-4 animate-pulse">
            <Loader2 className="animate-spin" /> Generating your 3D model...
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-400 font-semibold">{error}</div>
        )}
      </div>

      {modelUrl && !loading && (
        <div className="mt-12 w-full max-w-5xl h-[600px]">
          <ModelViewer modelUrl={modelUrl} />
          <a
            href={modelUrl}
            download
            className="mt-6 inline-block bg-white text-black font-bold px-6 py-3 rounded-full shadow hover:bg-gray-200"
          >
            ⬇️ Download .glb 3D Model
          </a>
        </div>
      )}
    </div>
  );
}
