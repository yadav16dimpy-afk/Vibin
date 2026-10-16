'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Layers,
  Wand2,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Building2,
  Sliders,
  Maximize2,
  Eye,
  Check,
  IndianRupee,
  MessageCircle,
  Compass,
  Cpu,
} from 'lucide-react';
import BeforeAfterSlider from '@/components/common/BeforeAfterSlider';
import { MOCK_MAKEOVERS } from '@/data/mockMakeovers';
import WhatsAppShareModal from '@/components/modals/WhatsAppShareModal';
import { useApp } from '@/context/AppContext';
import HeronButton from '@/components/common/HeronButton';
import SpatialBlueprintInspector from '@/components/home/SpatialBlueprintInspector';
import ArchitecturalTelemetryMarquee from '@/components/home/ArchitecturalTelemetryMarquee';
import ArchitecturalFaq from '@/components/home/ArchitecturalFaq';
import NexCartProductShowcase from '@/components/planner5d/NexCartProductShowcase';

export default function LandingPage() {
  const { openBuyCreditsModal, setIsCartOpen, cart } = useApp();
  const [activeMakeoverIndex, setActiveMakeoverIndex] = useState(0);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const activeMakeover = MOCK_MAKEOVERS[activeMakeoverIndex];

  return (
    // Luminous Pure White Canvas with Razor-Sharp Deep Ink (#1E2229) & Radiant Coral (#FF5738)
    <div className="flex flex-col bg-white text-[#1E2229] antialiased selection:bg-[#FF5738] selection:text-white overflow-x-hidden">
      {/* 1. HERO SECTION: ARCHITECTURAL STUDIO HERO */}
      <section className="relative border-b border-[#FFE8DE] bg-blueprint-grid pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top Status & Telemetry Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#FFE8DE] pb-5 mb-10 sm:mb-14">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-[#FF5738]">[01/05] //</span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#1E2229] font-bold">
                Works inside your living space
              </span>
            </div>

            <div className="flex items-center gap-6 font-mono text-[11px] text-[#4A5568]">
              <span className="flex items-center gap-1.5 font-semibold text-[#10B981]">
                <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                ACCREDITED NON-DESTRUCTIVE
              </span>
              <span className="hidden sm:inline text-stone-300">•</span>
              <span className="hidden sm:inline">SPEC: 2026 RELEASE</span>
            </div>
          </div>

          {/* Hero Typography & CTAs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              {/* Brand Emblem & Subhead */}
              <div className="mb-6 flex items-center gap-3.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/vibin-mark.png"
                  alt="Vibin House Emblem"
                  className="h-14 w-14 sm:h-16 sm:w-16 object-contain border border-[#FFE8DE] bg-[#FFF9F5] p-1.5 shadow-sm rounded-xl"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#FF5738] bg-[#FFF2EC] px-2 py-0.5 rounded border border-[#FFD8C9]">
                      VIBIN SPATIAL STUDIO
                    </span>
                    <span className="text-[10px] text-[#FF5738]/50 font-mono">•</span>
                    <span className="font-mono text-[10px] text-[#4A5568] uppercase font-semibold">INDIA EDITION</span>
                  </div>
                  <p className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#1E2229] mt-0.5">
                    Your room. Your vibe. Your budget.
                  </p>
                </div>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-[#1E2229] leading-[1.03]">
                Make your room <br className="hidden sm:inline" />
                <span className="text-[#FF5738]">feel like you.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base sm:text-lg text-[#4A5568] leading-relaxed font-normal">
                Upload your actual space. Vibin’s spatial agent observes your layout, spots problems, and stages non-destructive fixes as you design. When you approve, it consolidates checkout across Amazon, IKEA, and Myntra—all without drilling a single hole.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <HeronButton
                href="/create"
                variant="brand"
                className="w-full text-center shadow-lg shadow-[#FF5738]/20"
              >
                Redesign My Room
              </HeronButton>

              <HeronButton
                href="#spatial-inspector"
                variant="outline"
                className="w-full text-center"
              >
                Explore CAD Viewport
              </HeronButton>
            </div>
          </div>

          {/* Embedded CAD Blueprint Spatial Inspector */}
          <div id="spatial-inspector" className="mt-14 sm:mt-18">
            <SpatialBlueprintInspector />
          </div>
        </div>
      </section>

      {/* 2. CONTINUOUS TELEMETRY MARQUEE */}
      <ArchitecturalTelemetryMarquee />

      {/* 3. CORE INNOVATION: NON-DESTRUCTIVE SPATIAL CAD ENGINE */}
      <section className="py-20 sm:py-28 border-b border-[#FFE8DE] bg-[#FFF9F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-[#FF5738] uppercase tracking-widest">
                <span>[02/05] // SPATIAL REASONING ENGINE</span>
              </div>

              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tighter text-[#1E2229] leading-tight">
                Transforms your actual photo. <br />
                Never replaces it with fantasy.
              </h2>

              <p className="mt-4 text-sm sm:text-base text-[#4A5568] leading-relaxed font-normal">
                Generic generative AI throws away your photo and invents impossible architectural models. Vibin operates natively inside your room: it identifies your existing floor tiles, sliding aluminum windows, and metal hostel cots, keeping them untouched while layering non-destructive ambient lighting and smart decor.
              </p>

              {/* Technical Comparison Points */}
              <div className="mt-8 space-y-4 border-t border-[#FFE8DE] pt-6 font-mono">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold text-[#FF5738] mt-0.5">01 //</span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E2229]">
                      Hard Infrastructure Lock
                    </h4>
                    <p className="mt-0.5 text-xs text-[#4A5568] font-sans font-normal">
                      Vitrified tiles, granite countertops, and landlord wall paint are preserved at 100% fidelity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold text-[#FF5738] mt-0.5">02 //</span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E2229]">
                      Independent Layer Toggles
                    </h4>
                    <p className="mt-0.5 text-xs text-[#4A5568] font-sans font-normal">
                      Adjust 2700K ambient lighting, organic washed bedding, and jute floor mats separately.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold text-[#FF5738] mt-0.5">03 //</span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E2229]">
                      Zero Drilling Verification
                    </h4>
                    <p className="mt-0.5 text-xs text-[#4A5568] font-sans font-normal">
                      Every suggested accessory uses heavy-duty command strips or freestanding fixtures.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <HeronButton href="/create" variant="brand">
                  Test On Your Actual Room
                </HeronButton>
              </div>
            </div>

            {/* Visual Comparison Graphic in Pure White & Coral */}
            <div className="lg:col-span-7">
              <div className="border border-[#FFE8DE] bg-white p-4 sm:p-6 shadow-xl rounded-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-[#FFE8DE] font-mono text-[10px]">
                  <span className="font-bold text-[#1E2229]">ARCHITECTURE COMPARISON MATRIX</span>
                  <span className="text-[#FF5738] font-bold">VIBIN vs GENERIC AI</span>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Generic AI Fail Box */}
                  <div className="border border-stone-200 bg-stone-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-200 font-mono text-[10px]">
                      <span className="text-stone-700 font-bold">GENERIC AI TOOLS</span>
                      <span className="text-rose-500 font-bold">✕ FAILS</span>
                    </div>
                    <ul className="mt-3 space-y-2 font-mono text-[11px] text-stone-600">
                      <li>• Erases your uploaded photo</li>
                      <li>• Invents non-existent windows</li>
                      <li>• Impossible luxury furniture</li>
                      <li>• Cannot buy products in India</li>
                      <li>• Violates landlord rental lease</li>
                    </ul>
                  </div>

                  {/* Vibin Spatial Engine Box */}
                  <div className="border-2 border-[#FF5738] bg-[#FFF9F5] p-4 shadow-md rounded-xl ring-2 ring-[#FF5738]/10">
                    <div className="flex items-center justify-between pb-2 border-b border-[#FFE8DE] font-mono text-[10px]">
                      <span className="text-[#1E2229] font-bold">VIBIN SPATIAL ENGINE</span>
                      <span className="text-[#10B981] font-bold">✓ ACCREDITED</span>
                    </div>
                    <ul className="mt-3 space-y-2 font-mono text-[11px] text-[#1E2229]">
                      <li>• Retains your exact room layout</li>
                      <li>• Preserves tiles & cot geometry</li>
                      <li>• 100% renter friendly (no drilling)</li>
                      <li>• Exact prices in ₹ with live APIs</li>
                      <li>• 1-click consolidated checkout</li>
                    </ul>
                  </div>
                </div>

                {/* Coordinate HUD footer */}
                <div className="mt-4 pt-3 border-t border-[#FFE8DE] flex items-center justify-between font-mono text-[10px] text-[#4A5568]">
                  <span>ANALYSIS VECTOR: BLR-HOSTEL-04</span>
                  <span className="text-[#10B981] font-bold">DEPOSIT IMPACT: ₹0.00 RISK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. UNIVERSAL MULTI-MERCHANT CART & API BRIDGE */}
      <section className="py-20 sm:py-28 border-b border-[#FFE8DE] bg-blueprint-grid">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-[#FF5738] uppercase tracking-widest">
              <span>[03/05] // COMMERCE BRIDGE</span>
            </div>

            <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tighter text-[#1E2229] leading-tight">
              One cart. One checkout. <br />
              Dispatched across partner APIs.
            </h2>

            <p className="mt-4 text-base text-[#4A5568] leading-relaxed font-normal">
              Instead of opening 5 separate browser tabs and repeatedly typing your delivery address, Vibin acts as a programmatic commerce bridge. Place a single consolidated order across Amazon India, IKEA, Myntra, and Pepperfry—we handle routing and tracking automatically.
            </p>
          </div>

          {/* 3-Step Rigid Architectural Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative border border-[#FFE8DE] bg-white p-6 shadow-sm hover:shadow-md transition rounded-2xl flex flex-col justify-between">
              <span className="absolute top-2 left-3 font-mono text-xs text-[#FF5738] font-bold">+</span>
              <div>
                <span className="font-mono text-xs font-bold text-[#FF5738]">PHASE 01 //</span>
                <h3 className="mt-2 text-base font-bold text-[#1E2229]">Live Catalog Handshake</h3>
                <p className="mt-2 text-xs text-[#4A5568] leading-relaxed font-sans">
                  Synchronizes pricing, stock quantities, and delivery pin-code availability directly from partner merchant inventory feeds.
                </p>
              </div>
              <div className="mt-6 border border-[#FFE8DE] bg-[#FFF9F5] p-2.5 font-mono text-[10px] text-[#1E2229] font-medium rounded-lg">
                GET /api/merchants/catalog?region=IN
              </div>
            </div>

            <div className="relative border border-[#FFE8DE] bg-white p-6 shadow-sm hover:shadow-md transition rounded-2xl flex flex-col justify-between">
              <span className="absolute top-2 left-3 font-mono text-xs text-[#FF5738] font-bold">+</span>
              <div>
                <span className="font-mono text-xs font-bold text-[#FF5738]">PHASE 02 //</span>
                <h3 className="mt-2 text-base font-bold text-[#1E2229]">Consolidated Universal Cart</h3>
                <p className="mt-2 text-xs text-[#4A5568] leading-relaxed font-sans">
                  Combines IKEA floor lamps, Amazon string lights, and Myntra linens into a single cart. Calculate total budget in Indian Rupees.
                </p>
              </div>
              <div className="mt-6 border border-[#FFE8DE] bg-[#FFF9F5] p-2.5 font-mono text-[10px] text-[#1E2229] font-medium rounded-lg">
                POST /api/cart/consolidate
              </div>
            </div>

            <div className="relative border border-[#FFE8DE] bg-white p-6 shadow-sm hover:shadow-md transition rounded-2xl flex flex-col justify-between">
              <span className="absolute top-2 left-3 font-mono text-xs text-[#FF5738] font-bold">+</span>
              <div>
                <span className="font-mono text-xs font-bold text-[#FF5738]">PHASE 03 //</span>
                <h3 className="mt-2 text-base font-bold text-[#1E2229]">Programmatic API Dispatch</h3>
                <p className="mt-2 text-xs text-[#4A5568] leading-relaxed font-sans">
                  Upon approval, sub-orders are instantly routed to each merchant’s fulfillment webhook with individual tracking IDs.
                </p>
              </div>
              <div className="mt-6 border border-[#FFE8DE] bg-[#FFF9F5] p-2.5 font-mono text-[10px] text-[#1E2229] font-medium rounded-lg">
                DISPATCH → [Amazon, IKEA, Myntra]
              </div>
            </div>
          </div>

          {/* Interactive Cart Bar */}
          <div className="mt-8 border border-[#FFE8DE] bg-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF5738] text-white shadow-md shadow-[#FF5738]/20 font-mono text-sm font-bold">
                🛒
              </div>
              <div>
                <p className="font-mono text-xs font-bold text-[#1E2229]">TEST UNIVERSAL CART DRAWER</p>
                <p className="font-mono text-[11px] text-[#4A5568]">
                  Currently {cart.length} item{cart.length === 1 ? '' : 's'} staged across partner retailers
                </p>
              </div>
            </div>

            <HeronButton
              onClick={() => setIsCartOpen(true)}
              variant="brand"
              className="!py-2.5 !px-5"
            >
              Open Universal Cart
            </HeronButton>
          </div>
        </div>
      </section>

      {/* 5. CASE STUDIES: INTERACTIVE BEFORE & AFTER SLIDER */}
      <section id="makeovers" className="py-20 sm:py-28 border-b border-[#FFE8DE] bg-[#FFF9F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#FFE8DE]">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-[#FF5738] uppercase tracking-widest">
                <span>[04/05] // CASE STUDIES</span>
              </div>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tighter text-[#1E2229]">
                Real Indian rooms. Removable decor.
              </h2>
            </div>

            {/* Room Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {MOCK_MAKEOVERS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMakeoverIndex(idx)}
                  className={`px-3.5 py-1.5 font-mono text-xs uppercase rounded-full transition-all border ${
                    activeMakeoverIndex === idx
                      ? 'bg-[#FF5738] text-white border-[#FF5738] font-bold shadow-md shadow-[#FF5738]/20'
                      : 'border-[#FFE8DE] bg-white text-[#1E2229] hover:border-[#FF5738]'
                  }`}
                >
                  {item.title} ({item.budgetString})
                </button>
              ))}
            </div>
          </div>

          {/* Before & After Interactive Container in Crisp White */}
          <div className="mt-10 border border-[#FFE8DE] bg-white p-3 sm:p-5 relative shadow-xl rounded-2xl">
            <span className="absolute -top-1.5 -left-1.5 h-3.5 w-3.5 border-t-2 border-l-2 border-[#FF5738]" />
            <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 border-t-2 border-r-2 border-[#FF5738]" />
            <span className="absolute -bottom-1.5 -left-1.5 h-3.5 w-3.5 border-b-2 border-l-2 border-[#FF5738]" />
            <span className="absolute -bottom-1.5 -right-1.5 h-3.5 w-3.5 border-b-2 border-r-2 border-[#FF5738]" />

            <BeforeAfterSlider
              beforeImage={activeMakeover.beforeImage}
              afterImage={activeMakeover.afterImage}
              beforeLabel={`Original ${activeMakeover.roomType}`}
              afterLabel={`Vibin Spatial Render: ${activeMakeover.vibe}`}
            />

            {/* Information Bar Under Slider */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#FFE8DE]">
              <div className="font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1E2229]">{activeMakeover.vibe} Vibe</span>
                  <span className="text-[#FF5738]">•</span>
                  <span className="text-[#4A5568] font-semibold">{activeMakeover.budgetString}</span>
                  <span className="text-[#FF5738]">•</span>
                  <span className="text-[#4A5568]">{activeMakeover.location}</span>
                </div>
                <p className="mt-1 text-[#4A5568] font-sans">{activeMakeover.tagline}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShareModalOpen(true)}
                  className="border border-[#FFE8DE] bg-white px-4 py-2 font-mono text-xs uppercase tracking-wider text-[#1E2229] hover:bg-[#FFF2EC] hover:text-[#FF5738] transition rounded-lg"
                >
                  Share On WhatsApp
                </button>

                <HeronButton
                  href={`/create?prefill=${activeMakeover.id}`}
                  variant="brand"
                  className="!py-2 !px-4"
                >
                  Redesign Like This
                </HeronButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOUR CORE ARCHITECTURAL PRINCIPLES */}
      <section className="py-20 sm:py-28 border-b border-[#FFE8DE] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#FF5738]">
              FUNCTIONAL LIFESTYLE ARCHITECTURE
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tighter text-[#1E2229]">
              Built for real Indian living conditions.
            </h2>
            <p className="mt-3 text-sm text-[#4A5568]">
              Strict landlords, metal hostel cots, ceramic tiles, and moving every 11 months. Every suggestion is practical and portable.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative border border-[#FFE8DE] bg-[#FFF9F5] p-6 flex flex-col justify-between rounded-2xl hover:border-[#FF5738] hover:shadow-md transition">
              <span className="absolute top-2 left-3 font-mono text-xs text-[#FF5738] font-bold">+</span>
              <div>
                <span className="font-mono text-xs font-bold text-[#FF5738]">01 // DEPOSIT SAFE</span>
                <h3 className="mt-3 text-base font-bold text-[#1E2229]">Zero Drilling Protocol</h3>
                <p className="mt-2 text-xs text-[#4A5568] leading-relaxed">
                  Uses heavy-duty command adhesive strips, freestanding floor lamps, and tension rods that leave zero marks on landlord walls.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#FFE8DE] font-mono text-[10px] text-[#10B981] font-bold">
                ✓ 100% Security Deposit Protected
              </div>
            </div>

            <div className="relative border border-[#FFE8DE] bg-[#FFF9F5] p-6 flex flex-col justify-between rounded-2xl hover:border-[#FF5738] hover:shadow-md transition">
              <span className="absolute top-2 left-3 font-mono text-xs text-[#FF5738] font-bold">+</span>
              <div>
                <span className="font-mono text-xs font-bold text-[#FF5738]">02 // BUDGET DUPES</span>
                <h3 className="mt-3 text-base font-bold text-[#1E2229]">Makeovers Under ₹5,000</h3>
                <p className="mt-2 text-xs text-[#4A5568] leading-relaxed">
                  High-impact budget swaps: 2700K fairy lights replace harsh tubelights, jute mats conceal chipped tiles, linen covers upgrade old cots.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#FFE8DE] font-mono text-[10px] text-[#FF5738] font-bold">
                ✓ Affordable Luxury Dupes
              </div>
            </div>

            <div className="relative border border-[#FFE8DE] bg-[#FFF9F5] p-6 flex flex-col justify-between rounded-2xl hover:border-[#FF5738] hover:shadow-md transition">
              <span className="absolute top-2 left-3 font-mono text-xs text-[#FF5738] font-bold">+</span>
              <div>
                <span className="font-mono text-xs font-bold text-[#FF5738]">03 // REAL LAYOUTS</span>
                <h3 className="mt-3 text-base font-bold text-[#1E2229]">Indian Flat Layouts</h3>
                <p className="mt-2 text-xs text-[#4A5568] leading-relaxed">
                  Trained on real Indian homes: understands sliding aluminum window frames, overhead ceiling fans, and compact student study nooks.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#FFE8DE] font-mono text-[10px] text-[#1E2229] font-bold">
                ✓ Tailored for PGs & 1BHKs
              </div>
            </div>

            <div className="relative border border-[#FFE8DE] bg-[#FFF9F5] p-6 flex flex-col justify-between rounded-2xl hover:border-[#FF5738] hover:shadow-md transition">
              <span className="absolute top-2 left-3 font-mono text-xs text-[#FF5738] font-bold">+</span>
              <div>
                <span className="font-mono text-xs font-bold text-[#FF5738]">04 // COMMERCE</span>
                <h3 className="mt-3 text-base font-bold text-[#1E2229]">WhatsApp Spec Sheet</h3>
                <p className="mt-2 text-xs text-[#4A5568] leading-relaxed">
                  Instantly export formatted transformation cards with exact item budgets to flatmates, roommates, or parents for 1-tap consensus.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#FFE8DE] font-mono text-[10px] text-[#10B981] font-bold">
                ✓ 1-Tap WhatsApp Cards
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEXCART EDITORIAL FURNITURE & MAKEOVER COLLECTION */}
      <NexCartProductShowcase />

      {/* 8. ARCHITECTURAL TECHNICAL FAQ */}
      <section className="py-20 sm:py-28 border-b border-[#FFE8DE] bg-[#FFF9F5]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#FF5738]">
              [05/05] // ARCHITECTURAL FAQ
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tighter text-[#1E2229]">
              Questions & Technical Specifications.
            </h2>
          </div>

          <ArchitecturalFaq />
        </div>
      </section>

      {/* 9. FINAL CALLOUT IN BLUEPRINT GRID */}
      <section className="py-20 sm:py-32 bg-blueprint-grid bg-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF5738] font-bold bg-[#FFF2EC] px-3 py-1 rounded-full border border-[#FFD8C9]">
            START YOUR ROOM AUDIT
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tighter text-[#1E2229]">
            See your room’s next vibe.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#4A5568] max-w-lg mx-auto">
            Take a photo of your bedroom, hostel cot, or living area. Get an instant non-destructive styling concept and shopping checklist.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <HeronButton
              href="/create"
              variant="brand"
              className="!py-4 !px-8 shadow-xl shadow-[#FF5738]/20"
            >
              Redesign My Room Now
            </HeronButton>

            <HeronButton
              href="/onboarding"
              variant="outline"
              className="!py-4 !px-8"
            >
              Take 1-Min Style Quiz
            </HeronButton>
          </div>
        </div>
      </section>

      {/* WhatsApp Share Modal */}
      <WhatsAppShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        styleName={activeMakeover.vibe}
        budgetString={activeMakeover.budgetString}
        totalInr={activeMakeover.budgetInr}
        items={[
          { title: '2700K Warm String Lights', priceInr: 349 },
          { title: 'Terracotta Cotton Bedsheet Set', priceInr: 1299 },
          { title: 'Braided Jute Floor Accent Mat', priceInr: 1199 },
          { title: 'Sansevieria Indoor Plant', priceInr: 499 },
          { title: 'Bamboo Desk Organizer', priceInr: 549 },
        ]}
      />
    </div>
  );
}
