/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shop, Product } from './types';

export const INITIAL_SHOPS: Shop[] = [
  {
    id: '1',
    name: 'বিসমিল্লাহ স্টোর',
    owner: 'মোঃ রহিম উদ্দিন',
    phone: '০১৭০০-০০০০০০',
    address: 'মিরপুর-১০, ঢাকা',
    type: 'মুদি দোকান',
    distance: '১.২ কিমি',
    visited: true,
    lastOrderSum: 5400,
    dueBalance: 12500,
    orderHistory: [
      { id: '#1042', date: '২৪ অক্টোবর ২০২৩', amount: 5400, status: 'Delivered' },
      { id: '#1015', date: '২০ অক্টোবর ২০২৩', amount: 8200, status: 'Pending' },
      { id: '#0988', date: '১৫ অক্টোবর ২০২৩', amount: 3100, status: 'Delivered' }
    ]
  },
  {
    id: '2',
    name: 'মদিনা স্টোর',
    owner: 'মোঃ হাসিব রহমান',
    phone: '০১৮১২-৩৪৫৬৭৮',
    address: 'মিরপুর-১১, ঢাকা',
    type: 'মুদি দোকান',
    distance: '০.৮ কিমি',
    visited: false,
    lastOrderSum: 2200,
    dueBalance: 4500,
    orderHistory: [
      { id: '#1039', date: '২৩ অক্টোবর ২০২৩', amount: 2200, status: 'Pending' },
      { id: '#0971', date: '১২ অক্টোবর ২০২৩', amount: 1500, status: 'Delivered' }
    ]
  },
  {
    id: '3',
    name: 'ভাই ভাই ট্রেডার্স',
    owner: 'মোঃ কামাল হোসেন',
    phone: '০১৯১৫-৯৮৭৬৫৪',
    address: 'মিরপুর-১২, ঢাকা',
    type: 'মুদি দোকান',
    distance: '১.৮ কিমি',
    visited: true,
    lastOrderSum: 8500,
    dueBalance: 0,
    orderHistory: [
      { id: '#1041', date: '২৪ অক্টোবর ২০২৩', amount: 8500, status: 'Delivered' }
    ]
  },
  {
    id: '4',
    name: 'সততা স্টোর',
    owner: 'মোঃ শামসুল আলম',
    phone: '০১৬৭৮-১১২২৩৩',
    address: 'মিরপুর-১৪, ঢাকা',
    type: 'ফার্মেসি',
    distance: '২.৫ কিমি',
    visited: false,
    lastOrderSum: 1200,
    dueBalance: 2000,
    orderHistory: [
      { id: '#1040', date: '২৩ অক্টোবর ২০২৩', amount: 1200, status: 'Pending' }
    ]
  },
  {
    id: '5',
    name: 'আল-মদিনা জেনারেল স্টোর',
    owner: 'মোঃ আব্দুল কুদ্দুস',
    phone: '০১৭৫৫-৬৬৭৭৮৮',
    address: 'মিরপুর-১, ঢাকা',
    type: 'মুদি দোকান',
    distance: '০.৫ কিমি',
    visited: false,
    lastOrderSum: 5000,
    dueBalance: 15000,
    orderHistory: [
      { id: '#1011', date: '১৯ অক্টোবর ২০২৩', amount: 5000, status: 'Pending' }
    ]
  },
  {
    id: '6',
    name: 'রহমানিয়া স্টোর',
    owner: 'মোঃ আমিনুল ইসলাম',
    phone: '০১৫১১-২২৩৩৪৪',
    address: 'কাজীপাড়া, ঢাকা',
    type: 'মুদি দোকান',
    distance: '২.০ কিমি',
    visited: false,
    lastOrderSum: 8200,
    dueBalance: 6400,
    orderHistory: [
      { id: '#1025', date: '২১ অক্টোবর ২০২৩', amount: 8200, status: 'Pending' }
    ]
  },
  {
    id: '7',
    name: 'বিসমিল্লাহ ট্রেডার্স',
    owner: 'মোঃ নজরুল ইসলাম',
    phone: '০১৮৯৯-১১২২৩৩',
    address: 'শেওড়াপাড়া, ঢাকা',
    type: 'ফার্মেসি',
    distance: '১.২ কিমি',
    visited: true,
    lastOrderSum: 3500,
    dueBalance: 0,
    orderHistory: [
      { id: '#1030', date: '২২ অক্টোবর ২০২৩', amount: 3500, status: 'Delivered' }
    ]
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'অরোরা হেয়ার অয়েল',
    category: 'ব্যক্তিগত যত্ন',
    spec: '১০০ মিলি',
    price: 250,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHJkpuzduY5L8kfKI8pJJq8ubdDCj2z4VTbvuNpQctu2XcKe-wtJSH5W2Gs1VPd6opA4kltC_EBnfoiIXySQALs-MQzD53K53Y6ILOEqSFwLH2-AsVbYwiDSWP4gNVdclmc0uzENL9nyei7dZf6WXQzGddTiBYwRRHdeBcGt3SgNIYzBjKjiYsjfBowD271DteFt2YQ_R5SEhMvKf6_oNmhGaGxylswCuoUqQ9gv9dRbUEc1Eqka3fCbYp0LcNEVDLDlUWvtb5BzMe'
  },
  {
    id: 'p2',
    name: 'সুপার সাদা ডিটারজেন্ট',
    category: 'FMCG',
    spec: '৫ কেজি',
    price: 650,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByrwz6VvtPqSeTpDbY9JNQgxEgB4k4Vak0lNGF8FXJOKXrzZPtrCVVrOYExv2WLAxnhAezFPk7R0zv8uAtUR4u2WXVCfNTelrjp2x2ssaLAhi0zTKnHxxJbFdX5cAjc1fJEdbvywYFQBaJoPoST582CEUnfXMee2WOnNbamTNIwPj4Z_9_F6tNMugA6AjAMZHlWsPVw0fpLQP-Cf47Ph9-KOE55oTVu6hboVeDqecd2zNYZCdTqldLEtGIfUOwdYexS46Iq5M-dfXG'
  },
  {
    id: 'p3',
    name: 'পাওয়ারলিঙ্ক ক্যাবল',
    category: 'মোবাইল এক্সেসরিজ',
    spec: '১ পিস',
    price: 180,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAQdwRMosGkXPl1h9UL0F--BwtvsF_eNQU3Zs35pbnC7ExUbzSght4uA46IaFfamMdXqbxWaLmU9yBrwSidlOYum8ZLCm-R6DmlUdOUAHpuh7zVoDruxJAG_5zr3jAynqQr9XKb-VnKbtYoKsFbP50cLU7OTBMIEJKE9MZdHJlF3lZmr9EcMEsDwKgTX8EYoDmG5JAyB8OhJsEhXbZ-4NDLIbJCq-k0ufBCp2gE1f0zNiGtF1nxierR_8o6q9j9AEqY3t-__D9ibt5'
  }
];

