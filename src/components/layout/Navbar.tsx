'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, ArrowUpRight, User, Coins, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import HeronButton from '@/components/common/HeronButton';

export default function Navbar() {
  const pathname = usePathname();
  const { user, isLoggedIn, openLoginModal, credits, openBuyCreditsModal, cart, setIsCartOpen } = useApp();

  const navLinks = [
    { href: '/', label: 'Overview' },
    { href: '/create', label: 'Spatial AI Stylist' },
    { href: '/checklist', label: 'Multi-Store Checklist' },
    { href: '/shop', label: 'Curated Bundles' },
    { href: '/saved', label: 'Saved Makeovers' },
  ];

  return (
    <header className="glass-nav sticky top-0 z-40 w-full transition-all duration-300">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
        {/* Brand Identity / Official Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="group flex items-center gap-3 py-1" aria-label="Vibin — Your Space, Your Vibe">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/vibin-nav-logo.png"
              alt="Vibin - Your Space, Your Vibe"
              className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Technical Telemetry Badge in Warm Peach & Mint */}
          <div className="hidden lg:flex items-center gap-2 border border-[#FFD9CE] bg-[#FFF5F2] px-2.5 py-1 font-mono text-[10px] text-[#FF5738] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>SYS: SPATIAL CAD v2.4</span>
          </div>
        </div>

        {/* Minimalist Desktop Navigation Links (Deep Ink with Radiant Coral #FF5738 Active Indicator) */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-xs uppercase tracking-wider transition-colors duration-200 ${
                  isActive
                    ? 'font-bold text-[#FF5738] border-b-2 border-[#FF5738] pb-0.5'
                    : 'font-semibold text-[#1E2229]/80 hover:text-[#FF5738]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Suite: Cart, Credits & Start Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Universal Multi-Merchant Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 border border-[#FFD9CE] bg-white px-3 py-1.5 font-mono text-xs text-[#1E2229] transition-all duration-200 hover:border-[#FF5738] hover:bg-[#FFF9F5] shadow-sm"
            aria-label="Open Universal Cart"
          >
            <ShoppingBag className="h-3.5 w-3.5 stroke-[2] text-[#FF5738]" />
            <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-wider font-bold">Cart</span>
            {cart.length > 0 && (
              <span className="flex h-4 min-w-[16px] items-center justify-center bg-[#FF5738] px-1 font-mono text-[9px] font-bold text-white shadow-sm">
                {cart.length}
              </span>
            )}
          </button>

          {/* Credits Counter Pill (Warm Sunny Yellow Glow) */}
          <button
            onClick={openBuyCreditsModal}
            className="hidden sm:flex items-center gap-1.5 border border-[#FDE68A] bg-[#FFFBEB] px-3 py-1.5 font-mono text-[11px] text-[#B45309] font-bold hover:bg-[#FEF3C7] transition shadow-sm"
            title="Makeover Credits Remaining"
          >
            <Coins className="h-3 w-3 text-[#D97706]" />
            <span>{credits} {credits === 1 ? 'Credit' : 'Credits'}</span>
          </button>

          {/* Heron Rolling Button CTA (Radiant Coral #FF5738) */}
          <HeronButton
            href="/create"
            variant="brand"
            className="hidden sm:inline-flex !py-2 !px-4 !text-[11px]"
          >
            Transform Room
          </HeronButton>

          {/* User Auth Avatar / Sign In */}
          {isLoggedIn ? (
            <Link
              href="/profile"
              className="flex h-8 w-8 items-center justify-center overflow-hidden border border-[#FFD9CE] bg-[#FFF5F2] text-[#1E2229] transition hover:border-[#FF5738]"
              title="My Account"
            >
              {user?.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatar_url} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <User className="h-4 w-4" />
              )}
            </Link>
          ) : (
            <button
              onClick={() => openLoginModal()}
              className="border border-[#FFD9CE] bg-white px-3 py-1.5 font-mono text-xs uppercase tracking-wider font-bold text-[#1E2229] hover:border-[#FF5738] hover:bg-[#FFF9F5] transition shadow-sm"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
