import { Edit, Sparkles } from 'lucide-react';
import { useState } from 'react';

const WriteArticle = () => {
  const articleLengthOptions = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLengthOptions[0]);
  const [input, setInput] = useState('');

  const onSubmitHandler = async e => {
    e.preventDefault();
    // Article generation logic would go here
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
          <h1 className="text-xl font-semibold">AI Article Writer</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Article Topic</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Article Length</label>
            <div className="flex flex-wrap gap-2">
              {articleLengthOptions.map((item, index) => (
                <button
                  type="button"
                  key={index}
                  className={`text-sm px-4 py-2 border rounded-lg transition-all ${
                    selectedLength.length === item.length
                      ? 'bg-red-50 text-red-700 border-red-200 font-medium'
                      : 'text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedLength(item)}
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-red-600 to-green-500 hover:from-red-700 hover:to-green-600 text-white py-3 px-4 text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            <Edit className="w-4 h-4" />
            Generate Article
          </button>
        </div>
      </form>

      {/* Output Panel*/}
      <div className="w-full md:w-1/2 lg:w-3/5 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-50 rounded-lg">
            <Edit className="w-5 h-5 text-green-600" />
          </div>
          <h1 className="text-xl font-semibold">Generated Article</h1>
        </div>

        <div className="min-h-[400px] rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <Edit className="w-10 h-10 text-gray-300 mb-4" />
            <p className="text-sm text-gray-500 max-w-md">
              Enter a topic and click "Generate Article" to get started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
