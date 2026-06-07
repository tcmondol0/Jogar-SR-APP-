/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OrderHistoryItem {
  id: string;
  date: string;
  amount: number;
  status: 'Delivered' | 'Pending'; // 'Delivered' (প্রদান করা হয়েছে) or 'Pending' (অপেক্ষমান)
}

export interface Shop {
  id: string;
  name: string;
  owner: string;
  phone: string;
  address: string;
  type: string; // "মুদি দোকান", "ফার্মেসি", etc.
  distance: string; // e.g. "০.৫ কিমি"
  visited: boolean;
  lastOrderSum: number;
  currentOrderSum?: number;
  dueBalance: number;
  orderHistory: OrderHistoryItem[];
}

export interface Product {
  id: string;
  name: string;
  category: 'ব্যক্তিগত যত্ন' | 'FMCG' | 'মোবাইল এক্সেসরিজ';
  spec: string;
  price: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type TabType = 'home' | 'route' | 'order' | 'profile';
