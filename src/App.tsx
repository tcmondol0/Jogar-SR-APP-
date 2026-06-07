/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import HomeScreen from './components/screens/HomeScreen';
import RoutesScreen from './components/screens/RoutesScreen';
import OrderScreen from './components/screens/OrderScreen';
import ShopDetailsScreen from './components/screens/ShopDetailsScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import { X, RefreshCw, FileText, Settings, Info, LogOut } from 'lucide-react';

function AppContent() {
  const { activeTab, selectedShopId, setSelectedShopId } = useApp();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Determine active view override
  const renderActiveScreen = () => {
    // If shop detail is selected, show details regardless of tab (enables back button routing)
    if (selectedShopId) {
      return <ShopDetailsScreen />;
    }

    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'route':
        return <RoutesScreen />;
      case 'order':
        return <OrderScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  // Determine subheader/header title dynamically
  const getHeaderTitle = () => {
    if (selectedShopId) return 'শপ ডিটেইলস';
    switch (activeTab) {
      case 'home': return 'যোগাড়';
      case 'route': return 'আজকের রুট';
      case 'order': return 'নতুন অর্ডার নিন';
      case 'profile': return 'ইউজার প্রোফাইল';
      default: return 'যোগাড়';
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] relative max-w-7xl mx-auto flex flex-col">
      {/* Navigation Header */}
      <Header 
        title={getHeaderTitle()} 
        onMenuClick={() => setIsDrawerOpen(true)} 
      />

      {/* Main Container */}
      <main className="flex-1 w-full px-4 sm:px-6 pt-24 pb-28">
        <div className="max-w-3xl mx-auto">
          {renderActiveScreen()}
        </div>
      </main>

      {/* Bottom Sticky Tab-Bar bar */}
      <BottomNav />

      {/* Slide-In Left Navigation Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop Shadow */}
          <div 
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-black/50 transition-opacity"
          />

          {/* Drawer Inner Panel */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white text-[#191c1e] shadow-2xl h-full animate-slide-right">
            {/* Close btn & label */}
            <div className="p-5 border-b border-[#eceef0] flex items-center justify-between">
              <span className="text-xl font-black text-[#006d3d]">যোগাড় মেনু</span>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="h-10 w-10 bg-[#eceef0] hover:bg-gray-200 transition-colors rounded-full flex items-center justify-center text-[#3e4a40]"
              >
                <X className="h-5 w-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex-grow p-4 space-y-2">
              <div className="p-3 bg-gray-50 border border-[#bdcabd] rounded-xl mb-4 space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase">প্রতিনিধি</p>
                <p className="text-sm font-black text-[#191c1e]">মোঃ রহিম উদ্দিন</p>
                <p className="text-[11px] font-semibold text-[#006d3d]">মিরপুর জোন (ঢাকা)</p>
              </div>

              {[
                { label: 'দৈনিক রিপোর্ট ডাউনলোড', icon: FileText },
                { label: 'রুট সেটিংস', icon: Settings },
                { label: 'যোগাড় সম্পর্কে', icon: Info }
              ].map((link, idx) => {
                const Icon = link.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      alert(`এই বৈশিষ্ট্যটি শীঘ্রই যোগ করা হবে!`);
                      setIsDrawerOpen(false);
                    }}
                    className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[#3e4a40] hover:bg-gray-50 hover:text-[#006d3d] rounded-xl transition-all cursor-pointer"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </button>
                );
              })}

              {/* Data Reset Helper */}
              <button
                onClick={() => {
                  if (confirm('আপনি কি সব ডেমো তথ্য ও ড্যাশবোর্ড ডাটা আগের অবস্থায় ফিরিয়ে নিতে চান?')) {
                    localStorage.clear();
                    window.location.reload();
                  }
                }}
                className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[#ba1a1a] hover:bg-red-50 hover:text-red-700 rounded-xl transition-all cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                <span>ডেটা রিসেট করুন</span>
              </button>
            </nav>

            {/* Footer Sign out */}
            <div className="p-5 border-t border-[#eceef0] bg-gray-50">
              <button 
                onClick={() => {
                  alert('লগআউট সফল হয়েছে!');
                  setIsDrawerOpen(false);
                }}
                className="w-full py-3 bg-[#ba1a1a]/15 text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>লগ আউট</span>
              </button>
              <p className="text-center text-[10px] text-gray-400 mt-3">সংস্করণ v১.২.৫ © ২০২৬ যোগাড় ইনকর্পোরেট</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
