/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User, Shield, Briefcase, MapPin, Award, CheckCircle2, TrendingUp, DollarSign } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { toBanglaDigits, formatBanglaCurrency, PROFILE_PHOTO_URL } from '../../data';

export default function ProfileScreen() {
  const { shops, collectedMoney } = useApp();

  const totalShops = shops.length;
  const visitedCount = shops.filter(s => s.visited).length;
  const remainingCount = totalShops - visitedCount;
  const targetAmount = 50000;
  const achievementPercent = Math.min(100, Math.round((collectedMoney / targetAmount) * 100));

  const stats = [
    { label: 'নিবন্ধিত দোকান', value: toBanglaDigits(totalShops), subtitle: 'মিরপুর জোন' },
    { label: 'আজকের ভিজিট', value: toBanglaDigits(visitedCount), subtitle: 'দোকান সম্পন্ন' },
    { label: 'বাকি ভিজিট', value: toBanglaDigits(remainingCount), subtitle: 'দোকান বাকি আছে' },
    { label: 'সংগ্রহ অর্জন', value: `${toBanglaDigits(achievementPercent)}%`, subtitle: 'আজকের টার্গেট' }
  ];

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* Profile Card Summary Banner */}
      <section className="bg-white rounded-2xl border border-[#bdcabd] p-6 shadow-sm flex flex-col items-center text-center space-y-3.5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 text-[#fed255] opacity-25">
          <Award className="h-16 w-16 stroke-[1.5]" />
        </div>
        
        <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-[#68dd96] shadow-md">
          <img 
            src={PROFILE_PHOTO_URL} 
            alt="Md. Rahim Uddin" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#191c1e]">মোঃ রহিম উদ্দিন</h2>
          <p className="text-xs font-semibold text-[#6e7a6f] mt-1 flex items-center justify-center gap-1">
            <Briefcase className="h-3.5 w-3.5" />
            সিনিয়র সেলস রিপ্রেজেন্টেটিভ (এস.এস.আর)
          </p>
          <p className="text-[11px] font-medium text-gray-400 mt-0.5">আইডি: #এসআর-৭৪০২৫</p>
        </div>

        <div className="flex gap-2 justify-center w-full">
          <span className="bg-[#68dd96]/15 text-[#00522d] text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Shield className="h-3 w-3" />
            ভেরিফাইড ইউজার
          </span>
          <span className="bg-[#eceef0] text-[#3e4a40] text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            মিরপুর, ঢাকা
          </span>
        </div>
      </section>

      {/* Stats Board */}
      <section className="grid grid-cols-2 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-[#bdcabd] p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-semibold text-[#6e7a6f]">{stat.label}</p>
            <p className="text-2xl font-black text-[#006d3d] mt-1.5 leading-none">{stat.value}</p>
            <p className="text-[10px] font-medium text-[#c4ccd4] mt-1 uppercase tracking-wide">{stat.subtitle}</p>
          </div>
        ))}
      </section>

      {/* Target Meter Progress */}
      <section className="bg-white rounded-2xl border border-[#bdcabd] p-5 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-[#191c1e] flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-[#006d3d]" />
            লক্ষ্য বনাম অর্জন মিটার
          </h3>
          <span className="text-xs font-bold text-[#755b00]">{toBanglaDigits(achievementPercent)}% সম্পন্ন</span>
        </div>

        <div className="space-y-2">
          {/* Progress bar container */}
          <div className="h-3.5 w-full bg-[#eceef0] rounded-full overflow-hidden">
            <div 
              style={{ width: `${achievementPercent}%` }}
              className="h-full bg-gradient-to-r from-[#2da968] to-[#006d3d] rounded-full transition-all duration-500 shadow-inner"
            ></div>
          </div>

          <div className="flex justify-between text-[11px] font-semibold text-[#6e7a6f] pt-1">
            <p>সংগৃহীত: {formatBanglaCurrency(collectedMoney)}</p>
            <p>টার্গেট: {formatBanglaCurrency(targetAmount)}</p>
          </div>
        </div>
      </section>

      {/* Weekly sales summary mock graph rendered with native SVG bars */}
      <section className="bg-white rounded-2xl border border-[#bdcabd] p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#191c1e] border-b border-[#eceef0] pb-2">গত ৭ দিনের বিক্রয় রিপোর্ট</h3>
        
        <div className="h-44 w-full flex items-end justify-between pt-4">
          {[
            { day: 'শনিবার', value: 34000, color: '#bdcabd' },
            { day: 'রবিবার', value: 41000, color: '#bdcabd' },
            { day: 'সোমবার', value: 48500, color: '#bdcabd' },
            { day: 'মঙ্গলবার', value: 29000, color: '#bdcabd' },
            { day: 'বুধবার', value: 52000, color: '#006d3d' }, // Peak or active target day color
            { day: 'বৃহস্পতিবার', value: 38000, color: '#bdcabd' },
            { day: 'শুক্রবার', value: 15000, color: '#bdcabd' }
          ].map((bar, index) => {
            const heightPercent = `${Math.round((bar.value / 60000) * 100)}%`;
            return (
              <div key={index} className="flex flex-col items-center flex-1 space-y-2.5 h-full group">
                <div className="w-full flex-grow flex items-end justify-center relative">
                  {/* Tooltip on hover */}
                  <span className="absolute -top-6 bg-gray-900/90 text-white text-[10px] px-1.5 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-20">
                    ৳{toBanglaDigits(bar.value)}
                  </span>
                  <div 
                    style={{ height: heightPercent, backgroundColor: bar.color }}
                    className="w-4 sm:w-6 rounded-t-md hover:opacity-85 transition-all duration-300"
                  ></div>
                </div>
                <span className="text-[10px] font-black text-[#6e7a6f] whitespace-nowrap overflow-hidden select-none">
                  {bar.day.substring(0, 3)}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
