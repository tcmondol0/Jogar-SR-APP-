/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Shop, Product, CartItem, TabType } from '../types';
import { INITIAL_SHOPS, INITIAL_PRODUCTS } from '../data';

interface AppContextType {
  shops: Shop[];
  products: Product[];
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  selectedShopId: string | null;
  setSelectedShopId: (id: string | null) => void;
  cart: { [productId: string]: number };
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  currentShopForOrder: Shop | null;
  setCurrentShopForOrder: (shop: Shop | null) => void;
  collectedMoney: number;
  setCollectedMoney: (amount: number) => void;
  routeStarted: boolean;
  setRouteStarted: (started: boolean) => void;
  gpsCheckInMap: { [shopId: string]: boolean };
  performGpsCheckIn: (shopId: string) => Promise<void>;
  confirmOrder: () => void;
  collectDuePayment: (shopId: string, amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [shops, setShops] = useState<Shop[]>(INITIAL_SHOPS);
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeTab, setActiveTab2] = useState<TabType>('home');
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [cart, setCart] = useState<{ [productId: string]: number }>({
    'p1': 2,
    'p2': 1,
    'p3': 0
  });
  const [currentShopForOrder, setCurrentShopForOrderState] = useState<Shop | null>(INITIAL_SHOPS[4]); // Defaults to Al-Madina (id 5)
  const [collectedMoney, setCollectedMoney] = useState<number>(30500);
  const [routeStarted, setRouteStarted] = useState<boolean>(false);
  const [gpsCheckInMap, setGpsCheckInMap] = useState<{ [shopId: string]: boolean }>({});

  const setActiveTab = (tab: TabType) => {
    setActiveTab2(tab);
    // When changing main tab, close active shop details screen to avoid navigation confusion
    setSelectedShopId(null);
  };

  const setCurrentShopForOrder = (shop: Shop | null) => {
    setCurrentShopForOrderState(shop);
    // Clear cart or set defaults
    if (shop) {
      setCart({
        'p1': 0,
        'p2': 0,
        'p3': 0
      });
    }
  };

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const current = prev[productId] || 0;
      if (current <= 0) return prev;
      return {
        ...prev,
        [productId]: current - 1
      };
    });
  };

  const clearCart = () => {
    setCart({
      'p1': 0,
      'p2': 0,
      'p3': 0
    });
  };

  const performGpsCheckIn = async (shopId: string) => {
    // Mimic checking in latency
    setGpsCheckInMap(prev => ({ ...prev, [shopId]: true }));
  };

  const collectDuePayment = (shopId: string, amount: number) => {
    setShops(prevShops =>
      prevShops.map(shop => {
        if (shop.id === shopId) {
          const newDue = Math.max(0, shop.dueBalance - amount);
          return {
            ...shop,
            dueBalance: newDue
          };
        }
        return shop;
      })
    );
    setCollectedMoney(prev => prev + amount);
  };

  const confirmOrder = () => {
    const activeShop = currentShopForOrder || shops[0];
    const totalCost = products.reduce((sum, p) => {
      const qty = cart[p.id] || 0;
      return sum + p.price * qty;
    }, 0);

    if (totalCost <= 0) return;

    // Create order item
    const chars = '0123456789';
    let randId = '#';
    for (let i = 0; i < 4; i++) {
       randId += chars[Math.floor(Math.random() * chars.length)];
    }

    const today = new Date();
    const monthsEnglish = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];
    // Dates can be custom formatted
    const dateFormatted = `${today.getDate()} ${monthsEnglish[today.getMonth()]} ${today.getFullYear()}`;

    const newOrderItem = {
      id: randId,
      date: dateFormatted,
      amount: totalCost,
      status: 'Pending' as const
    };

    setShops(prevShops =>
      prevShops.map(shop => {
        if (shop.id === activeShop.id) {
          return {
            ...shop,
            visited: true,
            orderHistory: [newOrderItem, ...shop.orderHistory]
          };
        }
        return shop;
      })
    );

    // Dynamic order placement also counts in route visited shops & stats
    clearCart();
    setActiveTab('home');
  };

  return (
    <AppContext.Provider
      value={{
        shops,
        products,
        activeTab,
        setActiveTab,
        selectedShopId,
        setSelectedShopId,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        currentShopForOrder,
        setCurrentShopForOrder,
        collectedMoney,
        setCollectedMoney,
        routeStarted,
        setRouteStarted,
        gpsCheckInMap,
        performGpsCheckIn,
        confirmOrder,
        collectDuePayment
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
