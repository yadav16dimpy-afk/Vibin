'use client';

import React, { useState } from 'react';
import {
  Compass,
  Layers,
  Maximize2,
  Minimize2,
  Eye,
  Sliders,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  Ruler,
  Grid,
  Info,
  ArrowRight,
  Move,
  Tag,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MOCK_PRODUCTS, ProductItem } from '@/data/mockProducts';
import BeforeAfterSlider from '@/components/common/BeforeAfterSlider';
import HeronButton from '@/components/common/HeronButton';

interface Planner5dRoomViewerProps {
  originalPhotoUrl: string;
  generatedPhotoUrl?: string;
  roomTitle?: string;
  vibeName?: string;
  onSelectItem?: (productId: string) => void;
  selectedProductId?: string | null;
}

export default function Planner5dRoomViewer({
  originalPhotoUrl,
  generatedPhotoUrl = 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80',
  roomTitle = 'Modern Indian Rental Room Makeover',
  vibeName = 'Warm Earthy',
  onSelectItem,
  selectedProductId,
}: Planner5dRoomViewerProps) {
  const { addToCart, setIsCartOpen, showToast } = useApp();
  const [viewMode, setViewMode] = useState<'2d' | '3d' | 'split'>('2d');
  const [showDimensions, setShowDimensions] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [activeItemId, setActiveItemId] = useState<string>('item-cot');

  // Interactive 2D/3D placed furniture items modeled after Planner 5D room planner tool
  const placedItems = [
    {
      id: 'item-cot',
      productId: 'prod-bedsheet-1',
      product: MOCK_PRODUCTS.find((p) => p.id === 'prod-bedsheet-1') || MOCK_PRODUCTS[0],
      name: 'Hostel Double Bed & Terracotta Linen',
      category: 'Bedding',
      dimensions: '6.5\' x 5.0\' (Queen)',
      x2d: '20%',
      y2d: '25%',
      w2d: '38%',
      h2d: '50%',
      rotation: 0,
      color: '#FF5738',
      priceInr: 1299,
      merchant: 'Myntra Home',
    },
    {
      id: 'item-desk',
      productId: 'prod-office-table',
      product: MOCK_PRODUCTS.find((p) => p.id === 'prod-office-table') || MOCK_PRODUCTS[14] || MOCK_PRODUCTS[3],
      name: 'Nordic Study Desk & Nightstand',
      category: 'Office Table',
      dimensions: '3.5\' x 2.0\'',
      x2d: '68%',
      y2d: '20%',
      w2d: '22%',
      h2d: '25%',
      rotation: 0,
      color: '#FFB703',
      priceInr: 2299,
      merchant: 'IKEA India',
    },
    {
      id: 'item-chair',
      productId: 'prod-office-chair',
      product: MOCK_PRODUCTS.find((p) => p.id === 'prod-office-chair') || MOCK_PRODUCTS[13] || MOCK_PRODUCTS[1],
      name: 'Tufted Swivel Task Chair',
      category: 'Office Chair',
      dimensions: '2.0\' x 2.0\'',
      x2d: '72%',
      y2d: '50%',
      w2d: '14%',
      h2d: '15%',
      rotation: 180,
      color: '#10B981',
      priceInr: 4499,
      merchant: 'Amazon India',
    },
    {
      id: 'item-ottoman',
      productId: 'prod-ottoman-seat',
      product: MOCK_PRODUCTS.find((p) => p.id === 'prod-ottoman-seat') || MOCK_PRODUCTS[12] || MOCK_PRODUCTS[2],
      name: 'Velvet Rose Reading Stool',
      category: 'Accent Seating',
      dimensions: '1.5\' x 1.5\'',
      x2d: '68%',
      y2d: '72%',
      w2d: '12%',
      h2d: '14%',
      rotation: 0,
      color: '#FF5738',
      priceInr: 1890,
      merchant: 'Pepperfry',
    },
    {
      id: 'item-rug',
      productId: 'prod-rug-1',
      product: MOCK_PRODUCTS.find((p) => p.id === 'prod-rug-1') || MOCK_PRODUCTS[4],
      name: 'Braided Jute Floor Mat',
      category: 'Rugs',
      dimensions: '5.0\' x 3.5\'',
      x2d: '22%',
      y2d: '72%',
      w2d: '34%',
      h2d: '20%',
      rotation: 0,
      color: '#D97706',
      priceInr: 1199,
      merchant: 'IKEA India',
    },
    {
      id: 'item-lamp',
      productId: 'prod-lights-1',
      product: MOCK_PRODUCTS.find((p) => p.id === 'prod-lights-1') || MOCK_PRODUCTS[1],
      name: '2700K Warm Perimeter Fairy Lights',
      category: 'Lighting',
      dimensions: '10m Perimeter Strip',
      x2d: '10%',
      y2d: '10%',
      w2d: '80%',
      h2d: '6%',
      rotation: 0,
      color: '#FFB703',
      priceInr: 349,
      merchant: 'Amazon India',
    },
  ];

  const currentItem = placedItems.find((i) => i.id === activeItemId) || placedItems[0];

  const handleItemClick = (item: typeof placedItems[0]) => {
    setActiveItemId(item.id);
    if (onSelectItem) {
      onSelectItem(item.productId);
    }
  };

  return (
    // Bright Pure White & Sunlit Peach Framing
    <div className="border-2 border-[#FFD9CE] bg-white shadow-card relative">
      {/* Corner Brackets in Radiant Coral #FF5738 */}
      <div className="absolute -top-1.5 -left-1.5 h-3.5 w-3.5 border-t-2 border-l-2 border-[#FF5738] z-20" />
      <div className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 border-t-2 border-r-2 border-[#FF5738] z-20" />
      <div className="absolute -bottom-1.5 -left-1.5 h-3.5 w-3.5 border-b-2 border-l-2 border-[#FF5738] z-20" />
      <div className="absolute -bottom-1.5 -right-1.5 h-3.5 w-3.5 border-b-2 border-r-2 border-[#FF5738] z-20" />

      {/* Top Planner 5D Control Toolbar in Sunlit Peach #FFF9F5 */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#FFD9CE] bg-[#FFF9F5] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#1E2229]">
            <span className="flex h-2 w-2 rounded-full bg-[#FF5738] animate-pulse" />
            <span className="text-[#FF5738]">PLANNER 5D // ROOM PLANNER TOOL ✦</span>
          </div>
          <span className="hidden sm:inline font-mono text-[10px] text-[#FFBBAA]">|</span>
          <span className="hidden sm:inline font-mono text-[10px] text-[#64748B] uppercase font-bold">
            SPAN: 12&apos;-6&quot; × 11&apos;-2&quot; (140 SQ FT) • SCALE 1:20
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 border border-[#FFD9CE] bg-white p-0.5 font-mono text-[11px] font-bold shadow-sm">
          <button
            onClick={() => setViewMode('2d')}
            className={`px-3 py-1 uppercase transition ${
              viewMode === '2d'
                ? 'bg-[#FF5738] text-white shadow-sm'
                : 'text-[#1E2229] hover:bg-[#FFF0EB]'
            }`}
          >
            2D Floor Plan
          </button>
          <button
            onClick={() => setViewMode('3d')}
            className={`px-3 py-1 uppercase transition ${
              viewMode === '3d'
                ? 'bg-[#FF5738] text-white shadow-sm'
                : 'text-[#1E2229] hover:bg-[#FFF0EB]'
            }`}
          >
            3D Spatial Render
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1 uppercase transition ${
              viewMode === 'split'
                ? 'bg-[#FF5738] text-white shadow-sm'
                : 'text-[#1E2229] hover:bg-[#FFF0EB]'
            }`}
          >
            Before / After
          </button>
        </div>

        {/* CAD Tool Options */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className={`flex items-center gap-1 border px-2.5 py-1 font-mono text-[10px] uppercase font-bold ${
              showDimensions ? 'border-[#FF5738] text-[#FF5738] bg-white shadow-sm' : 'border-[#FFD9CE] text-[#64748B] bg-white'
            }`}
            title="Toggle CAD Dimension Lines"
          >
            <Ruler className="h-3 w-3" />
            <span>Rulers: {showDimensions ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`flex items-center gap-1 border px-2.5 py-1 font-mono text-[10px] uppercase font-bold ${
              showGrid ? 'border-[#FF5738] text-[#FF5738] bg-white shadow-sm' : 'border-[#FFD9CE] text-[#64748B] bg-white'
            }`}
            title="Toggle Floorplan Grid"
          >
            <Grid className="h-3 w-3" />
            <span>Grid: {showGrid ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Viewport + Item Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#FFD9CE]">
        {/* Main Canvas Viewport (Cols 8) in Bright Pure White */}
        <div className="lg:col-span-8 relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#FFF9F5] flex items-center justify-center select-none">
          {/* VIEW 1: 2D FLOOR PLAN CAD MODE (Planner 5D Style) */}
          {viewMode === '2d' && (
            <div
              className={`relative w-[92%] h-[92%] border-4 border-[#1E2229] bg-white shadow-2xl p-4 ${
                showGrid ? 'bg-blueprint-grid' : ''
              }`}
            >
              {/* Outer Room Dimension Lines */}
              {showDimensions && (
                <>
                  {/* Top Wall Dimension: 12'-6" */}
                  <div className="absolute -top-7 left-0 right-0 flex items-center justify-between border-t-2 border-[#FF5738] text-[9px] font-mono text-[#FF5738] px-1 font-bold">
                    <span>◄ 0.00m</span>
                    <span className="bg-white px-2 py-0.5 border border-[#FF5738] text-[#1E2229] font-extrabold shadow-sm">
                      WALL-A: 3.81m (12&apos;-6&quot;)
                    </span>
                    <span>3.81m ►</span>
                  </div>

                  {/* Left Wall Dimension: 11'-2" */}
                  <div className="absolute -left-7 top-0 bottom-0 flex flex-col justify-between border-l-2 border-[#FF5738] text-[9px] font-mono text-[#FF5738] py-1 font-bold">
                    <span>▲</span>
                    <span className="bg-white px-2 py-0.5 border border-[#FF5738] -rotate-90 origin-left text-[#1E2229] font-extrabold shadow-sm">
                      WALL-B: 3.40m (11&apos;-2&quot;)
                    </span>
                    <span>▼</span>
                  </div>
                </>
              )}

              {/* Architectural Openings: Door Swing */}
              <div className="absolute bottom-0 right-6 w-16 h-1 bg-white border-t-2 border-[#1E2229] z-10 flex items-center justify-center">
                <span className="font-mono text-[8px] text-[#64748B] uppercase font-bold">Door (850mm)</span>
                {/* Arc swing */}
                <div className="absolute bottom-0 right-0 w-16 h-16 border-t border-r border-dashed border-[#FF5738] rounded-tr-full pointer-events-none" />
              </div>

              {/* Window on Top Wall */}
              <div className="absolute top-0 left-1/3 w-28 h-2 bg-[#E0F2FE] border-x-2 border-b-2 border-[#38BDF8] z-10 flex items-center justify-center">
                <span className="font-mono text-[7px] text-[#0284C7] uppercase font-extrabold">
                  Window (Aluminum Slider)
                </span>
              </div>

              {/* Interactive Placed Furniture Blocks in 2D Floor Plan */}
              {placedItems.map((item) => {
                const isSelected = activeItemId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    style={{
                      left: item.x2d,
                      top: item.y2d,
                      width: item.w2d,
                      height: item.h2d,
                    }}
                    className={`absolute flex flex-col items-center justify-center p-1.5 cursor-pointer transition-all border-2 ${
                      isSelected
                        ? 'border-[#FF5738] bg-[#FFF0EB] shadow-xl scale-102 z-20'
                        : 'border-[#1E2229] bg-white hover:bg-[#FFF9F5] shadow-sm z-10'
                    }`}
                  >
                    <span className="font-mono text-[9px] font-bold text-[#1E2229] uppercase text-center line-clamp-1">
                      {item.name}
                    </span>
                    <span className="font-mono text-[8px] text-[#64748B]">
                      {item.dimensions}
                    </span>
                    <span className="mt-1 font-mono text-[9px] font-extrabold text-[#FF5738]">
                      ₹{item.priceInr.toLocaleString('en-IN')}
                    </span>

                    {/* Checkmark Badge on Selected */}
                    {isSelected && (
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center bg-[#FF5738] text-white font-mono text-[9px] font-bold shadow-md">
                        ✓
                      </span>
                    )}
                  </div>
                );
              })}

              {/* Technical Center Orientation Compass */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2 border border-[#FFD9CE] bg-white/95 px-2.5 py-1 font-mono text-[8px] text-[#1E2229] shadow-sm font-bold">
                <span className="text-[#FF5738]">N ▲</span>
                <span className="text-[#FFBBAA]">•</span>
                <span>VITRIFIED TILE FLOORING</span>
              </div>
            </div>
          )}

          {/* VIEW 2: 3D SPATIAL RENDER MODE */}
          {viewMode === '3d' && (
            <div className="relative w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={generatedPhotoUrl}
                alt="3D Spatial Makeover Perspective"
                className="w-full h-full object-cover"
              />

              {/* 3D Hotspot Pins in Radiant Coral */}
              {placedItems.map((item) => {
                const isSelected = activeItemId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    style={{
                      top: item.y2d,
                      left: item.x2d,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                  >
                    <div
                      className={`relative flex h-7 w-7 items-center justify-center font-mono text-[10px] font-bold transition shadow-xl ${
                        isSelected
                          ? 'bg-[#FF5738] text-white border-2 border-white scale-115'
                          : 'bg-white text-[#1E2229] border-2 border-[#FF5738] hover:scale-105'
                      }`}
                    >
                      +
                    </div>
                  </div>
                );
              })}

              <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-1.5 font-mono text-[10px] text-[#1E2229] border border-[#FFD9CE] shadow-md font-bold">
                VIEW: 3D PHOTOREALISTIC SPATIAL CONCEPT • NON-DESTRUCTIVE
              </div>
            </div>
          )}

          {/* VIEW 3: BEFORE & AFTER SLIDER MODE */}
          {viewMode === 'split' && (
            <div className="w-full h-full p-4 bg-white">
              <BeforeAfterSlider
                beforeImage={originalPhotoUrl}
                afterImage={generatedPhotoUrl}
                beforeLabel="Original Room"
                afterLabel={`Vibin Spatial (${vibeName})`}
              />
            </div>
          )}
        </div>

        {/* Selected Item Planner 5D Inspector Sidebar (Cols 4) in Sunlit Peach #FFF9F5 */}
        <div className="lg:col-span-4 p-5 sm:p-6 bg-[#FFF9F5] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#FFD9CE] pb-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#FF5738]">
                FURNITURE CAD INSPECTOR ✦
              </span>
              <span className="font-mono text-[10px] font-bold text-[#FF5738] bg-white px-2.5 py-0.5 border border-[#FFD9CE]">
                {placedItems.length} ITEMS PLACED
              </span>
            </div>

            {/* Current Selected Placed Item Card in Pure White */}
            <div className="mt-4 border-2 border-[#FFD9CE] bg-white p-4 shadow-sm">
              <div className="flex gap-3.5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-[#FFD9CE] bg-[#FFF9F5] rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentItem.product.imageUrl}
                    alt={currentItem.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#FF5738] font-bold">
                    {currentItem.category} • {currentItem.merchant}
                  </span>
                  <h3 className="text-xs font-bold text-[#1E2229] mt-0.5 line-clamp-2">
                    {currentItem.name}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] text-[#64748B]">
                    CAD Footprint: {currentItem.dimensions}
                  </p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-mono text-sm font-extrabold text-[#FF5738]">
                      ₹{currentItem.priceInr.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Item Action Button in Radiant Coral #FF5738 */}
              <div className="mt-4 pt-3 border-t border-[#FFD9CE]/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    addToCart(currentItem.product);
                    setIsCartOpen(true);
                  }}
                  className="flex-1 bg-[#FF5738] py-2 text-center font-mono text-[10px] font-bold uppercase tracking-wider text-white hover:bg-[#E64526] transition shadow-sm"
                >
                  + Add Item to Cart
                </button>
              </div>
            </div>

            {/* Quick Placed Items Selector List */}
            <div className="mt-5">
              <span className="font-mono text-[10px] uppercase font-bold text-[#1E2229] tracking-wider">
                Room Layout Inventory:
              </span>
              <div className="mt-2 space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {placedItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`w-full flex items-center justify-between px-3 py-2 border font-mono text-[11px] text-left transition ${
                      activeItemId === item.id
                        ? 'border-[#FF5738] bg-white font-bold text-[#FF5738] shadow-sm'
                        : 'border-[#FFD9CE] bg-white/80 text-[#1E2229] hover:bg-white hover:border-[#FF5738]'
                    }`}
                  >
                    <span className="truncate pr-2 font-medium">{item.name}</span>
                    <span className="shrink-0 font-extrabold text-[#FF5738]">₹{item.priceInr}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Total & 1-Click All to Universal Cart */}
          <div className="mt-6 pt-4 border-t border-[#FFD9CE]">
            <div className="flex items-center justify-between mb-3 font-mono">
              <span className="text-xs text-[#64748B] font-bold">Total Room Makeover:</span>
              <span className="text-base font-extrabold text-[#FF5738]">
                ₹{placedItems.reduce((sum, i) => sum + i.priceInr, 0).toLocaleString('en-IN')}
              </span>
            </div>

            <HeronButton
              onClick={() => {
                placedItems.forEach((i) => addToCart(i.product));
                setIsCartOpen(true);
                showToast('All room layout items added to Universal Cart! 🛍️', 'success');
              }}
              variant="brand"
              className="w-full text-center"
            >
              Add Entire Layout to Cart
            </HeronButton>
          </div>
        </div>
      </div>
    </div>
  );
}
