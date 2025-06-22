import { useState } from 'react';
import { Image, Sparkles } from 'lucide-react';

const GenerateImages = () => {
  const ImageStyles = [
    'Realistic',
    'Ghibli Style',
    'Anime Style',
    'Cartoon Style',
    'Fantasy Style',
    '3D style',
    'Portrait Style',
  ];

  const onSubmitHandler = async e => {
    e.preventDefault();
    // Logic to generate images goes here
  };

  const [selectedStyle, setSelectedStyle] = useState('Realistic');
  const [input, setInput] = useState('');
  const [published, setPublished] = useState(false);

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
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe Your Image
            </label>
            <textarea
              rows="4"
              onChange={e => setInput(e.target.value)}
              className="w-full border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none p-3"
              placeholder="Describe what you want the image to look like..."
              required
              value={input}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
            <div className="flex flex-wrap gap-2">
              {ImageStyles.map((item, index) => (
                <button
                  type="button"
                  key={index}
                  className={`text-sm px-4 py-2 min-w-[100px] text-center border rounded-lg transition-all ${
                    selectedStyle === item
                      ? 'bg-red-50 text-red-700 border-red-200 font-medium'
                      : 'text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedStyle(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="relative cursor-pointer">
              <input
                type="checkbox"
                onChange={e => setPublished(e.target.checked)}
                checked={published}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition"></div>
              <span className="absolute left-1 top-1 h-3 w-3 bg-white rounded-full peer-checked:translate-x-4 transition"></span>
            </label>
            <p className="text-sm text-gray-600">Make this image public</p>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-red-600 to-green-500 hover:from-red-700 hover:to-green-600 text-white py-3 px-4 text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            <Image className="w-4 h-4" />
            Generate Image
          </button>
        </div>
      </form>

      {/* Output Panel*/}
      <div className="w-full md:w-1/2 lg:w-3/5 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-50 rounded-lg">
            <Image className="w-5 h-5 text-green-600" />
          </div>
          <h1 className="text-xl font-semibold">Generated Images</h1>
        </div>

        <div className="min-h-[400px] rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <Image className="w-10 h-10 text-gray-300 mb-4" />
            <p className="text-sm text-gray-500 max-w-md">
              Describe an image and click "Generate Image" to get started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;
