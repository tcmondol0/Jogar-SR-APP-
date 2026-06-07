/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Menu, UserCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PROFILE_PHOTO_URL } from '../../data';

interface HeaderProps {
  title?: string;
  onMenuClick?: () => void;
}

export default function Header({ title = 'যোগাড়', onMenuClick }: HeaderProps) {
  const { setActiveTab } = useApp();

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] bg-[#ffffff] border-b border-[#eceef0] shadow-sm flex items-center justify-between px-6 z-40 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="text-[#3e4a40] hover:bg-[#eceef0] active:scale-95 transition-all p-2 rounded-full h-11 w-11 flex items-center justify-center cursor-pointer"
        >
          <Menu className="h-6 w-6 text-[#006d3d]" />
        </button>
        <span 
          onClick={() => setActiveTab('home')}
          className="text-2xl font-bold text-[#006d3d] cursor-pointer tracking-tight"
        >
          {title}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => setActiveTab('profile')}
          className="h-11 w-11 rounded-full overflow-hidden border-2 border-[#68dd96] hover:scale-105 active:scale-95 transition-all outline-none"
        >
          <img 
            src={PROFILE_PHOTO_URL} 
            alt="Rahim Profile" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </button>
      </div>
    </header>
  );
}
