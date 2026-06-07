/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, Store, Banknote, Navigation, Receipt, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { toBanglaDigits, formatBanglaCurrency } from '../../data';

export default function HomeScreen() {
  const { 
    shops, 
    collectedMoney, 
    routeStarted, 
    setRouteStarted, 
    setActiveTab,
    setSelectedShopId
  } = useApp();

  // Calculate stats
  const totalVisited = shops.filter(s => s.visited).length;
  const totalShops = shops.length;

  // Let's format today's date in Bengali
  const today = new Date();
  const banglaMonths = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  const formattedDay = toBanglaDigits(today.getDate());
  const formattedYear = toBanglaDigits(today.getFullYear());
  const formattedMonth = banglaMonths[today.getMonth()];
  const banglaDateString = `${formattedDay} ${formattedMonth} ${formattedYear}`;

  // Get orders from all shops to make up "সাম্প্রতিক অর্ডার" (Recent Orders)
  const allOrders = shops.flatMap(shop => 
    shop.orderHistory.map(order => ({
      ...order,
      shopId: shop.id,
      shopName: shop.name
    }))
  ).sort((a, b) => {
    // Sort logic
    return 1; // Or just preserve some list order
  }).slice(0, 5); // display top 5

  const handleOrderClick = (shopId: string) => {
    setSelectedShopId(shopId);
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* Greeting Section */}
      <section className="bg-gradient-to-r from-[#006d3d]/10 via-transparent to-transparent p-4 rounded-2xl border-l-4 border-[#006d3d]">
        <h1 className="text-2xl font-bold text-[#191c1e] tracking-tight">আসসালামু আলাইকুম, রহিম</h1>
        <p className="text-sm font-medium text-[#3e4a40] mt-1 flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-[#006d3d]" />
          {banglaDateString}
        </p>
      </section>

      {/* Stat Cards - Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Today's Target */}
        <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#bdcabd] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="p-1.5 bg-[#68dd96]/15 rounded-lg text-[#006d3d]">
              <Target className="h-5 w-5" />
            </span>
            <h2 className="text-sm font-semibold text-[#3e4a40]">আজকের লক্ষ্য</h2>
          </div>
          <p className="text-3xl font-bold text-[#006d3d] tracking-tight">{formatBanglaCurrency(50000)}</p>
        </div>

        {/* Card 2: Shop Visits */}
        <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#bdcabd] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="p-1.5 bg-[#fed255]/15 rounded-lg text-[#755b00]">
              <Store className="h-5 w-5" />
            </span>
            <h2 className="text-sm font-semibold text-[#3e4a40]">দোকান পরিদর্শন</h2>
          </div>
          <p className="text-3xl font-bold text-[#006d3d] tracking-tight">
            {toBanglaDigits(totalVisited)}/{toBanglaDigits(totalShops)}
          </p>
        </div>

        {/* Card 3: Collected Money */}
        <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#bdcabd] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="p-1.5 bg-[#68dd96]/15 rounded-lg text-[#006d3d]">
              <Banknote className="h-5 w-5" />
            </span>
            <h2 className="text-sm font-semibold text-[#3e4a40]">সংগৃহীত টাকা</h2>
          </div>
          <p className="text-3xl font-bold text-[#006d3d] tracking-tight">
            {formatBanglaCurrency(collectedMoney)}
          </p>
        </div>
      </section>

      {/* Primary Action Button */}
      <section>
        <button
          onClick={() => {
            setRouteStarted(true);
            setActiveTab('route');
          }}
          className={`w-full py-4 rounded-xl flex items-center justify-center gap-2.5 font-semibold text-lg transition-all shadow-md active:scale-95 cursor-pointer ${
            routeStarted 
              ? 'bg-[#006d3d] text-white hover:bg-[#00522d]' 
              : 'bg-[#2da968] text-white hover:bg-[#006d3d] animate-pulse'
          }`}
        >
          <Navigation className="h-5 w-5 fill-current" />
          {routeStarted ? 'আজকের রুট পুনরায় দেখুন' : 'আজকের রুট শুরু করুন'}
        </button>
      </section>

      {/* Recent Orders Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-[#191c1e] border-b border-[#eceef0] pb-2">সাম্প্রতিক অর্ডার</h3>
        <div className="flex flex-col gap-3">
          {allOrders.map((orderedItem, index) => {
            const isDelivered = orderedItem.status === 'Delivered';
            return (
              <div
                key={index}
                onClick={() => handleOrderClick(orderedItem.shopId)}
                className="bg-[#ffffff] rounded-xl p-4 border border-[#bdcabd] cursor-pointer hover:border-[#2da968] hover:shadow-sm active:scale-[0.99] transition-all flex justify-between items-center h-[76px]"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#eceef0] p-2.5 rounded-full text-[#3e4a40]">
                    <Receipt className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-[#191c1e] line-clamp-1">{orderedItem.shopName}</p>
                    <p className="text-sm font-bold text-[#2da968] mt-0.5">
                      {formatBanglaCurrency(orderedItem.amount)}
                    </p>
                  </div>
                </div>

                <span 
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 leading-none ${
                    isDelivered 
                      ? 'bg-[#2da968]/15 text-[#00522d]' 
                      : 'bg-[#fed255]/20 text-[#735a00]'
                  }`}
                >
                  {isDelivered ? (
                    <>
                      <CheckCircle className="h-3.5 w-3.5" />
                      Delivered
                    </>
                  ) : (
                    'Pending'
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
