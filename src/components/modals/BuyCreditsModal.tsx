'use client';

import React, { useState } from 'react';
import { Sparkles, Check, X, Shield, IndianRupee, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function BuyCreditsModal() {
  const { buyCreditsModalOpen, closeBuyCreditsModal, credits, addCredits } = useApp();
  const [selectedTier, setSelectedTier] = useState<'starter' | 'pass' | 'pro'>('pass');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'failed'>('idle');

  if (!buyCreditsModalOpen) return null;

  const tiers = [
    {
      id: 'starter' as const,
      name: 'Starter Pack',
      priceInr: 49,
      priceLabel: '₹49',
      makeovers: 5,
      unitPrice: '₹9.8 per makeover',
      badge: 'Quick Test',
      highlights: ['5 AI room makeovers', 'Interactive before/after slider', 'Full shopping checklist', 'WhatsApp share export'],
    },
    {
      id: 'pass' as const,
      name: 'Makeover Pass',
      priceInr: 99,
      priceLabel: '₹99',
      makeovers: 15,
      unitPrice: '₹6.6 per makeover',
      badge: 'Best Value for Renters',
      isPopular: true,
      highlights: [
        '15 AI room makeovers',
        'Compare all 10 vibe styles',
        'Budget dupes recommendation engine',
        'Export high-resolution room renders',
        'Valid for 1 full year',
      ],
    },
    {
      id: 'pro' as const,
      name: 'Vibin Pro',
      priceInr: 299,
      priceLabel: '₹299/mo',
      makeovers: 50,
      unitPrice: 'Unlimited room iterations',
      badge: 'For Apartment Owners',
      highlights: [
        '50 AI makeovers per month',
        'Priority high-speed GPU generation',
        'Custom furniture swap toggles',
        'Early access to Diwali & festive themes',
      ],
    },
  ];

  const handleSimulatedPayment = (simulateSuccess = true) => {
    setIsProcessing(true);
    setPaymentStatus('idle');

    setTimeout(() => {
      setIsProcessing(false);
      if (simulateSuccess) {
        setPaymentStatus('success');
        const count = selectedTier === 'starter' ? 5 : selectedTier === 'pass' ? 15 : 50;
        addCredits(count, selectedTier);
      } else {
        setPaymentStatus('failed');
      }
    }, 1200);
  };

  const handleReset = () => {
    setPaymentStatus('idle');
    closeBuyCreditsModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-cream-50 p-6 sm:p-8 shadow-elevated border border-cream-200">
        <button
          onClick={handleReset}
          className="absolute right-4 top-4 rounded-full p-2 text-charcoal-400 hover:bg-cream-200/60 hover:text-charcoal-700 transition"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {paymentStatus === 'idle' && (
          <>
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-terracotta-100 px-3 py-1 text-xs font-bold text-terracotta-700">
                <Sparkles className="h-3.5 w-3.5" />
                Vibin Makeover Credits
              </span>
              <h2 className="mt-2.5 text-2xl font-bold tracking-tight text-charcoal-900">
                Fuel your room transformation
              </h2>
              <p className="mt-1 text-xs text-charcoal-600">
                Current balance: <span className="font-bold text-terracotta-600">{credits} Makeover {credits === 1 ? 'Credit' : 'Credits'}</span>
              </p>
            </div>

            {/* Tiers List */}
            <div className="mt-6 space-y-3">
              {tiers.map((tier) => {
                const isSelected = selectedTier === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`relative cursor-pointer rounded-2xl border p-4 transition-all ${
                      isSelected
                        ? 'border-terracotta-500 bg-white ring-2 ring-terracotta-400 shadow-card'
                        : 'border-cream-300 bg-cream-100/60 hover:bg-white hover:border-cream-400'
                    }`}
                  >
                    {tier.badge && (
                      <span
                        className={`absolute -top-2.5 right-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          tier.isPopular
                            ? 'bg-terracotta-500 text-white shadow-sm'
                            : 'bg-cream-300 text-charcoal-800'
                        }`}
                      >
                        {tier.badge}
                      </span>
                    )}

                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border ${
                            isSelected
                              ? 'border-terracotta-500 bg-terracotta-500 text-white'
                              : 'border-charcoal-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-charcoal-900">{tier.name}</h3>
                          <p className="text-xs text-charcoal-500">{tier.unitPrice}</p>
                          <ul className="mt-2 space-y-1">
                            {tier.highlights.slice(0, 3).map((item, i) => (
                              <li key={i} className="flex items-center gap-1.5 text-[11px] text-charcoal-600">
                                <span className="text-sage-600">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xl font-extrabold text-charcoal-900">{tier.priceLabel}</span>
                        <p className="text-[10px] text-charcoal-500 font-medium">{tier.makeovers} Makeovers</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Razorpay Placeholder notice */}
            <div className="mt-5 rounded-2xl bg-cream-200/50 p-3 text-center text-[11px] text-charcoal-600">
              <span className="font-semibold text-charcoal-800">Secure Payment Gateway (UPI / Cards / NetBanking):</span>
              <p className="mt-0.5 text-charcoal-500">
                Payment backend functions connect to Razorpay. Test mode active for prototype evaluation.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handleSimulatedPayment(true)}
                disabled={isProcessing}
                className="flex-1 rounded-full bg-terracotta-500 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-terracotta-600 active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? 'Processing via UPI...' : `Proceed with ${selectedTier === 'starter' ? '₹49' : selectedTier === 'pass' ? '₹99' : '₹299'}`}
              </button>
              <button
                onClick={() => handleSimulatedPayment(false)}
                disabled={isProcessing}
                className="rounded-full border border-charcoal-300 bg-white px-4 py-3 text-xs font-semibold text-charcoal-700 hover:bg-cream-100 transition"
                title="Test simulated payment failure state"
              >
                Test Failure State
              </button>
            </div>
          </>
        )}

        {/* Payment Success State */}
        {paymentStatus === 'success' && (
          <div className="py-6 text-center animate-fade-in">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-sage-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-charcoal-900">Payment Successful! 🎉</h3>
            <p className="mt-1 text-xs text-charcoal-600">
              Credits have been added to your Vibin wallet. Your new balance is{' '}
              <span className="font-bold text-terracotta-600">{credits} Makeovers</span>.
            </p>
            <div className="mt-6">
              <button
                onClick={handleReset}
                className="w-full rounded-full bg-terracotta-500 py-3 text-sm font-semibold text-white hover:bg-terracotta-600"
              >
                Continue Designing
              </button>
            </div>
          </div>
        )}

        {/* Payment Failed State */}
        {paymentStatus === 'failed' && (
          <div className="py-6 text-center animate-fade-in">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-dustypink-100 text-dustypink-600">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-charcoal-900">Payment Unsuccessful</h3>
            <p className="mt-1 text-xs text-charcoal-600">
              The transaction was cancelled or declined. No money was charged to your UPI account.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setPaymentStatus('idle')}
                className="flex-1 rounded-full bg-terracotta-500 py-3 text-sm font-semibold text-white hover:bg-terracotta-600"
              >
                Try Again
              </button>
              <button
                onClick={handleReset}
                className="flex-1 rounded-full border border-cream-300 bg-white py-3 text-sm font-semibold text-charcoal-700 hover:bg-cream-100"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
