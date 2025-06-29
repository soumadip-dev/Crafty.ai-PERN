import { Eraser, Sparkles } from 'lucide-react';
import { useState } from 'react';

const RemoveBackground = () => {
  const [input, setInput] = useState('');

  const onSubmitHandler = async e => {
    e.preventDefault();
    // Background removal logic would go here
  };

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6 text-gray-800">
      {/* Configuration Panel */}
      <form
        className="w-full md:w-1/2 lg:w-2/5 bg-white rounded-xl border border-gray-200 shadow-sm p-6"
        onSubmit={onSubmitHandler}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-50 rounded-lg">
            <Sparkles className="w-5 h-5 text-red-600" />
          </div>
          <h1 className="text-xl font-semibold">Background Removal</h1>
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
            />
            <p className="mt-2 text-xs text-gray-500">Supports JPG, PNG, and other image formats</p>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-red-600 to-green-500 hover:from-red-700 hover:to-green-600 text-white py-3 px-4 text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            <Eraser className="w-4 h-4" />
            Remove Background
          </button>
        </div>
      </form>

      {/* Output Panel */}
      <div className="w-full md:w-1/2 lg:w-3/5 bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-50 rounded-lg">
            <Eraser className="w-5 h-5 text-green-600" />
          </div>
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center">
          <Eraser className="w-10 h-10 text-gray-300 mb-4" />
          <p className="text-sm text-gray-500 max-w-md">
            Upload an image and click "Remove Background" to get started
          </p>
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;
