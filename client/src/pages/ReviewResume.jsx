import { FileText, Sparkles } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import { ClipLoader } from 'react-spinners';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async e => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!input) throw new Error('Please upload an image');

      const token = await getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formData = new FormData();
      formData.append('resume', input);
      const { data } = await axios.post('/api/v1/ai/resume-review', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
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
          <h1 className="text-xl font-semibold">Resume Review</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume</label>
            <input
              disabled={loading}
              type="file"
              accept="application/pdf"
              onChange={e => setInput(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none p-3 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              required
            />
            <p className="mt-2 text-xs text-gray-500">Supports PDF resume only</p>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-red-600 to-green-500 hover:from-red-700 hover:to-green-600 text-white py-3 px-4 text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
            disabled={loading}
          >
            <FileText className="w-4 h-4" />
            {loading ? 'Reviewing Resume...' : 'Review Resume'}
          </button>
        </div>
      </form>

      {/* Output Panel*/}
      <div className="w-full md:w-1/2 lg:w-3/5 bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 bg-green-50 rounded-lg">
            <FileText className="w-5 h-5 text-green-600" />
          </div>
          <h1 className="text-lg sm:text-xl font-semibold">Analysis Results</h1>
        </div>

        {loading ? (
          <div className="min-h-[300px] sm:min-h-[400px] flex items-center justify-center rounded-lg border border-gray-200">
            <ClipLoader size={50} color="#16a34a" />
          </div>
        ) : !content ? (
          <div className="min-h-[300px] sm:min-h-[400px] rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="flex flex-col items-center text-center">
              <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300 mb-3 sm:mb-4" />
              <p className="text-xs sm:text-sm text-gray-500 max-w-[280px] sm:max-w-md">
                Upload your resume and click "Review Resume" to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="min-h-[300px] sm:min-h-[400px] max-h-[600px] overflow-y-auto rounded-lg border border-gray-200 p-4">
            <div className="prose max-w-none reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewResume;
