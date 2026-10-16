'use client';

import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Truck,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function UniversalCartDrawer() {
  const { cart, removeFromCart, updateCartQuantity, clearCart, cartTotal, isCartOpen, setIsCartOpen, showToast } =
    useApp();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'placing' | 'success'>('cart');
  const [address, setAddress] = useState({
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    line1: 'Flat 402, Green Glen Layout, Bellandur',
    city: 'Bengaluru',
    pincode: '560103',
  });

  const [merchantOrders, setMerchantOrders] = useState<Array<{ merchant: string; orderId: string; itemsCount: number; subtotal: number }>>([]);

  if (!isCartOpen) return null;

  // Group items by merchant for transparency
  const merchantGroups = cart.reduce((groups, item) => {
    const key = item.merchant;
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
    return groups;
  }, {} as Record<string, typeof cart>);

  const handlePlaceOrder = async () => {
    setCheckoutStep('placing');

    // Simulate multi-merchant backend dispatch
    setTimeout(() => {
      const generated = Object.keys(merchantGroups).map((merchant) => {
        const items = merchantGroups[merchant];
        const sub = items.reduce((sum, i) => sum + i.priceInr * i.quantity, 0);
        return {
          merchant,
          orderId: `VB-${merchant.substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
          itemsCount: items.length,
          subtotal: sub,
        };
      });

      setMerchantOrders(generated);
      setCheckoutStep('success');
      clearCart();
      showToast('Multi-merchant orders dispatched successfully! 🎉', 'success');
    }, 1800);
  };

  const handleClose = () => {
    setCheckoutStep('cart');
    setIsCartOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      {/* Pure White Drawer Canvas with Sunlit Peach & Radiant Coral Details */}
      <div className="relative flex h-full w-full max-w-md flex-col bg-white border-l border-[#FFE8DE] shadow-2xl">
        {/* Header in Peach #FFF9F5 */}
        <div className="flex items-center justify-between border-b border-[#FFE8DE] px-6 py-4.5 bg-[#FFF9F5]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF5738] text-white shadow-md shadow-[#FF5738]/20">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-[#1E2229]">Universal Cart</h2>
              <p className="text-[11px] text-[#4A5568] font-mono">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} • Multi-Merchant Bridge
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="rounded-full p-2 text-[#4A5568] hover:bg-[#FFE8DE] hover:text-[#1E2229] transition"
            aria-label="Close cart"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* STEP 1: CART ITEMS */}
        {checkoutStep === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5 divide-y divide-[#FFE8DE]">
              {cart.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF9F5] text-[#FF5738] border border-[#FFE8DE]">
                    <ShoppingBag className="h-6 w-6 stroke-[1.5]" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-[#1E2229]">Your cart is empty</h3>
                  <p className="mt-1 text-xs text-[#4A5568] max-w-xs mx-auto">
                    Transform your room and tap any decor piece or shopping checklist item to add them here.
                  </p>
                </div>
              ) : (
                Object.entries(merchantGroups).map(([merchant, items]) => (
                  <div key={merchant} className="py-4 first:pt-0">
                    {/* Merchant Group Label */}
                    <div className="flex items-center justify-between pb-2 mb-2">
                      <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-[#1E2229]">
                        <Building2 className="h-3 w-3 text-[#FF5738]" />
                        {merchant}
                      </span>
                      <span className="text-[10px] text-[#FF5738] font-mono font-semibold bg-[#FFF2EC] px-2 py-0.5 rounded border border-[#FFD8C9]">
                        Live API sync
                      </span>
                    </div>

                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-3 rounded-2xl bg-[#FFF9F5] border border-[#FFE8DE] p-3 shadow-sm hover:border-[#FF5738] transition"
                        >
                          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white border border-[#FFE8DE]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                          </div>

                          <div className="flex flex-1 flex-col justify-between min-w-0">
                            <div>
                              <h4 className="truncate text-xs font-semibold text-[#1E2229] leading-snug">
                                {item.name}
                              </h4>
                              <p className="text-[10px] text-[#4A5568] font-mono flex items-center gap-1 mt-0.5">
                                <Truck className="h-3 w-3 text-[#FF5738]" />
                                {item.deliveryEstimate}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                              <span className="text-xs font-bold text-[#1E2229]">
                                ₹{(item.priceInr * item.quantity).toLocaleString('en-IN')}
                              </span>

                              <div className="flex items-center gap-1 rounded-full border border-[#FFE8DE] bg-white px-2 py-0.5 shadow-sm">
                                <button
                                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                  className="p-0.5 text-[#4A5568] hover:text-[#FF5738]"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="w-4 text-center text-[11px] font-bold text-[#1E2229]">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                  className="p-0.5 text-[#4A5568] hover:text-[#FF5738]"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Footer & Summary in White */}
            {cart.length > 0 && (
              <div className="border-t border-[#FFE8DE] bg-white p-6 space-y-3">
                <div className="space-y-1.5 text-xs text-[#1E2229]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono font-semibold text-[#1E2229]">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[#4A5568]">
                    <span>Estimated Merchant Shipping</span>
                    <span className="text-[#10B981] font-semibold">FREE (Vibin Bundle)</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#FFE8DE] text-sm font-bold text-[#1E2229]">
                    <span>Total</span>
                    <span className="font-mono text-[#FF5738]">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="rounded-xl bg-[#FFF9F5] p-2.5 text-[11px] text-[#1E2229] flex items-start gap-2 border border-[#FFE8DE]">
                  <ShieldCheck className="h-4 w-4 text-[#FF5738] shrink-0 mt-0.5" />
                  <p className="leading-tight">
                    <strong>1-Click Multi-Merchant Placement:</strong> Vibin checks out your items across Amazon, IKEA & Pepperfry simultaneously.
                  </p>
                </div>

                {/* Primary CTA in Radiant Coral */}
                <button
                  onClick={() => setCheckoutStep('shipping')}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF5738] py-3.5 text-xs font-semibold tracking-wide text-white transition hover:bg-[#E04426] active:scale-[0.99] shadow-lg shadow-[#FF5738]/20"
                >
                  <span>Proceed to Delivery & Checkout</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </>
        )}

        {/* STEP 2: SHIPPING ADDRESS CONFIRMATION */}
        {checkoutStep === 'shipping' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5738] bg-[#FFF2EC] px-2 py-0.5 rounded border border-[#FFD8C9]">Step 2 of 2</span>
              <h3 className="text-base font-bold text-[#1E2229] mt-1.5">Delivery Address</h3>
              <p className="text-xs text-[#4A5568]">All merchants will fulfill deliveries to this single address.</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-[#1E2229] mb-1">Full Name</label>
                <input
                  type="text"
                  value={address.name}
                  onChange={(e) => setAddress({ ...address, name: e.target.value })}
                  className="w-full rounded-xl border border-[#FFE8DE] bg-[#FFF9F5] px-3.5 py-2.5 text-xs text-[#1E2229] focus:border-[#FF5738] focus:bg-white focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#1E2229] mb-1">Phone Number (For OTP & Delivery)</label>
                <input
                  type="text"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full rounded-xl border border-[#FFE8DE] bg-[#FFF9F5] px-3.5 py-2.5 text-xs text-[#1E2229] focus:border-[#FF5738] focus:bg-white focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#1E2229] mb-1">Street Address / PG Room / Flat No.</label>
                <input
                  type="text"
                  value={address.line1}
                  onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                  className="w-full rounded-xl border border-[#FFE8DE] bg-[#FFF9F5] px-3.5 py-2.5 text-xs text-[#1E2229] focus:border-[#FF5738] focus:bg-white focus:outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#1E2229] mb-1">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full rounded-xl border border-[#FFE8DE] bg-[#FFF9F5] px-3.5 py-2.5 text-xs text-[#1E2229] focus:border-[#FF5738] focus:bg-white focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#1E2229] mb-1">Pincode</label>
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full rounded-xl border border-[#FFE8DE] bg-[#FFF9F5] px-3.5 py-2.5 text-xs text-[#1E2229] focus:border-[#FF5738] focus:bg-white focus:outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Merchant API Dispatch breakdown */}
            <div className="rounded-2xl border border-[#FFE8DE] bg-[#FFF9F5] p-4 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E2229]">
                Automated Fulfillment Breakdown
              </span>
              {Object.entries(merchantGroups).map(([merchant, items]) => (
                <div key={merchant} className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#1E2229]">{merchant} ({items.length} items)</span>
                  <span className="font-mono text-[#FF5738] font-semibold">Dispatches via {merchant} API</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setCheckoutStep('cart')}
                className="rounded-full border border-[#FFE8DE] bg-white px-5 py-3 text-xs font-semibold text-[#1E2229] hover:bg-[#FFF9F5] transition"
              >
                Back
              </button>
              <button
                onClick={handlePlaceOrder}
                className="flex-1 rounded-full bg-[#FF5738] py-3 text-xs font-semibold text-white hover:bg-[#E04426] transition shadow-lg shadow-[#FF5738]/20"
              >
                Place Unified Order (₹{cartTotal.toLocaleString('en-IN')})
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PLACING ORDERS VIA BRIDGE */}
        {checkoutStep === 'placing' && (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF5738] text-white animate-spin shadow-xl shadow-[#FF5738]/20">
              <Sparkles className="h-8 w-8" />
            </div>
            <h3 className="mt-5 text-base font-bold text-[#1E2229]">
              Bridging Multi-Merchant Order...
            </h3>
            <p className="mt-1 text-xs text-[#4A5568] max-w-xs">
              Sending order payloads to Amazon India, IKEA, and Pepperfry fulfillment APIs simultaneously.
            </p>
          </div>
        )}

        {/* STEP 4: ORDER SUCCESS CONFIRMATION */}
        {checkoutStep === 'success' && (
          <div className="flex flex-1 flex-col justify-between p-6">
            <div className="text-center pt-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-[#10B981] border-2 border-emerald-200">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-[#1E2229]">All Orders Placed! 🎉</h3>
              <p className="mt-1 text-xs text-[#4A5568] max-w-sm mx-auto">
                Your unified payment was processed. Each partner merchant has received their order and will dispatch tracking to your SMS/WhatsApp.
              </p>

              <div className="mt-6 space-y-2.5 text-left">
                {merchantOrders.map((ord, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl border border-[#FFE8DE] bg-[#FFF9F5] p-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-[#1E2229]">{ord.merchant}</div>
                      <div className="text-[10px] font-mono text-stone-400">Order Ref: {ord.orderId}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-[#1E2229]">₹{ord.subtotal.toLocaleString('en-IN')}</div>
                      <span className="text-[9px] font-semibold text-[#10B981]">API Dispatched</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={handleClose}
                className="w-full rounded-full bg-[#FF5738] py-3.5 text-xs font-semibold text-white hover:bg-[#E04426] transition shadow-lg shadow-[#FF5738]/20"
              >
                Back to Makeovers
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
