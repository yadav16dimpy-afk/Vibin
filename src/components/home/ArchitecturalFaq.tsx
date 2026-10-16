'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function ArchitecturalFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      index: '01',
      question: 'How does Vibin protect my landlord security deposit?',
      answer:
        'Vibin’s spatial algorithm operates strictly under a "Zero Drilling / Zero Damage" protocol. Every suggested lamp is freestanding, every textile fits existing furniture dimensions, and all wall art relies on lab-tested 3M command adhesive strips that peel off cleanly without chipping paint. Your security deposit remains 100% intact.',
    },
    {
      index: '02',
      question: 'How does the 1-cart multi-merchant API bridge work?',
      answer:
        'Instead of making you juggle separate checkout tabs across Amazon, IKEA, Myntra, and Pepperfry, Vibin acts as a unified commerce orchestrator. You add items across multiple merchants into Vibin’s Universal Cart, make one payment in INR, and our API webhook bridge programmatically places and dispatches orders directly into partner retailer fulfillment systems with official retailer warranties.',
    },
    {
      index: '03',
      question: 'Will the AI makeover replace or distort my actual room photo?',
      answer:
        'No. Generic image generators throw away your photo and produce impossible architectural fantasy renders. Vibin’s Spatial AI Agent preserves your exact ceramic floor tiles, door frames, aluminum window sliders, and bed frame, layering non-destructive warm lighting, textiles, and decor on top of your actual space.',
    },
    {
      index: '04',
      question: 'Can I set a strict budget under ₹5,000 for my hostel or PG?',
      answer:
        'Yes! Over 68% of Vibin transformations are engineered for budgets under ₹5,000. Our engine selects high-impact budget swaps—such as replacing blinding fluorescent tubelights with 2700K perimeter fairy lights (₹349) and covering cold floor tiles with natural braided jute mats (₹1,199).',
    },
    {
      index: '05',
      question: 'How can I share the makeover and budget with my flatmates or parents?',
      answer:
        'With 1 click, Vibin exports a formatted WhatsApp card or 9:16 Instagram Story graphic detailing the before-and-after spatial render, total estimated cost in INR, and an itemized shopping checklist so everyone can approve before any purchase is placed.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    // Bright Pure White Container with Radiant Peach Border
    <div className="border-2 border-[#FFD9CE] bg-white shadow-sm">
      {/* Top Header in Sunlit Peach #FFF9F5 */}
      <div className="border-b border-[#FFD9CE] bg-[#FFF9F5] px-6 py-4 flex items-center justify-between">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#FF5738]">
          TECHNICAL SPEC & FAQ ARCHIVE ✦
        </span>
        <span className="font-mono text-[10px] font-bold text-[#FF5738] bg-white px-2.5 py-0.5 border border-[#FFD9CE]">
          INDEX: 05 ARTICLES
        </span>
      </div>

      {/* Accordion Items */}
      <div className="divide-y divide-[#FFD9CE]/60">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="group transition-colors">
              <button
                onClick={() => toggle(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left transition hover:bg-[#FFF9F5]"
              >
                <div className="flex items-center gap-4 sm:gap-6 pr-4">
                  <span
                    className={`font-mono text-xs font-bold transition-colors ${
                      isOpen ? 'text-[#FF5738]' : 'text-[#FFBBAA] group-hover:text-[#FF5738]'
                    }`}
                  >
                    {faq.index} //
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#1E2229] tracking-tight group-hover:text-[#FF5738] transition">
                    {faq.question}
                  </h3>
                </div>

                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center border transition-all duration-300 ${
                    isOpen
                      ? 'border-[#FF5738] bg-[#FF5738] text-white rotate-45 shadow-sm'
                      : 'border-[#FFD9CE] text-[#FF5738] bg-[#FFF9F5] group-hover:border-[#FF5738]'
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#1E2229]/90 leading-relaxed font-normal border-t border-dashed border-[#FFD9CE] bg-[#FFF9F5]/60">
                  <div className="max-w-3xl pl-6 sm:pl-10 border-l-2 border-[#FF5738] py-1 font-sans">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
