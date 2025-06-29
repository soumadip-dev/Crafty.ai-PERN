import React, { useEffect } from 'react';
import { dummyCreationData } from '../assets/assets';
import { Gem, Sparkles } from 'lucide-react';
import { Protect } from '@clerk/clerk-react';
import CreationItem from '../components/CreationItem';

const Dashboard = () => {
  const [creations, setCreations] = React.useState([]);

  useEffect(() => {
    // Simulate API fetch
    const getDashboardData = () => {
      setCreations(dummyCreationData);
    };
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Total Creation Card */}
        <div className="flex justify-between items-center p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Creations</p>
            <h2 className="text-2xl font-semibold text-gray-800">{creations.length}</h2>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-400 rounded-lg flex items-center justify-center shadow-inner">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Active Plan Card */}
        <div className="flex justify-between items-center p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-gray-500">Active Plan</p>
            <h2 className="text-2xl font-semibold text-gray-800">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-400 rounded-lg flex items-center justify-center shadow-inner">
            <Gem className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Recent Creations Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Creations</h3>
        <div className="grid gap-4">
          {creations.map(item => (
            <CreationItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
