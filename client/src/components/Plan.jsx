import React from 'react';
import { PricingTable } from '@clerk/clerk-react';

const Plan = () => {
  return (
    <div className="max-w-2xl mx-auto z-20 my-30">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">Choose Your Plan</h2>
        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
          Start free, upgrade as needed. Perfect plans for content creation.
        </p>
      </div>
      <div className="mt-14 max-sm:mx-8">
        <PricingTable
          appearance={{
            variables: {
              colorPrimary: '#ef4444',
              colorBackground: '#f0fdf4',
              colorTextOnPrimaryBackground: '#ffffff',
              colorTextSecondary: '#15803d',
              colorText: '#1f2937',
              colorInputBackground: '#ffffff',
              colorShimmer: 'linear-gradient(90deg, #ef4444 0%, #22c55e 100%)',
            },
          }}
        />
      </div>
    </div>
  );
};

export default Plan;
