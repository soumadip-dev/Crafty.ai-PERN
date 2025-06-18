import { Hash, Sparkles, Copy } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import { ClipLoader } from 'react-spinners';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitle = () => {
  const categoryOptions = [
    'General',
    'Technology',
    'Business',
    'Health',
    'Lifestyle',
    'Education',
    'Travel',
    'Food',
  ];

  const [selectedOption, setSelectedOption] = useState('General');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async e => {
    e.preventDefault();
    try {
      setLoading(true);

      const prompt = `You are a professional content writer. Generate a compelling and SEO-friendly blog title based on the keyword: "${input}", within the category: "${selectedOption}".`;

      const token = await getToken();

      if (!token) {
        throw new Error('No authentication token found');
      }

      const { data } = await axios.post(
        '/api/v1/ai/generate-blog-title',
        {
          prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!data?.success) throw new Error(data?.message || 'Something went wrong');
      setContent(data?.data?.content);
    } catch (error) {
      console.log('API Error:', error);
      toast.error(error.response?.data?.message || error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        toast.success('Article copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        toast.error('Failed to copy article');
      });
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
          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Keyword</label>
            <input
              onChange={e => setInput(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none p-3"
              placeholder="The future of artificial intelligence is..."
              required
              value={input}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((item, index) => (
                <button
                  type="button"
                  key={index}
                  className={`text-sm px-4 py-2 min-w-[100px] text-center border rounded-lg transition-all ${
                    selectedOption === item
                      ? 'bg-red-50 text-red-700 border-red-200 font-medium'
                      : 'text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedOption(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-red-600 to-green-500 hover:from-red-700 hover:to-green-600 text-white py-3 px-4 text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            <Hash className="w-4 h-4" />
            {loading ? 'Generating...' : 'Generate Titles'}
          </button>
        </div>
      </form>

      {/* Output Panel*/}
      <div className="w-full md:w-1/2 lg:w-3/5 bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Hash className="w-5 h-5 text-green-600" />
            </div>
            <h1 className="text-lg sm:text-xl font-semibold">Generated Titles</h1>
          </div>
          {content && !loading && (
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4" />
              <span>Copy</span>
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
              <Hash className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300 mb-3 sm:mb-4" />
              <p className="text-xs sm:text-sm text-gray-500 max-w-[280px] sm:max-w-md">
                Enter keywords and click "Generate Titles" to get started
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

export default BlogTitle;
