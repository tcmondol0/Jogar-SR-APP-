/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, Map, ShoppingCart, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TabType } from '../../types';

export default function BottomNav() {
  const { activeTab, setActiveTab } = useApp();

  const navItems = [
    { id: 'home' as TabType, label: 'হোম', icon: Home },
    { id: 'route' as TabType, label: 'রুট', icon: Map },
    { id: 'order' as TabType, label: 'অর্ডার', icon: ShoppingCart },
    { id: 'profile' as TabType, label: 'প্রোফাইল', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[72px] bg-[#ffffff] border-t border-[#bdcabd] shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-40 flex justify-around items-center px-4 max-w-7xl mx-auto rounded-t-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="flex flex-col items-center justify-center w-20 h-full relative cursor-pointer group select-none"
          >
            {isActive ? (
              <div className="flex flex-col items-center justify-center bg-[#fed255] text-[#241a00] rounded-full px-5 py-1.5 transition-all duration-300 transform scale-105 shadow-sm">
                <Icon className="h-5 w-5 stroke-[2.5]" />
                <span className="text-xs font-semibold mt-0.5 whitespace-nowrap">{item.label}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-[#3e4a40] group-hover:text-[#006d3d] transition-colors duration-150">
                <Icon className="h-5 w-5 stroke-[1.8]" />
                <span className="text-xs font-medium mt-1 whitespace-nowrap">{item.label}</span>
              </div>
            )}
          </button>
        );
      })}
    </nav>
  );
}
