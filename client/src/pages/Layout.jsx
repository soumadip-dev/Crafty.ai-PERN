import { assets } from '../assets/assets.js';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar.jsx';
import { useUser, SignIn } from '@clerk/clerk-react';

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col w-full min-h-screen">
      {/* Navbar */}
      <nav className="w-full px-4 py-3 flex items-center justify-between border-b border-green-200 bg-white sticky top-0 z-10 md:px-8">
        <img
          src={assets.logo}
          alt="Logo"
          onClick={() => navigate('/')}
          className="cursor-pointer w-32 md:w-40"
        />
        {sidebar ? (
          <X
            className="w-6 h-6 cursor-pointer text-gray-600 md:hidden"
            onClick={() => setSidebar(false)}
          />
        ) : (
          <Menu
            className="w-6 h-6 cursor-pointer text-gray-600 md:hidden"
            onClick={() => setSidebar(true)}
          />
        )}
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 w-full h-full">
        {/* Sidebar - hidden on mobile when not active */}
        <div className={`${sidebar ? 'block' : 'hidden'} fixed inset-0 z-20 md:relative md:block`}>
          <div
            className="absolute inset-0 bg-black bg-opacity-50 md:hidden"
            onClick={() => setSidebar(false)}
          ></div>
          <div className="relative h-full w-64 bg-white z-30 md:shadow-none">
            <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full p-4 bg-red-50 overflow-auto md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen p-4">
      <SignIn />
    </div>
  );
};

export default Layout;
