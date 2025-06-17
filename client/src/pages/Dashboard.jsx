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

      {/* Recent Creations Section - Now with constrained height */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">Recent Creations</h3>
        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-2 sm:gap-3">
            {creations.map(item => (
              <CreationItem
                key={item.id}
                item={item}
                className="text-sm sm:text-base" // Pass className if CreationItem supports it
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
