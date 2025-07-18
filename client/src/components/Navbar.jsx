import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Github } from 'lucide-react';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <nav className="fixed z-50 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
      <img
        src={assets.logo}
        alt="Company Logo"
        className="w-32 sm:w-44 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => navigate('/')}
      />
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/soumadip-dev/Crafty.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-black transition-colors"
          aria-label="GitHub repository"
        >
          <Github className="w-6 h-6" />
        </a>
      </div>
      {user ? (
        <UserButton />
      ) : (
        <button
          className="flex items-center gap-2 rounded-full text-sm font-medium cursor-pointer bg-gradient-to-r from-red-500 to-green-500 text-white px-10 py-2.5 hover:from-red-600 hover:to-green-600 transition-colors"
          onClick={openSignIn}
        >
          Get started
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </nav>
  );
};

export default Navbar;
