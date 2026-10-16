'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface HeronButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'brand' | 'charcoal' | 'forest' | 'sand' | 'outline' | 'ghost';
  icon?: LucideIcon;
  showIcon?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  target?: string;
}

export default function HeronButton({
  children,
  href,
  onClick,
  variant = 'brand',
  icon: Icon = ArrowRight,
  showIcon = true,
  className = '',
  type = 'button',
  disabled = false,
  target,
}: HeronButtonProps) {
  const baseClasses =
    'btn-heron group px-6 py-3.5 text-xs font-mono uppercase tracking-wider font-bold border transition-all duration-300 rounded-none shadow-sm';

  // Bright, Radiant Color Variants:
  const variantStyles = {
    brand:
      'bg-[#FF5738] text-white border-[#FF5738] hover:bg-[#E64526] hover:border-[#1E2229] shadow-md hover:shadow-glow active:scale-[0.98]',
    primary:
      'bg-[#FF5738] text-white border-[#FF5738] hover:bg-[#E64526] hover:border-[#1E2229] shadow-md hover:shadow-glow active:scale-[0.98]',
    charcoal:
      'bg-[#1E2229] text-white border-[#1E2229] hover:bg-[#12151A] hover:border-[#FF5738]',
    forest:
      'bg-[#0F5143] text-white border-[#0F5143] hover:bg-[#146958] hover:border-[#FF5738]',
    sand:
      'bg-[#FFF0EB] text-[#FF5738] border-[#FFD9CE] hover:bg-[#FFE5DC] hover:border-[#FF5738]',
    outline:
      'bg-white text-[#1E2229] border-[#FFD9CE] hover:border-[#FF5738] hover:bg-[#FFF9F5]',
    ghost:
      'bg-transparent text-[#1E2229] border-transparent hover:border-[#FFD9CE] hover:bg-[#FFF9F5]',
  };

  const isDarkVariant = variant === 'charcoal' || variant === 'forest';
  const rollColor = isDarkVariant ? 'text-[#FF5738]' : 'text-white';

  const content = (
    <>
      {/* Corner crosshairs tick mark indicators */}
      <span className="absolute -top-1 -left-1 text-[8px] font-mono text-[#FFBBAA] group-hover:text-[#FF5738] transition-colors">
        +
      </span>
      <span className="absolute -top-1 -right-1 text-[8px] font-mono text-[#FFBBAA] group-hover:text-[#FF5738] transition-colors">
        +
      </span>
      <span className="absolute -bottom-1 -left-1 text-[8px] font-mono text-[#FFBBAA] group-hover:text-[#FF5738] transition-colors">
        +
      </span>
      <span className="absolute -bottom-1 -right-1 text-[8px] font-mono text-[#FFBBAA] group-hover:text-[#FF5738] transition-colors">
        +
      </span>

      {/* Dual-layer rolling label */}
      <span className="label-wrapper">
        <span className="label-top">{children}</span>
        <span className={`label-bot ${rollColor}`}>{children}</span>
      </span>

      {/* Dual-layer rolling icon */}
      {showIcon && (
        <span className="icon-wrapper ml-3">
          <Icon className="icon-top h-3.5 w-3.5" />
          <Icon className={`icon-bot h-3.5 w-3.5 ${rollColor}`} />
        </span>
      )}
    </>
  );

  if (href) {
    if (href.startsWith('http') || href.startsWith('#')) {
      return (
        <a
          href={href}
          target={target}
          className={`${baseClasses} ${variantStyles[variant]} ${className}`}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={`${baseClasses} ${variantStyles[variant]} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantStyles[variant]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {content}
    </button>
  );
}
