'use client';

import React, { useState } from 'react';
import {
  Compass,
  Layers,
  Activity,
  CheckCircle2,
  Maximize2,
  Eye,
  ShoppingBag,
  Sliders,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import HeronButton from '@/components/common/HeronButton';
import { MOCK_PRODUCTS } from '@/data/mockProducts';

export default function SpatialBlueprintInspector() {
  const { addToCart, setIsCartOpen, showToast } = useApp();
  const [viewMode, setViewMode] = useState<'render' | 'blueprint' | 'lighting'>('blueprint');
  const [activePin, setActivePin] = useState<string | null>('pin-1');
  const [scanActive, setScanActive] = useState(true);

  const pins = [
    {
      id: 'pin-1',
      code: 'CAD // 01',
      title: '2700K Warm Perimeter Fairy Lights',
      merchant: 'Amazon India',
      priceInr: 349,
      coord: 'X: 42.8 | Y: 18.4',
      top: '22%',
      left: '46%',
      product: MOCK_PRODUCTS[1],
      specs: 'Removable 3M Clips • 12W LED • 230V AC',
    },
    {
      id: 'pin-2',
      code: 'CAD // 02',
      title: 'Washed Terracotta Linen Bedding',
      merchant: 'Myntra Home',
      priceInr: 1299,
      coord: 'X: 58.1 | Y: 68.2',
      top: '68%',
      left: '56%',
      product: MOCK_PRODUCTS[0],
      specs: '100% Breathable Cotton • Fits Standard Hostel Cot',
    },
    {
      id: 'pin-3',
      code: 'CAD // 03',
      title: 'Braided Natural Jute Floor Mat',
      merchant: 'IKEA India',
      priceInr: 1199,
      coord: 'X: 28.5 | Y: 84.1',
      top: '84%',
      left: '34%',
      product: MOCK_PRODUCTS[4],
      specs: 'Non-Slip Eco Backing • Protects Chipped Vitrified Tiles',
    },
  ];

  const handleAddAll = () => {
    pins.forEach((p) => {
      addToCart(p.product);
    });
    setIsCartOpen(true);
    showToast('All 3 spatial makeover items added to Universal Cart! 🛒', 'success');
  };

  return (
    // Bright Crisp Pure White & Sunlit Peach Framing
    <div className="relative border-2 border-[#FFD9CE] bg-white shadow-card">
      {/* Corner Brackets in Radiant Coral #FF5738 */}
      <div className="absolute -top-1.5 -left-1.5 h-3 w-3 border-t-2 border-l-2 border-[#FF5738]" />
      <div className="absolute -top-1.5 -right-1.5 h-3 w-3 border-t-2 border-r-2 border-[#FF5738]" />
      <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 border-b-2 border-l-2 border-[#FF5738]" />
      <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 border-b-2 border-r-2 border-[#FF5738]" />

      {/* Top Header Bar in Sunlit Peach #FFF9F5 */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#FFD9CE] bg-[#FFF9F5] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-[#1E2229]">
            <span className="h-2 w-2 rounded-full bg-[#FF5738] animate-pulse" />
            <span className="text-[#FF5738]">VIBIN // SPATIAL ENGINE VIEWPORT</span>
          </div>
          <span className="hidden sm:inline font-mono text-[10px] text-[#FFBBAA]">|</span>
          <span className="hidden sm:inline font-mono text-[10px] text-[#64748B] uppercase tracking-wider font-bold">
            SCALE: 1:25 • ROOM ID: VIB-IN-9842
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 border border-[#FFD9CE] bg-white p-0.5 shadow-sm">
          <button
            onClick={() => setViewMode('blueprint')}
            className={`px-3 py-1 font-mono text-[10px] uppercase font-bold transition-all ${
              viewMode === 'blueprint'
                ? 'bg-[#FF5738] text-white shadow-sm'
                : 'text-[#1E2229] hover:bg-[#FFF0EB]'
            }`}
          >
            Blueprint CAD
          </button>
          <button
            onClick={() => setViewMode('render')}
            className={`px-3 py-1 font-mono text-[10px] uppercase font-bold transition-all ${
              viewMode === 'render'
                ? 'bg-[#FF5738] text-white shadow-sm'
                : 'text-[#1E2229] hover:bg-[#FFF0EB]'
            }`}
          >
            Rendered Room
          </button>
          <button
            onClick={() => setViewMode('lighting')}
            className={`px-3 py-1 font-mono text-[10px] uppercase font-bold transition-all ${
              viewMode === 'lighting'
                ? 'bg-[#FF5738] text-white shadow-sm'
                : 'text-[#1E2229] hover:bg-[#FFF0EB]'
            }`}
          >
            2700K Lux Matrix
          </button>
        </div>
      </div>

      {/* Main Viewport Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#FFD9CE]">
        {/* Canvas Area (Cols 8) in Bright High-Clarity View */}
        <div className="lg:col-span-8 relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#FFF9F5]">
          {/* 1. Underlying Room Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80"
            alt="Spatial Makeover Blueprint Canvas"
            className={`h-full w-full object-cover transition-all duration-500 ${
              viewMode === 'blueprint'
                ? 'filter grayscale contrast-[130%] brightness-105 opacity-90'
                : viewMode === 'lighting'
                ? 'filter sepia-[40%] hue-rotate-[330deg] brightness-110 contrast-110'
                : 'filter brightness-100'
            }`}
          />

          {/* Blueprint Technical CAD Overlays in Radiant Coral #FF5738 */}
          {viewMode === 'blueprint' && (
            <div className="absolute inset-0 pointer-events-none bg-blueprint-grid opacity-50">
              {/* Architectural Dimension Lines */}
              <div className="absolute top-6 left-12 right-12 flex items-center justify-between border-t-2 border-dashed border-[#FF5738] pt-1">
                <span className="font-mono text-[9px] text-[#FF5738] font-bold">◄ 0.00m (WALL-A)</span>
                <span className="font-mono text-[9px] text-[#1E2229] bg-white/95 px-2 py-0.5 border border-[#FF5738] font-extrabold shadow-sm">
                  CLEARANCE SPAN: 3.84m (12&apos;-7&quot;)
                </span>
                <span className="font-mono text-[9px] text-[#FF5738] font-bold">(DOOR-B) 3.84m ►</span>
              </div>

              {/* Vertical Dimension Line */}
              <div className="absolute left-6 top-16 bottom-16 flex flex-col justify-between border-l-2 border-dashed border-[#FF5738] pl-1">
                <span className="font-mono text-[9px] text-[#FF5738] font-bold">▲ 0.00m</span>
                <span className="font-mono text-[9px] text-[#1E2229] bg-white/95 px-2 py-0.5 border border-[#FF5738] -rotate-90 origin-left font-extrabold shadow-sm">
                  3.40m DEPTH
                </span>
                <span className="font-mono text-[9px] text-[#FF5738] font-bold">▼ 3.40m</span>
              </div>

              {/* Center Crosshair Target */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 border-2 border-[#FF5738]/60 rounded-full flex items-center justify-center">
                <div className="h-full w-[1.5px] bg-[#FF5738]/50" />
                <div className="w-full h-[1.5px] bg-[#FF5738]/50 absolute" />
              </div>
            </div>
          )}

          {/* Lighting Lux Cone */}
          {viewMode === 'lighting' && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-[#FFB703]/30 via-[#FF5738]/15 to-transparent blur-2xl" />
              <div className="absolute bottom-6 left-6 rounded-lg bg-white/95 px-3 py-1.5 font-mono text-[10px] text-[#1E2229] border border-[#FFB703] shadow-md font-bold">
                LUX MEASUREMENT: 2700K Warm Ambient • Glare Reduction: -84%
              </div>
            </div>
          )}

          {/* Scanline Effect in Radiant Coral */}
          {scanActive && <div className="blueprint-scanline" />}

          {/* Interactive Pins */}
          {pins.map((pin) => {
            const isSelected = activePin === pin.id;
            return (
              <div
                key={pin.id}
                style={{ top: pin.top, left: pin.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                onClick={() => setActivePin(pin.id)}
              >
                {/* Ping Beacon in Radiant Coral */}
                <span className="absolute -inset-1 rounded-full bg-[#FF5738] opacity-80 animate-ping" />

                {/* Marker Button */}
                <div
                  className={`relative flex h-7 w-7 items-center justify-center font-mono text-[10px] font-bold transition-all shadow-md ${
                    isSelected
                      ? 'bg-[#FF5738] text-white border-2 border-white scale-115'
                      : 'bg-white text-[#1E2229] border-2 border-[#FF5738] hover:scale-105'
                  }`}
                >
                  {pin.id.slice(-1)}
                </div>

                {/* Popover Bubble */}
                <div
                  className={`absolute bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap border-2 bg-white p-3 shadow-2xl transition-all pointer-events-auto ${
                    isSelected
                      ? 'opacity-100 scale-100 border-[#FF5738] z-30'
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 pb-1 border-b border-[#FFD9CE]">
                    <span className="font-mono text-[9px] font-bold text-[#FF5738]">{pin.code}</span>
                    <span className="font-mono text-[9px] text-[#64748B] font-bold">{pin.merchant}</span>
                  </div>
                  <p className="mt-1 font-mono text-xs font-bold text-[#1E2229]">{pin.title}</p>
                  <div className="mt-1.5 flex items-center justify-between gap-3">
                    <span className="font-mono text-xs font-extrabold text-[#1E2229]">₹{pin.priceInr}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(pin.product);
                      }}
                      className="rounded-none bg-[#FF5738] px-2.5 py-1 font-mono text-[10px] font-bold text-white hover:bg-[#E64526] transition shadow-sm"
                    >
                      + Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Bottom Coordinate Bar in Bright Clean White */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-white/95 px-4 py-2 font-mono text-[10px] text-[#1E2229] border border-[#FFD9CE] shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-3 font-bold">
              <span className="text-[#FF5738]">STATUS: NON-DESTRUCTIVE PASS</span>
              <span className="text-[#FFBBAA]">•</span>
              <span className="text-[#047857] bg-[#ECFDF5] px-2 py-0.5 border border-[#A7F3D0]">
                DRILL RISK: 0.0%
              </span>
            </div>
            <button
              onClick={() => setScanActive(!scanActive)}
              className="text-[#64748B] hover:text-[#FF5738] underline font-bold"
            >
              Scan: {scanActive ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Telemetry & Compliance Inspector Panel (Cols 4) in Sunlit Peach #FFF9F5 */}
        <div className="lg:col-span-4 p-5 sm:p-6 bg-[#FFF9F5] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#FFD9CE] pb-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#FF5738]">
                Spatial Audit & Spec ✦
              </span>
              <span className="font-mono text-[10px] font-bold text-[#047857] bg-[#ECFDF5] px-2.5 py-0.5 border border-[#A7F3D0]">
                VERIFIED 100%
              </span>
            </div>

            {/* Spec Attributes Table */}
            <div className="mt-4 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#FFD9CE]/60 pb-1.5">
                <span className="text-[#64748B] text-[11px]">Room Classification</span>
                <span className="font-bold text-[#1E2229]">Hostel / Rental Flat</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#FFD9CE]/60 pb-1.5">
                <span className="text-[#64748B] text-[11px]">Wall Penetration</span>
                <span className="font-bold text-[#047857]">0.0 mm (Adhesive Only)</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#FFD9CE]/60 pb-1.5">
                <span className="text-[#64748B] text-[11px]">Flooring Preservation</span>
                <span className="font-bold text-[#1E2229]">100% Non-Abrasive Jute</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#FFD9CE]/60 pb-1.5">
                <span className="text-[#64748B] text-[11px]">Merchant Fulfillment</span>
                <span className="font-bold text-[#FF5738]">Amazon • IKEA • Myntra</span>
              </div>
            </div>

            {/* Active Item Inspector Highlight in Crisp Pure White */}
            {activePin && (
              <div className="mt-5 rounded-xl border-2 border-[#FFD9CE] bg-white p-3.5 shadow-sm">
                {(() => {
                  const curr = pins.find((p) => p.id === activePin) || pins[0];
                  return (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] font-bold text-[#FF5738]">
                          {curr.code} • {curr.merchant}
                        </span>
                        <span className="font-mono text-[9px] text-[#64748B]">{curr.coord}</span>
                      </div>
                      <h4 className="mt-1 text-xs font-bold text-[#1E2229]">{curr.title}</h4>
                      <p className="mt-1 font-mono text-[10px] text-[#64748B] leading-tight">
                        {curr.specs}
                      </p>
                      <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#FFD9CE]/60">
                        <span className="font-mono text-sm font-extrabold text-[#1E2229]">
                          ₹{curr.priceInr.toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => addToCart(curr.product)}
                          className="font-mono text-[10px] font-bold uppercase tracking-wider bg-[#FF5738] text-white px-3 py-1 hover:bg-[#E64526] transition shadow-sm"
                        >
                          + Add to Cart
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Bottom Consolidated Cart Action */}
          <div className="mt-6 pt-4 border-t border-[#FFD9CE]">
            <div className="flex items-center justify-between mb-3 font-mono">
              <span className="text-xs text-[#64748B] font-bold">Staged Total (3 items):</span>
              <span className="text-base font-extrabold text-[#FF5738]">₹2,847</span>
            </div>

            <HeronButton
              onClick={handleAddAll}
              variant="brand"
              className="w-full text-center"
            >
              Add Staged Makeover to Cart
            </HeronButton>
          </div>
        </div>
      </div>
    </div>
  );
}
