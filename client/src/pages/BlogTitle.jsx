import { Edit, Hash, Sparkles } from 'lucide-react';
import { useState } from 'react';

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

  const onSubmitHandler = async e => {
    e.preventDefault();
    // Logic to generate article titles goes here
  };

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6 text-gray-800">
      {/* Input Configuration Panel */}
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
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-red-600 to-green-500 hover:from-red-700 hover:to-green-600 text-white py-3 px-4 text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            <Hash className="w-4 h-4" />
            Generate Article
          </button>
        </div>
      </form>

      {/* Generated Output Panel */}
      <div className="w-full md:w-1/2 lg:w-3/5 bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-50 rounded-lg">
            <Hash className="w-5 h-5 text-green-600" />
          </div>
          <h1 className="text-xl font-semibold">Generated Titles</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center">
          <Hash className="w-10 h-10 text-gray-300 mb-4" />
          <p className="text-sm text-gray-500 max-w-md">
            Enter keywords and click "Generate Titles" to get started
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogTitle;
