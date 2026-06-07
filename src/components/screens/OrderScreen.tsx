/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ChevronRight, ShoppingBag, Plus, Minus, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { toBanglaDigits, formatBanglaCurrency } from '../../data';

type CategoryType = 'ব্যক্তিগত যত্ন' | 'FMCG' | 'মোবাইল এক্সেসরিজ';

export default function OrderScreen() {
  const { 
    products, 
    cart, 
    addToCart, 
    removeFromCart, 
    currentShopForOrder, 
    setCurrentShopForOrder,
    shops,
    confirmOrder
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<CategoryType>('ব্যক্তিগত যত্ন');
  const [productQuery, setProductQuery] = useState('');
  const [showOrderPlacedSuccess, setShowOrderPlacedSuccess] = useState(false);

  const categories: CategoryType[] = ['ব্যক্তিগত যত্ন', 'FMCG', 'মোবাইল এক্সেসরিজ'];

  // Filter products
  const filteredProducts = products.filter(product => {
    const isMatchedCategory = product.category === activeCategory;
    const isMatchedQuery = product.name.toLowerCase().includes(productQuery.toLowerCase());
    return isMatchedCategory && isMatchedQuery;
  });

  // Calculate cart sums
  const totalItemCount = (Object.values(cart) as number[]).reduce((a, b) => a + b, 0);
  const totalAmount = products.reduce((sum, product) => {
    const qty = cart[product.id] || 0;
    return sum + product.price * qty;
  }, 0);

  const handleConfirmOrderSubmit = () => {
    if (totalAmount <= 0) {
      alert('দয়া করে অর্ডার নিশ্চিত করার জন্য কমপক্ষে ১টি পণ্য যোগ করুন!');
      return;
    }
    setShowOrderPlacedSuccess(true);
    setTimeout(() => {
      confirmOrder();
      setShowOrderPlacedSuccess(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col pb-[160px]">
      {/* Target Shop Selector Banner */}
      <section className="bg-gradient-to-r from-[#2da968]/15 via-white to-white p-4 rounded-xl border border-[#bdcabd] mb-4 flex justify-between items-center">
        <div>
          <span className="text-xs font-semibold text-[#006d3d] uppercase tracking-wider">অর্ডার নেওয়া হচ্ছে</span>
          <h2 className="text-base font-bold text-[#191c1e] mt-0.5">
            {currentShopForOrder ? currentShopForOrder.name : 'কোন দোকান নির্বাচিত নেই'}
          </h2>
        </div>
        <select 
          value={currentShopForOrder?.id || ''} 
          onChange={(e) => {
            const selected = shops.find(s => s.id === e.target.value);
            if (selected) setCurrentShopForOrder(selected);
          }}
          className="text-xs bg-white text-[#191c1e] font-semibold py-2 px-3 border border-[#bdcabd] rounded-xl focus:outline-none focus:border-[#006d3d]"
        >
          {shops.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </section>

      {/* Search and Filter Section */}
      <section className="sticky top-[72px] bg-[#f7f9fb] pt-2 pb-4 z-30">
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3e4a40] h-5 w-5" />
          <input 
            className="w-full pl-12 pr-4 py-3 bg-white border border-[#bdcabd] rounded-xl focus:outline-none focus:border-[#006d3d] focus:ring-1 focus:ring-[#006d3d] text-sm text-[#191c1e] placeholder:text-[#6e7a6f] transition-colors h-12" 
            placeholder="পণ্য খুঁজুন..." 
            type="text"
            value={productQuery}
            onChange={(e) => setProductQuery(e.target.value)}
          />
        </div>

        {/* Categories Pills */}
        <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full font-semibold text-xs transition-all flex-shrink-0 h-10 flex items-center justify-center cursor-pointer select-none ${
                  isActive 
                    ? 'bg-[#2da968] text-white shadow-sm' 
                    : 'bg-[#eceef0] text-[#3e4a40] hover:bg-[#e0e3e5]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Product List */}
      <section className="flex flex-col gap-4">
        {filteredProducts.map((product) => {
          const qty = cart[product.id] || 0;
          return (
            <div 
              key={product.id}
              className="bg-[#ffffff] border border-[#bdcabd] rounded-2xl p-3 flex gap-3 shadow-sm h-32 items-center hover:border-[#2da968] transition-colors"
            >
              {/* Product Thumbnail */}
              <div className="w-24 h-24 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0 border border-[#e0e3e5] flex items-center justify-center relative">
                <img 
                  alt={product.name} 
                  className="w-full h-full object-cover" 
                  src={product.image}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Product Info & Controls */}
              <div className="flex-grow flex flex-col justify-between h-24 py-1">
                <div>
                  <h3 className="font-bold text-[14px] text-[#191c1e] line-clamp-2 leading-snug">{product.name}</h3>
                  <p className="text-xs text-[#3e4a40] mt-1 font-medium">{product.spec}</p>
                </div>
                
                <div className="flex justify-between items-end">
                  <span className="text-xl font-bold text-[#006d3d]">{toBanglaDigits(`৳${product.price}`)}</span>
                  
                  {/* Quantity Changer */}
                  <div className="flex items-center gap-1 bg-[#eceef0] rounded-xl p-1 border border-[#bdcabd]">
                    <button 
                      onClick={() => removeFromCart(product.id)}
                      disabled={qty <= 0}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg shadow-sm transition-all active:scale-90 cursor-pointer ${
                        qty > 0 
                          ? 'bg-white text-[#3e4a40] hover:bg-[#eceef0]' 
                          : 'bg-white opacity-40 text-gray-300 pointer-events-none'
                      }`}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-[14px] text-[#191c1e]">
                      {toBanglaDigits(qty)}
                    </span>
                    <button 
                      onClick={() => addToCart(product.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#006d3d] text-white shadow-sm transition-all hover:bg-[#00522d] active:scale-90 cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center text-gray-400 text-sm">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </div>
        )}
      </section>

      {/* Sticky Order Summary Bar */}
      <div className="fixed bottom-[72px] md:bottom-0 left-0 right-0 bg-[#ffffff] border-t border-[#bdcabd] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] z-40 p-4 flex flex-col gap-3 max-w-7xl mx-auto rounded-t-2xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-semibold text-[#6e7a6f]">
              মোট আইটেম: {toBanglaDigits(totalItemCount)}টি
            </p>
            <p className="font-bold text-2xl text-[#191c1e] mt-0.5">
              মোট: {formatBanglaCurrency(totalAmount)}
            </p>
          </div>
          
          <button 
            onClick={handleConfirmOrderSubmit}
            className="h-12 bg-[#006d3d] hover:bg-[#00522d] text-white font-bold text-[15px] px-8 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
          >
            <span>অর্ডার নিশ্চিত করুন</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Custom Popup Success Animations */}
      {showOrderPlacedSuccess && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 text-center shadow-2xl max-w-sm w-full space-y-4 animate-scale-up">
            <div className="mx-auto w-16 h-16 bg-[#2da968]/20 flex items-center justify-center rounded-full text-[#006d3d]">
              <Check className="h-9 w-9 stroke-[3]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#191c1e]">অর্ডার সফল হয়েছে!</h3>
              <p className="text-xs text-[#6e7a6f]">{currentShopForOrder?.name || ''} এ নতুন অর্ডার রেকর্ড করা হয়েছে</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
