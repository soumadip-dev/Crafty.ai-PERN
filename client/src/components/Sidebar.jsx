import { useClerk, useUser } from '@clerk/clerk-react';
import React from 'react';

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 top-14 bottom-0 flex flex-col justify-between items-center max-sm:absolute ${
        sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'
      } transition-all duration-300 ease-in-out`}
    >
      <div className="my-7 w-full flex flex-col items-center">
        <img
          src={user.imageUrl}
          alt={`${user.fullName} avatar`}
          className="w-13 h-13 rounded-full mx-auto"
        />
        <h1 className="text-center mt-1 text-lg font-medium">{user.fullName}</h1>
      </div>
    </div>
  );
};

export default Sidebar;
