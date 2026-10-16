'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Send,
  Eye,
  Plus,
  ShoppingBag,
  Check,
  ShieldCheck,
  Sun,
  Bed,
  Brush,
  Tag,
  Info,
  Maximize2,
  Sliders,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MOCK_PRODUCTS, ProductItem } from '@/data/mockProducts';

interface AiRoomStylistAgentProps {
  actualPhotoUrl: string;
  roomTitle?: string;
  styleName?: string;
  className?: string;
}

export default function AiRoomStylistAgent({
  actualPhotoUrl,
  roomTitle = 'Your Uploaded Room',
  styleName = 'Cozy Warmth',
  className = '',
}: AiRoomStylistAgentProps) {
  const {
    activeTransformLayers,
    toggleTransformLayer,
    stylistMessages,
    sendStylistPrompt,
    addToCart,
    showToast,
  } = useApp();

  const [inputPrompt, setInputPrompt] = useState('');
  const [activePin, setActivePin] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'transformed' | 'original' | 'split'>('transformed');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Realistic hotspot pins positioned on the user's actual room photo
  const pins = [
    {
      id: 'pin-lights',
      title: '2700K Warm Perimeter Fairy Lights',
      priceInr: 349,
      merchant: 'Amazon India',
      product: MOCK_PRODUCTS.find((p) => p.id === 'prod-lights-1') || MOCK_PRODUCTS[1],
      top: '18%',
      left: '42%',
      layer: 'warmLighting' as const,
    },
    {
      id: 'pin-bedding',
      title: 'Washed Organic Linen Bedding Set',
      priceInr: 1299,
      merchant: 'Myntra Home',
      product: MOCK_PRODUCTS.find((p) => p.id === 'prod-bedsheet-1') || MOCK_PRODUCTS[0],
      top: '64%',
      left: '52%',
      layer: 'linenBedding' as const,
    },
    {
      id: 'pin-rug',
      title: 'Natural Braided Jute Floor Mat',
      priceInr: 1199,
      merchant: 'IKEA India',
      product: MOCK_PRODUCTS.find((p) => p.id === 'prod-rug-1') || MOCK_PRODUCTS[4],
      top: '82%',
      left: '32%',
      layer: 'juteRug' as const,
    },
    {
      id: 'pin-plant',
      title: 'Indoor Snake Plant Purifier',
      priceInr: 499,
      merchant: 'Amazon India',
      product: MOCK_PRODUCTS.find((p) => p.id === 'prod-plant-1') || MOCK_PRODUCTS[8],
      top: '45%',
      left: '84%',
      layer: 'airPlants' as const,
    },
  ];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isSubmitting) return;

    const query = inputPrompt;
    setInputPrompt('');
    setIsSubmitting(true);
    try {
      await sendStylistPrompt(query);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 ${className}`}>
      {/* LEFT/TOP: ACTUAL PHOTO CANVAS WITH SMART TRANSFORMATION OVERLAYS */}
      <div className="lg:col-span-8 flex flex-col space-y-4">
        {/* Photo Viewport Controls Bar */}
        <div className="flex items-center justify-between border-b border-[#FFE8DE] pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#1E2229] font-bold">
              Live Room Canvas • Structure Preserved
            </span>
          </div>

          {/* Toggle View Mode */}
          <div className="flex items-center rounded-full border border-[#FFE8DE] bg-[#FFF9F5] p-1 text-[11px] font-semibold">
            <button
              onClick={() => setViewMode('transformed')}
              className={`rounded-full px-3.5 py-1 transition ${
                viewMode === 'transformed' ? 'bg-[#FF5738] text-white shadow-md shadow-[#FF5738]/20' : 'text-[#4A5568] hover:text-[#1E2229]'
              }`}
            >
              AI Styled Overlay
            </button>
            <button
              onClick={() => setViewMode('original')}
              className={`rounded-full px-3.5 py-1 transition ${
                viewMode === 'original' ? 'bg-white text-[#1E2229] shadow-sm' : 'text-[#4A5568] hover:text-[#1E2229]'
              }`}
            >
              Original Photo
            </button>
          </div>
        </div>

        {/* The Actual Photo with Real-Time Layer Overlays */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-[#FFE8DE] bg-[#1E2229] select-none shadow-xl">
          {/* Base Structural Layer: The Actual User Photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={actualPhotoUrl}
            alt="Your actual room"
            className="h-full w-full object-cover transition-opacity duration-300"
          />

          {/* AI TRANSFORMATION OVERLAYS (Only active in 'transformed' mode) */}
          {viewMode === 'transformed' && (
            <>
              {/* 1. Warm Lighting Gradient Layer */}
              {activeTransformLayers.warmLighting && (
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-color-burn opacity-70 transition-opacity duration-500"
                  style={{
                    background:
                      'radial-gradient(ellipse at 45% 25%, rgba(255, 183, 3, 0.45) 0%, rgba(255, 87, 56, 0.25) 45%, rgba(18, 18, 20, 0.2) 100%)',
                  }}
                />
              )}

              {/* 2. Soft Bedding Color/Texture Enhancement */}
              {activeTransformLayers.linenBedding && (
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-65 transition-opacity duration-500"
                  style={{
                    background:
                      'radial-gradient(circle at 55% 65%, rgba(255, 138, 101, 0.75) 0%, rgba(255, 87, 56, 0.4) 30%, transparent 60%)',
                  }}
                />
              )}

              {/* 3. Jute Rug Warmth over Floor Tiles */}
              {activeTransformLayers.juteRug && (
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-60 transition-opacity duration-500"
                  style={{
                    background:
                      'radial-gradient(ellipse 35% 20% at 35% 82%, rgba(246, 214, 169, 0.85) 0%, rgba(214, 163, 107, 0.4) 40%, transparent 70%)',
                  }}
                />
              )}

              {/* Interactive Hotspot Pins on the actual photo */}
              {pins.map((pin) => {
                const isSelected = activePin === pin.id;
                const isLayerActive = activeTransformLayers[pin.layer];
                if (!isLayerActive) return null;

                return (
                  <div
                    key={pin.id}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                    style={{ top: pin.top, left: pin.left }}
                  >
                    {/* Glowing Pin Marker */}
                    <button
                      onClick={() => setActivePin(isSelected ? null : pin.id)}
                      className={`group flex items-center justify-center rounded-full transition-all duration-300 ${
                        isSelected
                          ? 'h-8 w-8 bg-[#FF5738] text-white ring-4 ring-white shadow-lg scale-110'
                          : 'h-6 w-6 bg-white text-[#FF5738] hover:scale-125 shadow-lg backdrop-blur-md'
                      }`}
                      aria-label={`View ${pin.title}`}
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-[#10B981] group-hover:scale-150 transition" />
                    </button>

                    {/* Quick-view Floating Popover */}
                    {isSelected && (
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 w-60 rounded-2xl border border-[#FFE8DE] bg-white p-3.5 shadow-2xl animate-fade-in text-left">
                        <div className="flex items-center justify-between pb-1.5 border-b border-[#FFE8DE] mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF5738] font-bold">
                            {pin.merchant}
                          </span>
                          <span className="text-xs font-bold text-[#1E2229] font-mono">
                            ₹{pin.priceInr.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <h5 className="text-[11px] font-semibold text-[#1E2229] leading-snug line-clamp-2">
                          {pin.title}
                        </h5>
                        <button
                          onClick={() => {
                            addToCart(pin.product);
                            setActivePin(null);
                          }}
                          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#FF5738] py-2 text-[11px] font-semibold text-white hover:bg-[#E04426] transition shadow-md shadow-[#FF5738]/20"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Add to Universal Cart</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}

          {/* Watermark Label */}
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-[10px] font-mono text-white/90 backdrop-blur-md">
            <span>{viewMode === 'transformed' ? 'AI Transformation Layer Active' : 'Original Photo Reference'}</span>
          </div>

          <div className="absolute bottom-3 right-3 z-10 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-mono text-white/90 backdrop-blur-md">
            Walls & Flooring 100% Intact
          </div>
        </div>

        {/* Transformation Layer Toggles */}
        <div className="rounded-2xl border border-[#FFE8DE] bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#FFE8DE]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#1E2229] font-bold flex items-center gap-1.5">
              <Sliders className="h-3.5 w-3.5 text-[#FF5738]" />
              Overlaid Decor Elements (Tap to toggle on/off)
            </span>
            <span className="text-[10px] text-[#10B981] font-semibold">Non-destructive</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'warmLighting' as const, label: '2700K Warm Lighting', icon: Sun },
              { id: 'linenBedding' as const, label: 'Linen Bedding Layer', icon: Bed },
              { id: 'juteRug' as const, label: 'Jute Area Rug', icon: Layers },
              { id: 'wallAdhesives' as const, label: 'No-Drill Wall Art', icon: Brush },
              { id: 'airPlants' as const, label: 'Indoor Foliage', icon: Sparkles },
            ].map((layer) => {
              const active = activeTransformLayers[layer.id];
              const Icon = layer.icon;
              return (
                <button
                  key={layer.id}
                  onClick={() => toggleTransformLayer(layer.id)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    active
                      ? 'border border-[#FF5738] bg-[#FF5738] text-white shadow-md shadow-[#FF5738]/20'
                      : 'border border-[#FFE8DE] bg-[#FFF9F5] text-[#1E2229] hover:border-[#FF5738]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{layer.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT/BOTTOM: CONVERSATIONAL AI ROOM STYLIST AGENT */}
      <div className="lg:col-span-4 flex flex-col h-[520px] rounded-3xl border border-[#FFE8DE] bg-white shadow-xl overflow-hidden">
        {/* Agent Header */}
        <div className="flex items-center justify-between border-b border-[#FFE8DE] px-5 py-4 bg-[#FFF9F5]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF5738] text-white shadow-md shadow-[#FF5738]/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1E2229]">AI Room Stylist Agent</h4>
              <p className="text-[10px] text-[#10B981] font-mono font-semibold">Analyzing your actual room layout</p>
            </div>
          </div>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
          {stylistMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#FF5738] text-white font-medium shadow-md shadow-[#FF5738]/20'
                    : 'bg-[#FFF9F5] text-[#1E2229] border border-[#FFE8DE]'
                }`}
              >
                {msg.text}
              </div>

              {/* Agent Product Recommendation Card if suggested */}
              {msg.suggestedItem && (
                <div className="mt-2 w-[85%] rounded-2xl border border-[#FFE8DE] bg-white p-2.5 shadow-md flex items-center justify-between gap-2.5 hover:border-[#FF5738] transition">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#FFF9F5] border border-[#FFE8DE]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={msg.suggestedItem.imageUrl} alt={msg.suggestedItem.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block truncate text-[11px] font-bold text-[#1E2229]">
                      {msg.suggestedItem.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#FF5738] font-semibold">
                      ₹{msg.suggestedItem.estimatedPriceInr} • {msg.suggestedItem.merchant}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(msg.suggestedItem!)}
                    className="rounded-full bg-[#FF5738] p-2 text-white hover:bg-[#E04426] transition shadow-md shadow-[#FF5738]/20"
                    title="Add to Universal Cart"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}

          {isSubmitting && (
            <div className="flex items-center gap-1.5 text-[#FF5738] text-xs font-mono py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5738] animate-bounce" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5738] animate-bounce [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5738] animate-bounce [animation-delay:0.4s]" />
              <span className="text-[#4A5568]">Analyzing photo structure...</span>
            </div>
          )}
        </div>

        {/* Prompt Input Box */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-[#FFE8DE] bg-[#FFF9F5]">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="e.g. Make lighting softer, add a bedside rug..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              className="w-full rounded-full border border-[#FFE8DE] bg-white pl-4 pr-10 py-2.5 text-xs text-[#1E2229] placeholder:text-[#4A5568]/60 focus:border-[#FF5738] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim() || isSubmitting}
              className="absolute right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#FF5738] text-white disabled:opacity-40 transition shadow-sm"
              aria-label="Send prompt"
            >
              <Send className="h-3 w-3" />
            </button>
          </div>
          <p className="mt-1.5 px-2 text-[10px] text-[#4A5568] font-mono text-center">
            Ask AI to modify decor without altering your actual walls or tiles.
          </p>
        </form>
      </div>
    </div>
  );
}
