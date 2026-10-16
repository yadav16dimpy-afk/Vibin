'use client';

import React from 'react';

export default function ArchitecturalTelemetryMarquee() {
  const telemetryItems = [
    'VIBIN SPATIAL ENGINE v2.4',
    'ZERO DRILLING CODE COMPLIANCE: 100%',
    'LIVE MERCHANT APIS: AMAZON INDIA • IKEA INDIA • MYNTRA • PEPPERFRY • MEESHO',
    '2700K WARM LIGHTING MATRIX',
    'NON-DESTRUCTIVE PASS: 0.0mm DRILL RISK',
    'CONSOLIDATED 1-CHECKOUT DISPATCH',
    'INDIAN RENTAL & HOSTEL SPEC // 2026',
    'CLIENT-SIDE STORAGE ENCRYPTION',
  ];

  const fullContent = (
    <div className="flex items-center gap-8 py-3.5 font-mono text-[11px] uppercase tracking-widest text-[#1E2229]">
      {telemetryItems.map((item, idx) => (
        <span key={idx} className="flex items-center gap-8 whitespace-nowrap">
          <span className="font-bold">{item}</span>
          <span className="text-[#FF5738] font-extrabold">///</span>
        </span>
      ))}
    </div>
  );

  return (
    // Bright Peach-White (#FFF9F5) with Radiant Coral (#FF5738) Accents
    <div className="relative border-y border-[#FFD9CE] bg-[#FFF9F5] overflow-hidden select-none">
      {/* Corner Crosshairs */}
      <span className="absolute top-0 left-2 text-[8px] font-mono text-[#FF5738]">+</span>
      <span className="absolute top-0 right-2 text-[8px] font-mono text-[#FF5738]">+</span>

      <div className="flex w-max animate-marquee">
        {fullContent}
        {fullContent}
      </div>
    </div>
  );
}
