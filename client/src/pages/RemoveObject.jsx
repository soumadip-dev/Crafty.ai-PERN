import { Eraser, Sparkles, Scissors, Download } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState('');
  const [objectDescription, setObjectDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const handleDownload = async () => {
    if (!content) {
      toast.error('No image to download');
      return;
    }
    try {
      // Extract filename
      const filename = `objrm-${input.name}`;

      // Fetch image as blob
      const response = await axios.get(content, {
        responseType: 'blob',
      });
      const blob = response.data;
      const blobUrl = URL.createObjectURL(blob);

      // Create download link
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }, 100);

      toast.success('Download started');
    } catch (err) {
      console.error('Download failed:', err);
      toast.error('Failed to download image. Please try again.');
    }
  };

  const onSubmitHandler = async e => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!input) throw new Error('Please upload an image');
      if (!objectDescription) throw new Error('Please enter object description');
      if (objectDescription.split(' ').length > 1)
        throw new Error('Please enter only one object name');

      const token = await getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formData = new FormData();
      formData.append('image', input);
      formData.append('object', objectDescription);

      const { data } = await axios.post('/api/v1/ai/remove-image-object', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // This is important
        },
      });

      if (!data?.success) throw new Error(data?.message || 'Something went wrong');
      setContent(data?.data?.content);
    } catch (error) {
      console.log('API Error:', error);
      toast.error(error.response?.data?.message || error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6 text-gray-800 items-start">
      {/* Configuration Panel */}
      <form
        className="w-full md:w-1/2 lg:w-2/5 bg-white rounded-xl border border-gray-200 shadow-sm p-6"
        onSubmit={onSubmitHandler}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-50 rounded-lg">
            <Sparkles className="w-5 h-5 text-red-600" />
          </div>
          <h1 className="text-xl font-semibold">Object Removal</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setInput(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none p-3 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              required
              disabled={loading}
            />
            <p className="mt-2 text-xs text-gray-500">Supports JPG, PNG, and other image formats</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe Object to remove
            </label>
            <textarea
              rows="4"
              value={objectDescription}
              onChange={e => setObjectDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none p-3"
              required
              placeholder="e.g., car in background, tree from the image..."
              disabled={loading}
            />
            <p className="mt-2 text-xs text-gray-500">Be specific about what you want to remove</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-red-600 to-green-500 hover:from-red-700 hover:to-green-600 text-white py-3 px-4 text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            <Scissors className="w-4 h-4" />
            {loading ? 'Removing...' : 'Remove Object'}
          </button>
        </div>
      </form>

      {/* Output Panel*/}
      <div className="w-full md:w-1/2 lg:w-3/5 bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Scissors className="w-5 h-5 text-green-600" />
            </div>
            <h1 className="text-lg sm:text-xl font-semibold">Processed Image</h1>
          </div>
          {content && (
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-3 text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          )}
        </div>
        {loading ? (
          <div className="min-h-[300px] sm:min-h-[400px] flex items-center justify-center rounded-lg border border-gray-200">
            <ClipLoader size={50} color="#16a34a" />
          </div>
        ) : !content ? (
          <div className="min-h-[300px] sm:min-h-[400px] rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="flex flex-col items-center text-center">
              <Scissors className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300 mb-3 sm:mb-4" />
              <p className="text-xs sm:text-sm text-gray-500 max-w-[280px] sm:max-w-md">
                Upload an image and describe what to remove
              </p>
            </div>
          </div>
        ) : (
          <div className="min-h-[300px] sm:min-h-[400px] rounded-lg border border-gray-200 flex items-center justify-center p-4">
            {content.startsWith('http') ? (
              <img
                src={content}
                alt="Processed Image"
                className="max-w-full max-h-[500px] object-contain rounded-lg"
              />
            ) : (
              <div className="prose max-w-none">{content}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveObject;
