'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  ExternalLink,
  Plus,
  Minus,
  Check,
  Share2,
  Tag,
  Info,
  Sparkles,
  Layers,
  IndianRupee,
  ShieldCheck,
  Search,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MOCK_PRODUCTS, ProductItem } from '@/data/mockProducts';
import WhatsAppShareModal from '@/components/modals/WhatsAppShareModal';

export default function ChecklistPage() {
  const {
    savedItems,
    toggleItemCheck,
    updateItemQuantity,
    addItemToShoppingList,
    removeItemFromShoppingList,
    totalShoppingCost,
    showToast,
    addToCart,
    setIsCartOpen,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'essentials' | 'nice_to_have' | 'budget_dupes'>('essentials');
  const [similarModalProduct, setSimilarModalProduct] = useState<ProductItem | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Filter products by tab
  const filteredProducts = MOCK_PRODUCTS.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'essentials') return item.tier === 'essentials';
    if (activeTab === 'nice_to_have') return item.tier === 'nice_to_have';
    if (activeTab === 'budget_dupes') return item.isBudgetDupe;
    return true;
  });

  // Calculate items checked progress
  const totalCount = savedItems.length;
  const checkedCount = savedItems.filter((i) => i.is_checked).length;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  const handleAddAllFilteredToCart = () => {
    filteredProducts.forEach((prod) => {
      addToCart(prod);
    });
    setIsCartOpen(true);
    showToast(`Added ${filteredProducts.length} items to your Universal Cart! 🛍️`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-ink-950 antialiased selection:bg-stone-200 selection:text-ink-950 pb-28 md:pb-16">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
                Multi-Merchant Checklist & Cart Bridge
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl">
              Bring This Vibe Home
            </h1>
            <p className="mt-1 text-xs text-stone-500">
              Curated decor, lighting, and textiles. Purchase everything in one unified cart across partner stores.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-ink-900 hover:bg-stone-100 transition"
            >
              <Share2 className="h-3.5 w-3.5 text-stone-500" />
              <span>Share Checklist</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-4 py-2 text-xs font-semibold text-white hover:bg-ink-800 transition"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Universal Cart</span>
            </button>
          </div>
        </div>

        {/* Total Cost & Progress Bar Sticky Card */}
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400">
                Estimated Total Makeover Cost
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-mono text-3xl font-bold text-ink-950">
                  ₹{totalShoppingCost > 0 ? totalShoppingCost.toLocaleString('en-IN') : '8,450'}
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  ({savedItems.length} items staged)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleAddAllFilteredToCart}
                className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-5 py-2.5 text-xs font-bold text-white hover:bg-ink-800 transition"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Add Tab to Universal Cart</span>
              </button>
            </div>
          </div>

          {/* Checklist Completion Progress */}
          <div className="mt-5 pt-4 border-t border-stone-100">
            <div className="flex justify-between text-xs font-medium text-stone-600 mb-1.5 font-mono">
              <span>Arranged or in cart: {checkedCount} of {totalCount}</span>
              <span>{progressPercent}% ready</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-stone-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-ink-950 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mt-8 flex overflow-x-auto pb-2 gap-2 scrollbar-none">
          {[
            { id: 'essentials', label: 'Essentials (Core Vibe)' },
            { id: 'nice_to_have', label: 'Nice to Have' },
            { id: 'budget_dupes', label: 'Budget Dupes (Save ₹₹)' },
            { id: 'all', label: 'All Products' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-ink-950 text-white font-semibold'
                  : 'border border-stone-200 bg-white text-stone-600 hover:text-ink-950 hover:border-stone-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProducts.map((product) => {
            const savedItem = savedItems.find((item) => item.product_id === product.id);
            const isAdded = Boolean(savedItem);
            const quantity = savedItem?.quantity || 1;
            const isChecked = savedItem?.is_checked || false;

            return (
              <div
                key={product.id}
                className={`relative flex flex-col justify-between overflow-hidden rounded-xl border bg-white p-4 transition-all ${
                  isChecked
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                {/* Badges */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
                    {product.category}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {product.isBudgetDupe && (
                      <span className="rounded-full bg-stone-100 px-2 py-0.5 font-mono text-[9px] font-bold text-ink-950 border border-stone-200">
                        Budget Dupe
                      </span>
                    )}
                    <span className="font-mono text-[10px] text-stone-500">
                      {product.merchant}
                    </span>
                  </div>
                </div>

                {/* Product Info & Visual */}
                <div className="flex gap-3.5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-stone-100 border border-stone-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-bold text-ink-950 line-clamp-1">{product.name}</h3>
                    <p className="mt-0.5 text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-ink-950">
                        ₹{product.estimatedPriceInr.toLocaleString('en-IN')}
                      </span>
                      {product.dupeSavingsInr ? (
                        <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                          Save ₹{product.dupeSavingsInr}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Card Bottom Controls */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        addToCart(product);
                        setIsCartOpen(true);
                      }}
                      className="flex items-center gap-1 rounded-full bg-ink-950 px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink-800 transition"
                    >
                      <Plus className="h-3 w-3" />
                      <span>Add to Cart</span>
                    </button>

                    {savedItem ? (
                      <div className="flex items-center gap-1 rounded-full border border-stone-300 bg-stone-50 px-2 py-0.5">
                        <button
                          onClick={() => updateItemQuantity(savedItem.id, quantity - 1)}
                          className="rounded-full p-1 text-stone-500 hover:text-ink-950"
                          title="Decrease"
                        >
                          <Minus className="h-2.5 w-2.5" />
                        </button>
                        <span className="w-4 text-center font-mono text-[11px] font-bold text-ink-950">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateItemQuantity(savedItem.id, quantity + 1)}
                          className="rounded-full p-1 text-stone-500 hover:text-ink-950"
                          title="Increase"
                        >
                          <Plus className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addItemToShoppingList(product)}
                        className="rounded-full border border-stone-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
                      >
                        Save
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSimilarModalProduct(product)}
                      className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] font-medium text-stone-600 hover:text-ink-950 hover:bg-stone-50 transition"
                    >
                      Compare
                    </button>

                    {savedItem && (
                      <button
                        onClick={() => toggleItemCheck(savedItem.id)}
                        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                          isChecked
                            ? 'bg-emerald-600 text-white'
                            : 'border border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        <Check className="h-3 w-3" />
                        <span>{isChecked ? 'Ready' : 'Check'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Affiliate Disclosure Notice */}
        <div className="mt-10 rounded-xl bg-stone-100 p-4 border border-stone-200 text-xs text-stone-600 flex items-start gap-3">
          <Info className="h-4 w-4 text-stone-500 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-ink-950">Multi-Merchant Dispatch Notice:</strong> When placing an order via Vibin, sub-orders are securely dispatched directly to retailer APIs (Amazon India, IKEA, Myntra). Prices and stock availability are refreshed in real-time.
          </div>
        </div>
      </div>

      {/* View Similar Products Modal */}
      {similarModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-sm font-bold text-ink-950">Merchant Price Comparison</h3>
              <button
                onClick={() => setSimilarModalProduct(null)}
                className="rounded-full p-1 text-stone-400 hover:text-ink-950"
              >
                ✕
              </button>
            </div>

            <p className="mt-2 text-xs text-stone-500">
              Alternative partner feeds for <strong>{similarModalProduct.name}</strong>:
            </p>

            <div className="mt-4 space-y-2.5">
              {[
                { name: 'Amazon India', price: similarModalProduct.estimatedPriceInr, badge: 'Prime 1-Day' },
                { name: 'IKEA India', price: Math.round(similarModalProduct.estimatedPriceInr * 1.15), badge: 'Design Quality' },
                { name: 'Meesho', price: Math.round(similarModalProduct.estimatedPriceInr * 0.65), badge: 'Budget Dupe' },
              ].map((merchant, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 p-3"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-ink-950">{merchant.name}</span>
                    <span className="block font-mono text-[10px] text-stone-400">{merchant.badge}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-ink-950">₹{merchant.price}</span>
                    <button
                      onClick={() => {
                        addToCart({
                          productId: `${similarModalProduct.id}-${merchant.name}`,
                          name: `${similarModalProduct.name} (${merchant.name})`,
                          priceInr: merchant.price,
                          merchant: merchant.name,
                          imageUrl: similarModalProduct.imageUrl,
                          category: similarModalProduct.category,
                        });
                        setSimilarModalProduct(null);
                        setIsCartOpen(true);
                      }}
                      className="rounded-full bg-ink-950 px-3 py-1 font-mono text-[11px] font-bold text-white hover:bg-ink-800 transition"
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Share Modal */}
      <WhatsAppShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        styleName="Indian Rental Makeover"
        budgetString={`₹${totalShoppingCost.toLocaleString('en-IN')}`}
        totalInr={totalShoppingCost}
        items={filteredProducts.map((p) => ({ title: p.name, priceInr: p.estimatedPriceInr }))}
      />
    </div>
  );
}
