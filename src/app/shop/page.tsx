'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Sparkles,
  Tag,
  Plus,
  Check,
  ExternalLink,
  Lock,
  ArrowRight,
  ShieldCheck,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SHOP_BUNDLES } from '@/data/bundles';
import { MOCK_PRODUCTS } from '@/data/mockProducts';

export default function ShopPage() {
  const { addItemToShoppingList, savedItems, addToCart, setIsCartOpen, showToast } = useApp();
  const [selectedBundleId, setSelectedBundleId] = useState<string>('under_5000');

  const activeBundle = SHOP_BUNDLES.find((b) => b.id === selectedBundleId) || SHOP_BUNDLES[0];
  const activeProducts = MOCK_PRODUCTS.filter((p) =>
    activeBundle.productIds.includes(p.id)
  );

  const handleAddBundleToCart = () => {
    activeProducts.forEach((p) => {
      addToCart(p);
    });
    setIsCartOpen(true);
    showToast(`Added entire "${activeBundle.title}" bundle to Universal Cart! 🛍️`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-ink-950 antialiased selection:bg-stone-200 selection:text-ink-950 pb-28 md:pb-16">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
                Universal Marketplace & API Hub
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl">
              Curated Decor Bundles
            </h1>
            <p className="mt-1 text-xs text-stone-500 max-w-xl">
              Pre-vetted, non-destructive decor packages. Buy all items across Amazon India, IKEA, and Myntra in a single consolidated checkout.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-ink-900 hover:bg-stone-100 transition"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Universal Cart</span>
            </button>
          </div>
        </div>

        {/* Bundle Category Selector Pills */}
        <div className="mt-6 flex overflow-x-auto pb-2 gap-2 scrollbar-none">
          {SHOP_BUNDLES.map((bundle) => {
            const isSelected = selectedBundleId === bundle.id;
            return (
              <button
                key={bundle.id}
                onClick={() => setSelectedBundleId(bundle.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-ink-950 text-white font-semibold'
                    : 'border border-stone-200 bg-white text-stone-600 hover:text-ink-950 hover:border-stone-300'
                }`}
              >
                <span>{bundle.title}</span>
                {bundle.isComingSoon && (
                  <span className="rounded-full bg-stone-200 px-1.5 py-0.2 font-mono text-[9px] text-stone-700">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Bundle Banner */}
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-900 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                  {activeBundle.badge || 'Bundle'}
                </span>
                {activeBundle.budgetCapInr && (
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Under ₹{activeBundle.budgetCapInr.toLocaleString('en-IN')} Total
                  </span>
                )}
              </div>
              <h2 className="mt-2 text-xl font-bold text-ink-950">{activeBundle.title}</h2>
              <p className="mt-0.5 text-xs text-stone-500">{activeBundle.subtitle}</p>
            </div>

            {!activeBundle.isComingSoon && (
              <button
                onClick={handleAddBundleToCart}
                className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-5 py-2.5 text-xs font-bold text-white hover:bg-ink-800 transition self-start sm:self-auto"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Buy Bundle in 1-Click</span>
              </button>
            )}
          </div>

          {/* Coming Soon state for festive / new apartment bundles */}
          {activeBundle.isComingSoon ? (
            <div className="mt-8 rounded-xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-stone-200 text-ink-900">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-ink-950">
                {activeBundle.title} is Coming Soon
              </h3>
              <p className="mt-1 text-xs text-stone-500 max-w-sm mx-auto">
                Currently connecting partner catalog feeds for authentic brass diyas, warm fairy lanterns, and marigold accents.
              </p>
            </div>
          ) : (
            /* Products Grid */
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeProducts.map((product) => {
                const isSaved = savedItems.some((item) => item.product_id === product.id);

                return (
                  <div
                    key={product.id}
                    className="flex flex-col justify-between overflow-hidden rounded-xl border border-stone-200 bg-stone-50/50 p-3.5 transition hover:border-stone-300"
                  >
                    <div>
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-white mb-3 border border-stone-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                        {product.isBudgetDupe && (
                          <span className="absolute top-2 left-2 rounded-full bg-white/95 px-2 py-0.5 font-mono text-[9px] font-bold text-ink-900 shadow-sm border border-stone-200">
                            Budget Dupe
                          </span>
                        )}
                      </div>

                      <span className="font-mono text-[9px] uppercase tracking-wider text-stone-400">
                        {product.category}
                      </span>
                      <h3 className="text-xs font-bold text-ink-950 line-clamp-2 mt-0.5">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between">
                      <div>
                        <span className="font-mono text-xs font-bold text-ink-950">
                          ₹{product.estimatedPriceInr.toLocaleString('en-IN')}
                        </span>
                        <span className="block font-mono text-[10px] text-stone-500">
                          {product.merchant}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            addToCart(product);
                            setIsCartOpen(true);
                          }}
                          className="flex items-center gap-1 rounded-full bg-ink-950 px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink-800 transition"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Cart</span>
                        </button>

                        <button
                          onClick={() => addItemToShoppingList(product)}
                          className={`flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-semibold border transition ${
                            isSaved
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                              : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-100'
                          }`}
                          title="Save to Checklist"
                        >
                          {isSaved ? <Check className="h-3 w-3" /> : <Tag className="h-3 w-3" />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Affiliate Disclosure Notice */}
        <div className="mt-8 rounded-xl bg-stone-100 p-4 border border-stone-200 text-xs text-stone-600 flex items-start gap-3">
          <Info className="h-4 w-4 text-stone-500 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-ink-950">Universal Commerce Notice:</strong> Product items are sourced via real-time merchant partner APIs. Final orders are dispatched directly to partner retailers (Amazon India, IKEA, Myntra, etc.) with original retailer warranty and return policies.
          </div>
        </div>
      </div>
    </div>
  );
}
