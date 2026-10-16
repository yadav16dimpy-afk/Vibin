'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Star,
  ArrowRight,
  Sparkles,
  Heart,
  Search,
  Check,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MOCK_PRODUCTS, ProductItem } from '@/data/mockProducts';

interface NexCartProductShowcaseProps {
  selectedCategory?: string;
}

export default function NexCartProductShowcase({
  selectedCategory,
}: NexCartProductShowcaseProps) {
  const { addToCart, setIsCartOpen, showToast, cart } = useApp();
  const [activeTab, setActiveTab] = useState<'bestseller' | 'new' | 'viewed'>('bestseller');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Signature item from the hero floating card (Pink Velvet Ottoman / Reading Table)
  const heroFloatingItem =
    MOCK_PRODUCTS.find((p) => p.id === 'prod-ottoman-seat') || MOCK_PRODUCTS[0];

  // Curated showcase products matching the reference grid
  const showcaseProducts = [
    MOCK_PRODUCTS.find((p) => p.id === 'prod-ottoman-seat') || MOCK_PRODUCTS[0],
    MOCK_PRODUCTS.find((p) => p.id === 'prod-office-chair') || MOCK_PRODUCTS[1],
    MOCK_PRODUCTS.find((p) => p.id === 'prod-office-table') || MOCK_PRODUCTS[2],
    MOCK_PRODUCTS.find((p) => p.id === 'prod-pedestal-table') || MOCK_PRODUCTS[3],
    MOCK_PRODUCTS.find((p) => p.id === 'prod-mustard-armchair') || MOCK_PRODUCTS[4],
    MOCK_PRODUCTS.find((p) => p.id === 'prod-bedsheet-1') || MOCK_PRODUCTS[5],
    MOCK_PRODUCTS.find((p) => p.id === 'prod-lamp-1') || MOCK_PRODUCTS[6],
    MOCK_PRODUCTS.find((p) => p.id === 'prod-rug-1') || MOCK_PRODUCTS[7],
  ];

  const handleQuickAdd = (product: ProductItem) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    // Luminous Crisp White (#FFFFFF) Container with Deep Charcoal (#1E2229) Text
    <div className="bg-white text-[#1E2229] font-sans antialiased overflow-hidden border-t border-[#FFD9CE]">
      {/* 1. EDITORIAL HERO SECTION (BRIGHT & SUNLIT ADAPTATION) */}
      <section className="relative border-b border-[#FFD9CE]/60 bg-white pt-8 pb-16 sm:pb-24">
        {/* Subtle Topographic Dot Pattern Overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(#FF5738_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Column: Heading, Subtitle & Floating Product Card */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2">
                <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-[#FF5738] bg-[#FFF0EB] px-3 py-1 border border-[#FFD9CE] shadow-sm">
                  MEGA SALE // UPTO 75% OFF ✦
                </span>
              </div>

              <h1 className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1E2229] leading-[1.05]">
                Find Your <br />
                <span className="text-[#FF5738]">Signature</span> Seat
              </h1>

              <p className="mt-4 text-sm sm:text-base text-[#64748B] max-w-md font-normal leading-relaxed">
                Trending and best-selling furniture items and room makeover packages tailored for modern living spaces.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={() => {
                    const el = document.getElementById('nexcart-catalog');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="rounded-full bg-[#FF5738] px-8 py-3.5 text-xs font-bold text-white shadow-glow hover:bg-[#E64526] hover:scale-105 transition duration-200"
                >
                  Shop Now
                </button>

                <Link
                  href="/create"
                  className="text-xs font-bold text-[#1E2229] hover:text-[#FF5738] transition flex items-center gap-1.5"
                >
                  <span>Redesign My Room</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#FF5738]" />
                </Link>
              </div>

              {/* Floating Product Highlight Card in Crisp Pure White with Sunny Badges */}
              <div className="mt-10 max-w-sm rounded-2xl bg-white p-3.5 shadow-xl border border-[#FFD9CE] flex items-center gap-3.5 transition hover:shadow-2xl">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#FFF5F2] flex items-center justify-center p-1 border border-[#FFD9CE]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80"
                    alt="Velvet Ottoman"
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-[#FFB703]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-[#FFB703] text-[#FFB703]" />
                    ))}
                  </div>

                  <h4 className="mt-1 text-xs font-bold text-[#1E2229] line-clamp-1">
                    Wooden Kids Reading Table - HKRTH-304
                  </h4>

                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-mono text-sm font-extrabold text-[#1E2229]">
                      ₹1,890
                    </span>

                    <button
                      onClick={() => handleQuickAdd(heroFloatingItem)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF5738] text-white hover:bg-[#E64526] transition shadow-md"
                      title="Add to Universal Cart"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Luminous Radiant Terracotta Arched Cutout Panel */}
            <div className="lg:col-span-6 relative">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF5738] via-[#FF6A4D] to-[#FF8E75] p-8 sm:p-12 text-white min-h-[460px] flex items-center justify-center shadow-2xl">
                {/* Arched Oval Cutout with 3D Chair in Pure White */}
                <div className="relative aspect-[3/4] w-64 sm:w-72 overflow-hidden rounded-[140px] bg-white p-4 flex items-center justify-center shadow-2xl border-4 border-white/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80"
                    alt="Signature Seat 3D Render"
                    className="h-full w-full object-contain filter drop-shadow-2xl scale-110"
                  />
                </div>

                {/* Circular Curved Graphic Badge: Special Furniture Provide */}
                <div className="absolute top-8 left-8 sm:top-10 sm:left-10 flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full border border-dashed border-white flex items-center justify-center animate-spin-slow bg-white/10 backdrop-blur-sm">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-white font-bold">
                      SPECIAL ✦ PROVIDE
                    </span>
                  </div>
                  <span className="text-white text-xs mt-1 font-bold">↓</span>
                </div>

                {/* Floating Social Proof Badge: 12M+ Happy Customer */}
                <div className="absolute bottom-8 right-8 sm:bottom-10 sm:right-10 rounded-2xl bg-white/95 px-4 py-3 backdrop-blur-md border border-white text-[#1E2229] shadow-xl">
                  <p className="text-sm font-extrabold tracking-tight text-[#FF5738]">12M+</p>
                  <p className="text-[10px] text-[#64748B] font-bold">Happy Customer</p>
                  <div className="mt-1.5 flex -space-x-1.5">
                    {['avatar-1', 'avatar-2', 'avatar-3', 'avatar-4'].map((_, idx) => (
                      <div
                        key={idx}
                        className="h-5 w-5 rounded-full border border-white bg-[#FFD9CE] overflow-hidden"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://images.unsplash.com/photo-${
                            idx === 0
                              ? '1534528741775-53994a69daeb'
                              : idx === 1
                              ? '1507003211169-0a1dd7228f2d'
                              : idx === 2
                              ? '1517841905240-472988babdf9'
                              : '1539571696357-5a69c17a67c6'
                          }?auto=format&fit=crop&w=100&q=80`}
                          alt="Customer"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPLORE OUR COLLECTIONS: BENTO CATEGORY GRID (Sunlit Warm White Background) */}
      <section className="py-16 sm:py-24 border-b border-[#FFD9CE]/60 bg-[#FFF9F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1E2229]">
              Explore Our Collections
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed font-normal">
              Browse our wide range of furniture & makeover decor categories, carefully designed to bring comfort, style, and functionality to your home.
            </p>

            <div className="mt-4">
              <span className="inline-block rounded-full bg-[#FF5738] px-4 py-1.5 text-xs font-bold text-white shadow-sm">
                All Categories ✦
              </span>
            </div>
          </div>

          {/* Bento Category Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Bento Card 1: Bed Room Furniture */}
            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-[#FFD9CE] transition hover:shadow-xl hover:border-[#FF5738] flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#1E2229]">Bed Room Furniture</h3>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF5738] text-[10px] font-bold text-white shadow-sm">
                    12
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-[#64748B]">Trending or Best-Selling</p>
              </div>

              <div className="mt-4 relative h-28 w-full flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=400&q=80"
                  alt="Bed Room Furniture"
                  className="max-h-24 object-contain transition-transform group-hover:scale-110"
                />
              </div>
            </div>

            {/* Bento Card 2: Office Chair Furniture */}
            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-[#FFD9CE] transition hover:shadow-xl hover:border-[#FF5738] flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#1E2229]">Office Chair Furniture</h3>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFB703] text-[10px] font-bold text-white shadow-sm">
                    15
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-[#64748B]">Ergonomic Task Seating</p>
              </div>

              <div className="mt-4 relative h-28 w-full flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1580481077198-c84a7e2b109e?auto=format&fit=crop&w=400&q=80"
                  alt="Office Chair Furniture"
                  className="max-h-24 object-contain transition-transform group-hover:scale-110"
                />
              </div>
            </div>

            {/* Bento Card 3: Office Table Furniture */}
            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-[#FFD9CE] transition hover:shadow-xl hover:border-[#FF5738] flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#1E2229]">Office Table Furniture</h3>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#10B981] text-[10px] font-bold text-white shadow-sm">
                    18
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-[#64748B]">Compact Nightstands & Desks</p>
              </div>

              <div className="mt-4 relative h-28 w-full flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=400&q=80"
                  alt="Office Table Furniture"
                  className="max-h-24 object-contain transition-transform group-hover:scale-110"
                />
              </div>
            </div>

            {/* Bento Card 4: Lamp & Table Furniture */}
            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-[#FFD9CE] transition hover:shadow-xl hover:border-[#FF5738] flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#1E2229]">Lamp & Table Furniture</h3>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF5738] text-[10px] font-bold text-white shadow-sm">
                    8
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-[#64748B]">Warm Diffused Lighting</p>
              </div>

              <div className="mt-4 relative h-28 w-full flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80"
                  alt="Lamp & Table Furniture"
                  className="max-h-24 object-contain transition-transform group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATALOG GRID + "WHAT MAKES US DIFFERENT" (Crisp White Background) */}
      <section id="nexcart-catalog" className="py-16 sm:py-24 border-b border-[#FFD9CE]/60 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 4-Column Catalog Grid (Cols 8) */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#FFD9CE]">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#FF5738] font-bold">
                    CURATED MAKEOVER PIECES
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight text-[#1E2229]">
                    Product Collection
                  </h2>
                </div>
                <span className="font-mono text-xs text-[#64748B] font-bold">
                  {showcaseProducts.length} Items Available
                </span>
              </div>

              {/* 4-Column Product Grid in Crisp Pure White Cards */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {showcaseProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex flex-col justify-between rounded-xl bg-white p-3 border border-[#FFD9CE] transition hover:shadow-lg hover:border-[#FF5738]"
                  >
                    <div>
                      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#FFF9F5] p-2 flex items-center justify-center mb-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="flex items-center gap-1 text-[#FFB703]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-2.5 w-2.5 fill-[#FFB703] text-[#FFB703]" />
                        ))}
                      </div>

                      <h4 className="mt-1 text-xs font-bold text-[#1E2229] line-clamp-2">
                        {prod.name}
                      </h4>

                      <span className="mt-0.5 block font-mono text-[9px] text-[#64748B]">
                        {prod.merchant}
                      </span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#FFD9CE]/60 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#1E2229]">
                        ₹{prod.estimatedPriceInr.toLocaleString('en-IN')}
                      </span>

                      <button
                        onClick={() => handleQuickAdd(prod)}
                        className="rounded-full bg-[#FF5738] px-2.5 py-1 text-[10px] font-bold text-white hover:bg-[#E64526] transition shadow-sm"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right "What Makes Us Different?" Stats Card (Bright, Sunlit White & Peach) */}
            <div className="lg:col-span-4">
              <div className="rounded-3xl bg-gradient-to-br from-[#FFF5F2] via-white to-[#FFF9F5] border-2 border-[#FFD9CE] p-6 text-[#1E2229] shadow-card flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#FF5738] font-bold">
                    OUR VALUE PROMISE ✦
                  </span>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-[#1E2229]">What Makes Us Different?</h3>
                  <p className="mt-2 text-xs text-[#64748B] leading-relaxed font-normal">
                    We believe that quality furniture should be stylish, durable, and affordable. With our focus on craftsmanship, modern design, and customer satisfaction, we bring you the best selection to transform your space effortlessly.
                  </p>

                  {/* Dual Stat Metrics in Bright Coral & Sunny Gold */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white p-4 border border-[#FFD9CE] shadow-sm">
                      <span className="font-mono text-[9px] uppercase text-[#FF5738] font-bold">Happy Customers</span>
                      <p className="mt-1 text-xl font-extrabold text-[#FF5738]">₹50L+</p>
                      <span className="text-[10px] text-[#64748B] font-medium">Saved in deposits</span>
                    </div>

                    <div className="rounded-2xl bg-white p-4 border border-[#FDE68A] shadow-sm">
                      <span className="font-mono text-[9px] uppercase text-[#D97706] font-bold">Renter-Safe Products</span>
                      <p className="mt-1 text-xl font-extrabold text-[#D97706]">8k+</p>
                      <span className="text-[10px] text-[#64748B] font-medium">0.0mm wall drilling</span>
                    </div>
                  </div>
                </div>

                {/* Framed Living Room Photo from Reference */}
                <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl border-2 border-[#FFD9CE] shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
                    alt="Living Room with yellow cushions and lamp"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "TRUSTED BY THOUSANDS" REVIEWS & PROMOTIONAL BANNER */}
      <section className="py-16 sm:py-24 border-b border-[#FFD9CE]/60 bg-[#FFF9F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-[#1E2229]">
              Trusted by Thousands of Happy Customers
            </h2>
          </div>

          {/* Testimonial Cards in Crisp Pure White */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: 'Sam Nguyen',
                role: 'Hostel Resident, Koramangala',
                text: '“Our customers love the quality, comfort, and design of our furniture. See what they say about their experience with us!”',
              },
              {
                name: 'Priya Sharma',
                role: 'PG Resident, HSR Layout',
                text: '“Transformed my dull metal cot and grey tiles for ₹4,200 without touching landlord walls. The 1-cart checkout was seamless!”',
              },
              {
                name: 'Rohan Verma',
                role: '1BHK Renter, Indiranagar',
                text: '“The 2D Planner 5D view allowed me to verify dimensions before buying. Everything arrived safely from Amazon & IKEA.”',
              },
            ].map((review, i) => (
              <div key={i} className="rounded-2xl border border-[#FFD9CE] bg-white p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#FF5738] flex items-center justify-center font-bold text-white shadow-sm">
                    {review.name[0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1E2229]">{review.name}</h4>
                    <p className="text-[10px] text-[#64748B]">{review.role}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1 text-[#FFB703]">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="h-3 w-3 fill-[#FFB703] text-[#FFB703]" />
                  ))}
                  <span className="ml-2 font-mono text-[9px] text-[#64748B] font-bold">5.0 Review on Trustpilot</span>
                </div>

                <p className="mt-3 text-xs text-[#1E2229]/80 leading-relaxed font-normal">
                  {review.text}
                </p>
              </div>
            ))}
          </div>

          {/* Promotional Banner in Luminous Radiant Coral */}
          <div className="mt-14 relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF5738] via-[#FF6E52] to-[#FFA07A] p-8 sm:p-12 text-white shadow-glow flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="font-mono text-xs uppercase tracking-wider text-white font-extrabold bg-white/20 px-3 py-1 rounded-full">
                Weekend Discount ✦
              </span>
              <h3 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight text-white">
                Handcrafted Furniture <br />
                and Home Decor
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/90 leading-relaxed">
                Elevate your living spaces with responsibly sourced teak wood, brass lighting, and organic Indian linen.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="rounded-full bg-white px-6 py-2.5 text-xs font-extrabold text-[#FF5738] shadow-md hover:bg-[#FFF5F2] hover:scale-105 transition"
                >
                  Shop Now
                </button>
              </div>
            </div>

            {/* Armchair visual */}
            <div className="h-44 sm:h-52 w-auto shrink-0 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80"
                alt="Yellow Armchair"
                className="h-full w-auto object-contain filter drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
