import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';
import { ClipLoader } from 'react-spinners';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      const token = await getToken();

      if (!token) {
        throw new Error('No authentication token found');
      }

      const { data } = await axios.get('/api/v1/user/get-published-creations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!data?.success) throw new Error(data?.message || 'Something went wrong');
      setCreations(data?.data?.creations);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const imageLikeToggle = async id => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const { data } = await axios.post(
        '/api/v1/user/toggle-like-creation',
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);

      if (data?.success) {
        toast.success(data?.message);
        fetchCreations();
      } else {
        throw new Error(data?.message || 'Something went wrong');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    if (user) fetchCreations();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <ClipLoader color="#3B82F6" size={40} />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 gap-6 max-w-7xl mx-auto w-full h-[calc(100vh-80px)]">
      {' '}
      {/* Adjusted height */}
      <h1 className="text-3xl font-bold text-gray-800">Community Creations</h1>
      <div className="bg-white rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
        {creations.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 p-4">
            No creations found in the community yet.
          </div>
        ) : (
          <section className="p-4 overflow-y-auto h-full">
            {' '}
            {/* Changed to h-full */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-2">
              {' '}
              {/* Added pb-2 for padding at bottom */}
              {creations.map((creation, index) => (
                <div
                  key={index}
                  className="relative group aspect-square rounded-xl overflow-hidden transition-all hover:shadow-lg"
                >
                  <img
                    src={creation.content}
                    alt={creation.prompt}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                  />

                  <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium line-clamp-2 mb-2">
                      {creation.prompt}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Heart
                          onClick={() => imageLikeToggle(creation.id)}
                          className={`w-5 h-5 transition-all hover:scale-110 cursor-pointer ${
                            creation.likes.includes(user?.id?.toString())
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
          </section>
        )}
      </div>
    </div>
  );
};

export default Community;
