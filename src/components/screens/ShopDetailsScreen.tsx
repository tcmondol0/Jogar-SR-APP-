/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, MapPin, Phone, User, Store, AlertCircle, Sparkles, Check, DollarSign, PlusCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { toBanglaDigits, formatBanglaCurrency } from '../../data';

export default function ShopDetailsScreen() {
  const { 
    selectedShopId, 
    setSelectedShopId, 
    shops, 
    gpsCheckInMap, 
    performGpsCheckIn,
    collectDuePayment,
    setCurrentShopForOrder,
    setActiveTab
  } = useApp();

  const shop = shops.find(s => s.id === selectedShopId);
  const [checkingIn, setCheckingIn] = useState(false);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [collectAmount, setCollectAmount] = useState('');
  const [currentGpsChecked, setCurrentGpsChecked] = useState(gpsCheckInMap[selectedShopId || ''] || false);

  if (!shop) {
    return (
      <div className="py-20 text-center text-[#6e7a6f] flex flex-col items-center justify-center gap-3">
        <AlertCircle className="h-10 w-10 text-yellow-500" />
        <p>দুঃখিত, কোনো তথ্য পাওয়া যায়নি।</p>
        <button onClick={() => setSelectedShopId(null)} className="text-[#006d3d] font-bold underline">তালিকায় ফিরে যান</button>
      </div>
    );
  }

  const handleGpsCheckIn = () => {
    setCheckingIn(true);
    // Simulate real GPS lookup
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {}, 
        () => {}, 
        { timeout: 3000 }
      );
    }
    setTimeout(() => {
      performGpsCheckIn(shop.id);
      setCurrentGpsChecked(true);
      setCheckingIn(false);
    }, 1200);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(collectAmount);
    if (!isNaN(parsed) && parsed > 0) {
      collectDuePayment(shop.id, parsed);
      setShowCollectModal(false);
      setCollectAmount('');
      alert(`সফলভাবে ${formatBanglaCurrency(parsed)} সংগ্রহ করা হয়েছে!`);
    }
  };

  const startNewShopOrder = () => {
    setCurrentShopForOrder(shop);
    setActiveTab('order');
    setSelectedShopId(null);
  };

  return (
    <div className="flex flex-col pb-[110px] animate-fade-in">
      {/* Mini App Bar / Sub-Header */}
      <div className="flex items-center justify-between border-b border-[#eceef0] pb-3 mb-4">
        <button 
          onClick={() => setSelectedShopId(null)}
          className="h-10 w-10 flex items-center justify-center text-[#3e4a40] hover:bg-[#eceef0] rounded-full transition-colors active:scale-90"
        >
          <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
        </button>
        <h2 className="text-lg font-bold text-[#006d3d]">শপ ডিটেইলস</h2>
        <button className="h-10 w-10 flex items-center justify-center text-[#3e4a40] hover:bg-[#eceef0] rounded-full transition-colors">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      {/* GPS Check-in Hero Banner */}
      <div className="bg-white rounded-2xl p-5 border border-[#bdcabd] shadow-sm flex flex-col items-center justify-center text-center space-y-3 mb-5">
        {currentGpsChecked ? (
          <div className="flex flex-col items-center space-y-1">
            <div className="h-12 w-12 bg-[#2da968]/15 text-[#006d3d] rounded-full flex items-center justify-center shadow-inner animate-scale-up">
              <Check className="h-6 w-6 stroke-[3]" />
            </div>
            <p className="text-sm font-bold text-[#00522d]">জিপিএস চেক-ইন সম্পন্ন হয়েছে</p>
            <p className="text-[11px] text-[#6e7a6f]">আপনি বর্তমানে এই লোকেশনে অবস্থান করছেন</p>
          </div>
        ) : (
          <div className="w-full">
            <button 
              onClick={handleGpsCheckIn}
              disabled={checkingIn}
              className={`flex items-center justify-center gap-2 bg-[#fed255] hover:bg-[#ecc246] text-[#241a00] px-6 h-12 rounded-xl w-full font-bold text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer ${
                checkingIn ? 'opacity-85 pointer-events-none' : ''
              }`}
            >
              {checkingIn ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin text-[#735a00]" />
                  <span>লোকেশন খোঁজা হচ্ছে...</span>
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4 fill-current text-[#735a00]" />
                  <span>জিপিএস চেক-ইন</span>
                </>
              )}
            </button>
            <p className="text-xs font-semibold text-[#6e7a6f] mt-2.5">
              শপ ভিジット শুরু করতে ট্যাপ করুন
            </p>
          </div>
        )}
      </div>

      {/* Shop Info Container */}
      <div className="bg-white rounded-2xl border border-[#bdcabd] p-5 shadow-sm space-y-4 mb-5">
        <h3 className="text-xl font-bold text-[#191c1e] text-[#006d3d] leading-tight border-b border-[#eceef0] pb-2.5">
          {shop.name}
        </h3>
        
        <div className="space-y-3.5">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-[#3e4a40]">
            <User className="h-4 w-4 text-[#2da968]" />
            <span>{shop.owner}</span>
          </div>

          <div className="flex items-center gap-2.5 text-sm font-semibold text-[#3e4a40]">
            <Phone className="h-4 w-4 text-[#2da968]" />
            <a href={`tel:${shop.phone}`} className="hover:underline text-[#006d3d]">{shop.phone}</a>
          </div>

          <div className="flex items-start gap-2.5 text-sm font-semibold text-[#3e4a40]">
            <Store className="h-4 w-4 text-[#2da968] mt-0.5" />
            <span>{shop.address}</span>
          </div>
        </div>
      </div>

      {/* Credit Balance Card */}
      <div className="bg-white border border-[#bdcabd] rounded-2xl p-5 shadow-sm relative overflow-hidden mb-5">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#fed255]"></div>
        <div className="pl-2.5">
          <p className="text-[11px] font-bold text-[#6e7a6f] uppercase tracking-wider mb-1">বাকি ব্যালেন্স</p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-extrabold text-[#ba1a1a] tracking-tight">{formatBanglaCurrency(shop.dueBalance)}</span>
            
            {shop.dueBalance > 0 && (
              <button 
                onClick={() => {
                  const template = `আসসালামু আলাইকুম ${shop.owner}, আপনার বিসমিল্লাহ স্টোর-এ বকেয়া ৳ ${shop.dueBalance} পরিশোধের জন্য অনুরোধ করা হচ্ছে। ধন্যবাদ, রহিম (যোগাড় সেলস রিপ্রেজেন্টেটিভ)।`;
                  const smsUrl = `sms:${shop.phone}?body=${encodeURIComponent(template)}`;
                  window.open(smsUrl, '_blank');
                }}
                className="text-xs font-bold text-[#006d3d] border border-[#006d3d]/30 hover:bg-[#eceef0] px-3 py-1.5 rounded-lg active:scale-95 transition-all"
              >
                পেমেন্ট রিমাইন্ডার
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Order History Listing */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#191c1e]">অর্ডার হিস্ট্রি</h3>
          <span className="text-xs font-semibold text-[#6e7a6f]">সর্বমোট: {toBanglaDigits(shop.orderHistory.length)}টি</span>
        </div>

        <div className="flex flex-col gap-3">
          {shop.orderHistory.map((history, idx) => {
            const isDelivered = history.status === 'Delivered';
            return (
              <div 
                key={idx}
                className="bg-white p-4 rounded-xl border border-[#bdcabd] flex justify-between items-center shadow-sm"
              >
                <div>
                  <p className="text-sm font-bold text-[#191c1e]">{history.date}</p>
                  <p className="text-xs text-[#6e7a6f] mt-1 font-medium">অর্ডার {toBanglaDigits(history.id)}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-[#00522d]">{formatBanglaCurrency(history.amount)}</p>
                  <span 
                    className={`inline-block mt-1 px-2.5 py-1 text-[11px] font-bold rounded-lg ${
                      isDelivered 
                        ? 'bg-[#2da968]/15 text-[#00522d]' 
                        : 'bg-[#eceef0] text-[#3e4a40]'
                    }`}
                  >
                    {isDelivered ? 'প্রদান করা হয়েছে' : 'অপেক্ষমান'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Actions Bar */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-[#eceef0] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] z-40 p-4 max-w-7xl mx-auto rounded-t-2xl flex gap-3 pb-safe-bottom">
        <button 
          onClick={() => setShowCollectModal(true)}
          className="flex-1 h-12 flex items-center justify-center gap-2 bg-[#eceef0] hover:bg-[#e0e3e5] text-[#191c1e] border border-[#bdcabd] font-bold text-sm rounded-xl active:scale-95 transition-all cursor-pointer"
        >
          <DollarSign className="h-4 w-4" />
          <span>টাকা সংগ্রহ</span>
        </button>

        <button 
          onClick={startNewShopOrder}
          className="flex-1 h-12 flex items-center justify-center gap-2 bg-[#006d3d] hover:bg-[#00522d] text-white font-bold text-sm rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <PlusCircle className="h-4 w-4" />
          <span>নতুন অর্ডার</span>
        </button>
      </div>

      {/* Collect Money Dialog */}
      {showCollectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6 animate-fade-in">
          <form 
            onSubmit={handlePaymentSubmit}
            className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full space-y-4 animate-scale-up"
          >
            <h3 className="text-lg font-bold text-[#191c1e] text-center border-b border-[#eceef0] pb-2">অর্থ বা বকেয়া সংগ্রহ</h3>
            <div>
              <label className="block text-xs font-semibold text-[#6e7a6f] mb-1.5">{shop.name}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold text-[#3e4a40]">৳</span>
                <input 
                  type="number"
                  placeholder="টাকার পরিমাণ লিখুন"
                  value={collectAmount}
                  onChange={(e) => setCollectAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-[#bdcabd] rounded-xl focus:outline-none focus:border-[#006d3d] focus:ring-1 focus:ring-[#006d3d] font-bold text-lg text-[#191c1e]"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button 
                type="button"
                onClick={() => setShowCollectModal(false)}
                className="flex-1 py-3 text-sm font-semibold text-[#3e4a40] bg-[#eceef0] rounded-xl hover:bg-[#e0e3e5]"
              >
                বাতিল করুন
              </button>
              <button 
                type="submit"
                className="flex-1 py-3 text-sm font-bold text-white bg-[#006d3d] rounded-xl hover:bg-[#00522d]"
              >
                সংগ্রহ করুন
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
