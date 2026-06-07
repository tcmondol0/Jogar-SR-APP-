/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, MapPin, CheckCircle2, Route, RotateCw, Navigation, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { toBanglaDigits, formatBanglaCurrency, MAP_IMAGE_URL } from '../../data';

export default function RoutesScreen() {
  const { 
    shops, 
    setSelectedShopId, 
    routeStarted, 
    setRouteStarted 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [sortedShops, setSortedShops] = useState(shops);
  const [selectedMapPin, setSelectedMapPin] = useState<string | null>(null);

  // Search filter
  const filteredShops = sortedShops.filter(shop => 
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOptimizeRoute = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      // Sort shops by distance ascending
      const visitSequence = [...shops].sort((a, b) => {
        const distA = parseFloat(a.distance.replace(/[^\d.]/g, '')) || 0;
        const distB = parseFloat(b.distance.replace(/[^\d.]/g, '')) || 0;
        return distA - distB;
      });
      setSortedShops(visitSequence);
      setIsOptimizing(false);
      alert('রুট সফলভাবে অপ্টিমাইজ করা হয়েছে!');
    }, 1200);
  };

  const remainingCount = filteredShops.filter(s => !s.visited).length;

  // Let's place 7 custom map markers on the 35vh image representing coordinates over Dhaka!
  // This is a premium touch! Clicking a pin centers or filters to that store.
  const pins = [
    { id: '1', name: 'বিসমিল্লাহ স্টোর', x: '50%', y: '15%', visited: true },
    { id: '2', name: 'মদিনা স্টোর', x: '75%', y: '40%', visited: false },
    { id: '3', name: 'ভাই ভাই ট্রেডার্স', x: '30%', y: '50%', visited: true },
    { id: '4', name: 'সততা স্টোর', x: '65%', y: '75%', visited: false },
    { id: '5', name: 'আল-মদিনা জেনারেল স্টোর', x: '45%', y: '35%', visited: false },
    { id: '6', name: 'রহমানিয়া স্টোর', x: '55%', y: '65%', visited: false },
    { id: '7', name: 'বিসমিল্লাহ ট্রেডার্স', x: '40%', y: '85%', visited: true }
  ];

  const handlePinClick = (shopId: string) => {
    setSelectedMapPin(shopId);
    setSelectedShopId(shopId);
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Map Section */}
      <section className="relative w-full h-[35vh] bg-[#eceef0] border-b border-[#bdcabd] overflow-hidden rounded-2xl shadow-sm">
        <img 
          alt="Map view of today's route with store locations" 
          className="w-full h-full object-cover select-none absolute inset-0"
          src={MAP_IMAGE_URL}
          referrerPolicy="no-referrer"
        />
        {/* Soft shadow tint overlay */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

        {/* Dynamic click-interactive Map markers over the mockup map */}
        {pins.map((pin) => (
          <button
            key={pin.id}
            onClick={() => handlePinClick(pin.id)}
            style={{ left: pin.x, top: pin.y }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 group z-25 active:scale-110 cursor-pointer transition-all duration-200`}
          >
            <div className="relative">
              <MapPin 
                className={`h-9 w-9 drop-shadow-md transition-all ${
                  pin.visited 
                    ? 'text-[#006d3d] fill-[#68dd96]' 
                    : 'text-[#755b00] fill-[#fed255]'
                } ${selectedMapPin === pin.id ? 'scale-125 stroke-[2.5]' : 'scale-100 hover:scale-115'}`} 
              />
              {/* Pulse effect for selected pin */}
              {selectedMapPin === pin.id && (
                <span className="absolute inset-0 rounded-full h-9 w-9 bg-yellow-400/50 animate-ping z-[-1] pointer-events-none"></span>
              )}
              {/* Tooltip on hover */}
              <div className="absolute top-[40px] left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900/90 text-white text-[11px] font-medium px-2 py-1 rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                {pin.name}
              </div>
            </div>
          </button>
        ))}

        {/* Search Bar Overlay */}
        <div className="absolute top-4 left-4 right-4 z-30">
          <div className="bg-[#ffffff] rounded-full shadow-lg flex items-center px-4 py-2.5 border border-[#bdcabd] focus-within:border-[#006d3d] transition-colors">
            <Search className="text-[#6e7a6f] h-5 w-5 mr-2" />
            <input 
              className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-[#191c1e] text-sm placeholder:text-[#6e7a6f]" 
              placeholder="দোকান খুঁজুন..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Optimize Route Floating Action Button (FAB) Overlay */}
        <button 
          onClick={handleOptimizeRoute}
          disabled={isOptimizing}
          className="absolute bottom-4 right-4 bg-[#006d3d] hover:bg-[#00522d] text-white shadow-lg rounded-full h-12 px-5 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer z-35 disabled:opacity-85 font-medium text-sm"
        >
          {isOptimizing ? (
            <RotateCw className="h-5 w-5 animate-spin" />
          ) : (
            <Route className="h-5 w-5 stroke-[2.5]" />
          )}
          <span>{isOptimizing ? 'অপ্টিমাইজ হচ্ছে...' : 'রুট অপ্টিমাইজ'}</span>
        </button>
      </section>

      {/* Shop List Section */}
      <section className="py-5 flex flex-col gap-4">
        <div className="flex justify-between items-end mb-1">
          <h2 className="text-xl font-bold text-[#191c1e] tracking-tight">পরবর্তী গন্তব্য</h2>
          <span className="text-xs font-semibold text-[#6e7a6f]">
            মোট: {toBanglaDigits(filteredShops.length)}টি দোকান ({toBanglaDigits(remainingCount)}টি বাকি)
          </span>
        </div>

        {filteredShops.map((shop) => {
          const isVisited = shop.visited;
          return (
            <article 
              key={shop.id}
              className={`bg-[#ffffff] rounded-2xl border border-[#bdcabd] hover:shadow-md transition-all relative overflow-hidden p-5 flex flex-col gap-3 ${
                isVisited ? 'opacity-85 bg-gray-50/50' : 'shadow-sm'
              }`}
            >
              {/* Colored Side Trim */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  isVisited ? 'bg-[#2da968]' : 'bg-[#fed255]'
                }`}
              ></div>

              <div className="flex justify-between items-start pl-2">
                <div>
                  <h3 className="text-lg font-bold text-[#191c1e] hover:text-[#006d3d] cursor-pointer" onClick={() => setSelectedShopId(shop.id)}>
                    {shop.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs font-semibold text-[#3e4a40] bg-[#e6e8ea] px-2.5 py-1 rounded-md">
                      {shop.type}
                    </span>
                    <span className="text-xs font-medium text-[#6e7a6f] flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-[#006d3d]" /> 
                      {shop.distance}
                    </span>
                  </div>
                </div>

                <span 
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1 uppercase tracking-wider ${
                    isVisited 
                      ? 'bg-[#2da968]/15 text-[#00522d]' 
                      : 'bg-[#fed255]/20 text-[#735a00]'
                  }`}
                >
                  {isVisited ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      ভ্রমণ করা হয়েছে
                    </>
                  ) : (
                    'বাকি আছে'
                  )}
                </span>
              </div>

              <div className="pl-2 pt-3 border-t border-[#eceef0] flex justify-between items-center mt-1">
                <div>
                  <p className="text-[11px] font-semibold text-[#6e7a6f] uppercase tracking-wide">
                    {isVisited ? 'আজকের অর্ডার' : 'শেষ অর্ডার'}
                  </p>
                  <p className="text-base font-bold text-[#191c1e] mt-0.5">
                    {formatBanglaCurrency(shop.lastOrderSum)}
                  </p>
                </div>

                <button 
                  onClick={() => setSelectedShopId(shop.id)}
                  className={`h-10 px-5 rounded-xl font-semibold text-[13px] flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
                    isVisited 
                      ? 'border-2 border-[#2da968] text-[#006d3d] hover:bg-[#e6e8ea]' 
                      : 'bg-[#006d3d] text-white hover:bg-[#00522d]'
                  }`}
                >
                  {isVisited ? 'বিস্তারিত দেখুন' : 'পরিদর্শন শুরু করুন'}
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
