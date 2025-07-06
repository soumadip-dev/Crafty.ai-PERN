import { Protect, useClerk, useUser } from '@clerk/clerk-react';
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  {
    to: '/ai',
    label: 'Dashboard',
    Icon: House,
  },
  {
    to: '/ai/write-article',
    label: 'Write Article',
    Icon: SquarePen,
  },
  {
    to: '/ai/blog-titles',
    label: 'Blog Titles',
    Icon: Hash,
  },
  {
    to: '/ai/generate-images',
    label: 'Generate Images',
    Icon: Image,
  },
  {
    to: '/ai/remove-background',
    label: 'Remove Background',
    Icon: Eraser,
  },
  {
    to: '/ai/remove-object',
    label: 'Remove Object',
    Icon: Scissors,
  },
  {
    to: '/ai/review-resume',
    label: 'Resume Reviewer',
    Icon: FileText,
  },
  {
    to: '/ai/community',
    label: 'Community',
    Icon: Users,
  },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <aside
      className={`fixed sm:relative w-64 h-[calc(100vh-56px)] bg-white border-r border-green-200 flex flex-col justify-between z-40 ${
        sidebar ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
      } transition-transform duration-200 ease-in-out`}
    >
      <div className="flex flex-col items-center pt-6 pb-4 px-4 w-full overflow-y-auto">
        {/* User Profile Section */}
        <div className="flex flex-col items-center mb-6 w-full">
          <button
            onClick={openUserProfile}
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full transition-transform hover:scale-105"
            aria-label="Open user profile"
          >
            <img
              src={user.imageUrl}
              alt={`${user.fullName}'s avatar`}
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 hover:border-red-500 transition-colors"
            />
          </button>
          <h2 className="mt-3 text-lg font-semibold text-gray-800 truncate max-w-full px-2">
            {user.fullName}
          </h2>
        </div>

        {/* Navigation Section */}
        <nav className="w-full space-y-1.5">
          {NAV_ITEMS.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg mx-1 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-red-500 to-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
              aria-current={to === window.location.pathname ? 'page' : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer Section */}
      <div className="p-3 border-t border-green-200 bg-green-50">
        <div className="flex items-center justify-between">
          <button
            onClick={openUserProfile}
            className="flex items-center gap-2 group flex-1"
            aria-label="Account settings"
          >
            <img
              src={user.imageUrl}
              alt={`${user.fullName}'s avatar`}
              className="w-8 h-8 rounded-full group-hover:ring-2 group-hover:ring-red-500 transition-all"
            />
            <div className="text-left overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">{user.fullName}</p>
              <p className="text-xs text-gray-500 truncate">
                <Protect plan="premium" fallback="Free">
                  Premium
                </Protect>{' '}
                Plan
              </p>
            </div>
          </button>
          <button
            onClick={signOut}
            className="p-1.5 rounded-md hover:bg-green-200 transition-colors"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4 text-gray-500 hover:text-gray-700" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
