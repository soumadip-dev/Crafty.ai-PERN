import { useState, useEffect } from 'react';
import { Gem, Sparkles } from 'lucide-react';
import { Protect } from '@clerk/clerk-react';
import CreationItem from '../components/CreationItem';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const token = await getToken();

      if (!token) {
        throw new Error('No authentication token found');
      }

      const { data } = await axios.get('/api/v1/user/get-user-creations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.data.creations);

      if (!data?.success) throw new Error(data?.message || 'Something went wrong');
      setCreations(data?.data?.creations);
    } catch (error) {
      console.log('API Error:', error);
      toast.error(error.response?.data?.message || error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full flex flex-col p-4 md:p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Creation Card */}
        <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all sm:p-4">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500">Total Creations</p>
            <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">{creations.length}</h2>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-red-400 rounded-md flex items-center justify-center shadow-inner">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
        </div>

        {/* Active Plan Card */}
        <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all sm:p-4">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500">Active Plan</p>
            <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-green-400 rounded-md flex items-center justify-center shadow-inner">
            <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Recent Creations Section */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <ClipLoader size={50} color="#16a34a" />
        </div>
      ) : (
        <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm overflow-hidden">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 p-4">Recent Creations</h3>
          <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 260px)' }}>
            {creations.length > 0 ? (
              <div className="grid gap-2 sm:gap-3 p-4">
                {creations.map(item => (
                  <CreationItem key={item.id} item={item} className="text-sm sm:text-base" />
                ))}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8">
                <p className="text-gray-500 text-center">
                  No creations found. Start creating something new!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
