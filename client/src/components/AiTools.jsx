import React from 'react';
import { AiToolsData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="px-4 sm:px-8 lg:px-16 xl:px-32 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-gray-800 text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Powerful AI Tools
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Everything you need to create, enhance, and optimize your content with our suite of AI
          tools.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="group p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-lg cursor-pointer hover:border-transparent transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            onClick={() => user && navigate(tool.path)}
          >
            <div className="flex flex-col h-full">
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                style={{
                  background: `linear-gradient(to bottom right, ${tool.bg.from}, ${tool.bg.to})`,
                }}
              >
                <tool.Icon className="w-6 h-6 text-white group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-red-500 transition-colors duration-300">
                {tool.title}
              </h3>
              <p className="text-gray-500 mb-4 flex-grow group-hover:text-gray-700 transition-colors duration-300">
                {tool.description}
              </p>
              <div className="text-green-500 font-medium text-sm flex items-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Explore tool
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;