export const PROFILE_PHOTO_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAox_iBtKmqe9SHrXj1wZODOu4BBHMgxaewFBVG6QrEMva8QYbmmo0J014ETcdHd_xRBZw817552_2kSyU-eh1x-uJX3vdOwpIIK-FlH8ltx3ERRFll_dPRo_1IqXDLHfQInbfGcViNtg10yrJ5ZDSzNJgRs1faBF_tvzufpfyKQFG8h0csDBNPFu2uZr-xjMEoWC_vwd_BBvRozPs57GS6Akl4drxlKvfka_WZMUUwXfFRMDn1Go7fubyf0U0iQOaAVn-_o9jGBRJ_';
export const MAP_IMAGE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD-W45CQHn4xXbuZ2cKDMSsdxeHcPWyp8wsbqykkLpt1FpWABQACcl_tXZIk6x-FGVggB2D46Xhostx_3d-xcMZ_8lTJix66Bi5NqrX2EsP50yk1Q1XQ6XfEFXZko58u5e1DOIeE2__K9BiPVY9r9ISgGuYWfknLfQuJcnUCDjtplmTlwbo9YbQwB2pl0rfDMAKWvSnnv5D5ky-G2kkXcNT3nbx9xpB04u86hquiBRhWypt0x0l5UEUCLw5b2LgyukqQislDJib6ms';

const BANGLA_DIGITS: { [key: string]: string } = {
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
  '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
};

export function toBanglaDigits(num: number | string): string {
  const str = String(num);
  let res = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    res += BANGLA_DIGITS[char] !== undefined ? BANGLA_DIGITS[char] : char;
  }
  return res;
}

export function formatBanglaCurrency(num: number): string {
  // Format Indian standard commas or general thousands spacing
  // Indian numbering: e.g. 50000 -> 50,000, 30500 -> ৩০,৫০০
  const str = num.toString();
  let lastThree = str.substring(str.length - 3);
  const otherBits = str.substring(0, str.length - 3);
  if (otherBits !== '') {
    lastThree = ',' + lastThree;
  }
  const formattedEN = otherBits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return '৳' + toBanglaDigits(formattedEN);
}
