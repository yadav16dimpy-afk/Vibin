'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, HeartHandshake, IndianRupee, MessageCircle, Info, ShoppingBag } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import HeronButton from '@/components/common/HeronButton';

export default function Footer() {
  const [modalType, setModalType] = useState<string | null>(null);
  const { setIsCartOpen, cart } = useApp();

  return (
    // Bright, Airy & Clean Footer with Radiant Coral Accent Top Line
    <footer className="border-t-2 border-[#FF5738] bg-[#FFF9F6] pb-24 pt-14 md:pb-12 text-[#1E2229] antialiased relative">
      {/* Corner crosshairs in radiant peach */}
      <span className="absolute top-1 left-4 font-mono text-[9px] text-[#FF8E75]">+</span>
      <span className="absolute top-1 right-4 font-mono text-[9px] text-[#FF8E75]">+</span>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 pb-12 border-b border-[#FFD9CE]/60">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center">
              <Link href="/" className="inline-block bg-white px-3.5 py-1.5 rounded-lg border border-[#FFD9CE] shadow-sm hover:scale-105 transition">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/vibin-nav-logo.png"
                  alt="Vibin - Your Space, Your Vibe"
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </Link>
            </div>
            <p className="mt-4 font-mono text-xs leading-relaxed text-[#64748B] font-normal">
              Spatial AI reasoning & universal commerce for Indian living spaces. Built for hostels, rented flats, and compact student rooms.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-[#047857] border border-[#A7F3D0] bg-[#ECFDF5] px-3 py-1.5 w-max font-bold shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>PARTNER APIS: 100% OPERATIONAL</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#FF5738]">
              NAVIGATION // 01
            </h5>
            <ul className="mt-4 space-y-2.5 font-mono text-xs font-medium">
              <li>
                <Link href="/create" className="text-[#1E2229]/80 hover:text-[#FF5738] transition-colors">
                  Spatial AI Room Stylist
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-[#1E2229]/80 hover:text-[#FF5738] transition-colors">
                  Shop Bundles Under ₹5,000
                </Link>
              </li>
              <li>
                <Link href="/checklist" className="text-[#1E2229]/80 hover:text-[#FF5738] transition-colors">
                  Multi-Merchant Checklist
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="text-[#1E2229]/80 hover:text-[#FF5738] transition-colors flex items-center gap-1.5 text-left font-medium"
                >
                  <span>Universal Cart</span>
                  {cart.length > 0 && (
                    <span className="bg-[#FF5738] text-white px-1.5 py-0.2 font-mono text-[9px] font-bold shadow-sm">
                      {cart.length}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </div>

          {/* Supported Merchants */}
          <div>
            <h5 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#FF5738]">
              RETAILER APIS // 02
            </h5>
            <ul className="mt-4 space-y-2.5 font-mono text-xs text-[#1E2229]/90 font-medium">
              <li className="flex items-center justify-between border-b border-[#FFD9CE]/40 pb-1.5">
                <span>Amazon India</span>
                <span className="text-[9px] text-[#047857] bg-[#ECFDF5] px-2 py-0.5 border border-[#A7F3D0] font-mono font-bold">
                  LIVE API
                </span>
              </li>
              <li className="flex items-center justify-between border-b border-[#FFD9CE]/40 pb-1.5">
                <span>IKEA India</span>
                <span className="text-[9px] text-[#047857] bg-[#ECFDF5] px-2 py-0.5 border border-[#A7F3D0] font-mono font-bold">
                  LIVE API
                </span>
              </li>
              <li className="flex items-center justify-between border-b border-[#FFD9CE]/40 pb-1.5">
                <span>Myntra Home</span>
                <span className="text-[9px] text-[#047857] bg-[#ECFDF5] px-2 py-0.5 border border-[#A7F3D0] font-mono font-bold">
                  LIVE API
                </span>
              </li>
              <li className="flex items-center justify-between border-b border-[#FFD9CE]/40 pb-1.5">
                <span>Pepperfry</span>
                <span className="text-[9px] text-[#B45309] bg-[#FFFBEB] px-2 py-0.5 border border-[#FDE68A] font-mono font-bold">
                  PARTNER
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Meesho</span>
                <span className="text-[9px] text-[#B45309] bg-[#FFFBEB] px-2 py-0.5 border border-[#FDE68A] font-mono font-bold">
                  DUPES FEED
                </span>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h5 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#FF5738]">
              COMPLIANCE // 03
            </h5>
            <ul className="mt-4 space-y-2.5 font-mono text-xs font-medium">
              <li>
                <button
                  onClick={() => setModalType('privacy')}
                  className="text-[#1E2229]/80 hover:text-[#FF5738] transition-colors text-left"
                >
                  Privacy & Encryption Spec
                </button>
              </li>
              <li>
                <button
                  onClick={() => setModalType('terms')}
                  className="text-[#1E2229]/80 hover:text-[#FF5738] transition-colors text-left"
                >
                  Zero-Damage Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => setModalType('affiliate')}
                  className="text-[#1E2229]/80 hover:text-[#FF5738] transition-colors text-left"
                >
                  Universal Cart & API Notice
                </button>
              </li>
              <li>
                <button
                  onClick={() => setModalType('contact')}
                  className="text-[#1E2229]/80 hover:text-[#FF5738] transition-colors text-left"
                >
                  Contact Engineering Studio
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar in Crisp Deep Ink */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#64748B]">
          <p>© {new Date().getFullYear()} Vibin Technologies Inc. All rights reserved.</p>
          <p className="flex items-center gap-2 text-[#1E2229]/80 font-bold">
            <span>Spatial CAD & Universal Commerce</span>
            <span>•</span>
            <span className="text-[#FF5738]">Accredited Renter-Safe Protocol</span>
          </p>
        </div>
      </div>

      {/* Info Modals in Crisp White with Radiant Coral Accents */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto bg-white text-[#1E2229] p-6 shadow-2xl border-2 border-[#FF5738]">
            <span className="absolute -top-1.5 -left-1.5 h-3 w-3 border-t-2 border-l-2 border-[#FF5738]" />
            <span className="absolute -top-1.5 -right-1.5 h-3 w-3 border-t-2 border-r-2 border-[#FF5738]" />
            <span className="absolute -bottom-1.5 -left-1.5 h-3 w-3 border-b-2 border-l-2 border-[#FF5738]" />
            <span className="absolute -bottom-1.5 -right-1.5 h-3 w-3 border-b-2 border-r-2 border-[#FF5738]" />

            <div className="flex items-center justify-between pb-4 border-b border-[#FFD9CE]">
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[#FF5738]">
                {modalType === 'privacy' && 'Privacy & Encryption Spec'}
                {modalType === 'terms' && 'Zero-Damage Terms of Service'}
                {modalType === 'affiliate' && 'Universal Cart & API Notice'}
                {modalType === 'contact' && 'Contact Vibin Studio'}
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="font-mono text-xs border border-[#FFD9CE] px-2 py-1 hover:border-[#FF5738] text-[#1E2229] font-bold"
              >
                [ESC]
              </button>
            </div>

            <div className="mt-4 text-xs text-[#1E2229]/90 leading-relaxed space-y-3 font-normal">
              {modalType === 'privacy' && (
                <>
                  <p>
                    <strong className="text-[#1E2229]">1. Photo Protection:</strong> Your uploaded room photos are stored in private Supabase storage buckets with Row Level Security (RLS). They are never accessible publicly without authentication.
                  </p>
                  <p>
                    <strong className="text-[#1E2229]">2. Zero Model Training:</strong> We do not sell or feed personal room photos to public training databases.
                  </p>
                  <p>
                    <strong className="text-[#1E2229]">3. Data Deletion:</strong> You can permanently delete any uploaded image or saved makeover directly from your profile settings at any time.
                  </p>
                </>
              )}

              {modalType === 'terms' && (
                <>
                  <p>
                    <strong className="text-[#1E2229]">1. Design Concepts:</strong> Vibin provides AI spatial visualizations and shopping estimates. Physical room dimensions, wall structural limits, and electrical load capacities must be confirmed before making purchases.
                  </p>
                  <p>
                    <strong className="text-[#1E2229]">2. Landlord Guidelines:</strong> While Vibin specializes in renter-friendly, zero-drilling solutions, users are advised to verify lease conditions with their respective property owners.
                  </p>
                </>
              )}

              {modalType === 'affiliate' && (
                <>
                  <p>
                    <strong className="text-[#1E2229]">Universal Cart & Merchant API Routing:</strong> Vibin integrates with e-commerce partner merchant feeds (including Amazon India, IKEA, Myntra, and Pepperfry) to allow consolidated purchasing in a single cart.
                  </p>
                  <p>
                    Orders are securely routed to the respective partner retailers. Vibin may receive an affiliate or developer commission upon completion of eligible sales at no additional charge to the customer.
                  </p>
                </>
              )}

              {modalType === 'contact' && (
                <>
                  <p>
                    We’d love to hear your feedback on room styles, local artisan additions, or partner merchant requests.
                  </p>
                  <div className="border border-[#FFD9CE] bg-[#FFF9F6] p-3 font-mono text-xs">
                    <p className="font-semibold text-[#1E2229]">Email: support@vibin.in</p>
                    <p className="font-semibold text-[#1E2229] mt-1">Studio: Indiranagar, Bengaluru, Karnataka 560038</p>
                  </div>
                </>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="bg-[#FF5738] hover:bg-[#E64526] px-5 py-2 font-mono text-xs font-bold uppercase text-white transition shadow-glow"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
