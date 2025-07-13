import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { dummyPublishedCreationData } from '../assets/assets';
import { Heart } from 'lucide-react';

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchCreations = () => {
      setCreations(dummyPublishedCreationData);
    };

    if (user) fetchCreations();
  }, [user]);

  return (
    <div className="flex flex-col h-full p-6 gap-6">
      <h1 className="text-2xl font-semibold text-gray-800">Community Creations</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-y-auto h-full">
          {creations.map((creation, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-lg overflow-hidden transition-all hover:shadow-md"
            >
              <img
                src={creation.content}
                alt={creation.prompt}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-sm font-medium line-clamp-2 mb-2">
                  {creation.prompt}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Heart
                      className={`w-5 h-5 transition-transform hover:scale-110 cursor-pointer ${
                        creation.likes.includes(user?.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-white/80 hover:text-white'
                      }`}
                    />
                    <span className="text-white text-sm">{creation.likes.length}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
