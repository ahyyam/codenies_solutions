'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  variant?: 'innovation' | 'tech' | 'hover';
  animated?: boolean;
  hero?: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

/**
 * GradientText component for applying gradient text effects
 * Supports innovation and tech gradients with optional animations
 * Includes fallbacks for browsers that don't support background-clip: text
 */
export function GradientText({
  children,
  variant = 'innovation',
  animated = false,
  hero = false,
  className,
  as: Component = 'span',
}: GradientTextProps) {
  const gradientClasses = {
    innovation: hero && animated 
      ? 'text-gradient-hero' 
      : animated 
        ? 'text-gradient-innovation animate-gradient-flow'
        : 'text-gradient-innovation',
    tech: hero && animated 
      ? 'text-gradient-tech-hero' 
      : animated 
        ? 'text-gradient-tech animate-gradient-flow'
        : 'text-gradient-tech',
    hover: 'text-gradient-innovation hover:text-gradient-tech transition-all duration-300',
  };

  return (
    <Component
      className={cn(
        gradientClasses[variant],
        'font-semibold',
        className
      )}
      style={{
        // Ensure proper fallback for older browsers
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        // Additional fallback for very old browsers
        color: 'var(--color-primary)',
      }}
    >
      {children}
    </Component>
  );
}

// Utility component for gradient backgrounds
interface GradientBackgroundProps {
  children: React.ReactNode;
  variant?: 'innovation' | 'tech' | 'subtle-innovation' | 'subtle-tech' | 'radial-innovation' | 'radial-tech';
  className?: string;
}

export function GradientBackground({
  children,
  variant = 'innovation',
  className,
}: GradientBackgroundProps) {
  const backgroundClasses = {
    innovation: 'bg-gradient-innovation',
    tech: 'bg-gradient-tech',
    'subtle-innovation': 'bg-gradient-innovation-subtle',
    'subtle-tech': 'bg-gradient-tech-subtle',
    'radial-innovation': 'bg-gradient-radial-innovation',
    'radial-tech': 'bg-gradient-radial-tech',
  };

  return (
    <div className={cn(backgroundClasses[variant], className)}>
      {children}
    </div>
  );
}

// Utility component for gradient borders
interface GradientBorderProps {
  children: React.ReactNode;
  variant?: 'innovation' | 'tech';
  className?: string;
  rounded?: boolean;
}

export function GradientBorder({
  children,
  variant = 'innovation',
  className,
  rounded = true,
}: GradientBorderProps) {
  const borderClasses = {
    innovation: 'border-gradient-innovation',
    tech: 'border-gradient-tech',
  };

  return (
    <div 
      className={cn(
        borderClasses[variant],
        rounded && 'rounded-lg',
        'p-4',
        className
      )}
    >
      {children}
    </div>
  );
}

// Utility component for gradient cards
interface GradientCardProps {
  children: React.ReactNode;
  variant?: 'innovation' | 'tech';
  className?: string;
  hover?: boolean;
}

export function GradientCard({
  children,
  variant = 'innovation',
  className,
  hover = true,
}: GradientCardProps) {
  const cardClasses = {
    innovation: 'card-gradient-innovation',
    tech: 'card-gradient-tech',
  };

  return (
    <div 
      className={cn(
        cardClasses[variant],
        hover && 'hover:transform hover:scale-105 hover:shadow-gradient-innovation',
        'transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
}

// Utility component for gradient buttons
interface GradientButtonProps {
  children: React.ReactNode;
  variant?: 'innovation' | 'tech';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function GradientButton({
  children,
  variant = 'innovation',
  className,
  onClick,
  disabled = false,
  type = 'button',
}: GradientButtonProps) {
  const buttonClasses = {
    innovation: 'btn-gradient-innovation',
    tech: 'btn-gradient-tech',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        buttonClasses[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white px-4 py-2.5 text-sm rounded-md whitespace-nowrap',
        className
      )}
    >
      {children}
    </button>
  );
}

// Utility component for gradient highlights
interface GradientHighlightProps {
  children: React.ReactNode;
  variant?: 'innovation' | 'tech';
  className?: string;
}

export function GradientHighlight({
  children,
  variant = 'innovation',
  className,
}: GradientHighlightProps) {
  const highlightClasses = {
    innovation: 'highlight-gradient-innovation',
    tech: 'highlight-gradient-tech',
  };

  return (
    <span className={cn(highlightClasses[variant], className)}>
      {children}
    </span>
  );
}

// Utility component for gradient dividers
interface GradientDividerProps {
  variant?: 'innovation' | 'tech';
  className?: string;
}

export function GradientDivider({
  variant = 'innovation',
  className,
}: GradientDividerProps) {
  const dividerClasses = {
    innovation: 'divider-gradient-innovation',
    tech: 'divider-gradient-tech',
  };

  return <hr className={cn(dividerClasses[variant], className)} />;
}