'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, Bookmark, ShoppingBag, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { savedItems, projects } = useApp();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      icon: Home,
    },
    {
      id: 'create',
      label: 'Create',
      href: '/create',
      icon: Sparkles,
      isSpecial: true,
    },
    {
      id: 'saved',
      label: 'Saved',
      href: '/saved',
      icon: Bookmark,
      badge: projects.length > 0 ? projects.length : undefined,
    },
    {
      id: 'shop',
      label: 'Shop',
      href: '/shop',
      icon: ShoppingBag,
      badge: savedItems.length > 0 ? savedItems.length : undefined,
    },
    {
      id: 'profile',
      label: 'Profile',
      href: '/profile',
      icon: User,
    },
  ];

  return (
    // Luminous Pure White Glass Bar with Radiant Coral Accents
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#FFE8DE] bg-white/95 backdrop-blur-lg pb-[env(safe-area-inset-bottom,0px)] md:hidden transition-all shadow-[0_-4px_25px_rgba(255,87,56,0.08)]"
    >
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isSpecial) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group relative -top-3 flex flex-col items-center focus:outline-none"
                aria-label="Create Room Makeover"
              >
                <div
                  className={`flex h-13 w-13 items-center justify-center rounded-full shadow-lg transition-all duration-200 group-active:scale-95 overflow-hidden p-2.5 ${
                    isActive
                      ? 'bg-[#FFF2EC] ring-4 ring-[#FF5738]'
                      : 'bg-white border-2 border-[#FF5738] shadow-[#FF5738]/20 hover:brightness-105'
                  }`}
                  style={{ width: '52px', height: '52px' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/vibin-mark.png"
                    alt="Create Makeover"
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="mt-1 text-[11px] font-bold text-[#FF5738]">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 px-3 transition-colors ${
                isActive
                  ? 'text-[#FF5738] font-bold'
                  : 'text-[#4A5568] hover:text-[#1E2229]'
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#FF5738] px-1 text-[9px] font-bold text-white shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`mt-1 text-[11px] ${isActive ? 'font-bold' : 'font-normal'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 h-1 w-4 rounded-full bg-[#FF5738]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
