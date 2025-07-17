import { useState } from 'react';
import Markdown from 'react-markdown';

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`p-5 bg-white border border-gray-200 rounded-lg transition-all ${
        expanded ? 'shadow-md' : 'shadow-sm hover:shadow-md'
      } cursor-pointer`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-gray-800 break-words line-clamp-2">
            {item.prompt}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(item.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
            item.type === 'image' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}
        >
          {item.type}
        </span>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {item.type === 'image' ? (
            <div className="flex justify-center">
              <img
                src={item.content}
                alt={item.prompt}
                className="rounded-lg max-w-full h-auto max-h-96 object-contain"
              />
            </div>
          ) : (
            <div className="prose prose-sm max-w-none text-gray-700 break-words overflow-x-hidden">
              <Markdown>{item.content}</Markdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
