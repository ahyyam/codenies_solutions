import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useKeyboardNavigation } from '@/lib/utils/accessibility';
import { Button } from '@/components/atoms/Button';
import { ChevronDown, Menu, X } from 'lucide-react';

export interface NavigationItem {
  label: string;
  href?: string;
  onClick?: () => void;
  children?: NavigationItem[];
  disabled?: boolean;
  external?: boolean;
}

export interface NavigationProps {
  items: NavigationItem[];
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'primary' | 'secondary';
  showMobileMenu?: boolean;
  onMobileMenuToggle?: (isOpen: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  items,
  className,
  orientation = 'horizontal',
  variant = 'primary',
  showMobileMenu = false,
  onMobileMenuToggle
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const navRef = useRef<HTMLElement>(null);

  const handleKeyDown = useKeyboardNavigation({
    onArrowDown: () => {
      if (orientation === 'vertical') {
        setActiveIndex(prev => (prev + 1) % items.length);
      }
    },
    onArrowUp: () => {
      if (orientation === 'vertical') {
        setActiveIndex(prev => prev <= 0 ? items.length - 1 : prev - 1);
      }
    },
    onArrowRight: () => {
      if (orientation === 'horizontal') {
        setActiveIndex(prev => (prev + 1) % items.length);
      } else {
        // Expand submenu if current item has children
        const currentItem = items[activeIndex];
        if (currentItem?.children && !expandedItems.has(activeIndex)) {
          setExpandedItems(prev => new Set(prev).add(activeIndex));
        }
      }
    },
    onArrowLeft: () => {
      if (orientation === 'horizontal') {
        setActiveIndex(prev => prev <= 0 ? items.length - 1 : prev - 1);
      } else {
        // Collapse submenu if expanded
        if (expandedItems.has(activeIndex)) {
          setExpandedItems(prev => {
            const newSet = new Set(prev);
            newSet.delete(activeIndex);
            return newSet;
          });
        }
      }
    },
    onEnter: () => {
      const currentItem = items[activeIndex];
      if (currentItem) {
        if (currentItem.children) {
          toggleExpanded(activeIndex);
        } else if (currentItem.onClick) {
          currentItem.onClick();
        }
      }
    },
    onSpace: () => {
      const currentItem = items[activeIndex];
      if (currentItem?.children) {
        toggleExpanded(activeIndex);
      }
    },
    onEscape: () => {
      setActiveIndex(-1);
      setExpandedItems(new Set());
    },
    onHome: () => {
      setActiveIndex(0);
    },
    onEnd: () => {
      setActiveIndex(items.length - 1);
    }
  });

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const renderNavigationItem = (item: NavigationItem, index: number, level: number = 0) => {
    const isActive = activeIndex === index;
    const isExpanded = expandedItems.has(index);
    const hasChildren = item.children && item.children.length > 0;

    const itemContent = (
      <div
        className={cn(
          'flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2',
          isActive && 'bg-primary/10 text-primary',
          item.disabled && 'opacity-50 cursor-not-allowed',
          variant === 'primary' ? 'text-foreground hover:text-accent hover:bg-accent/10' : 'text-muted-foreground hover:text-foreground',
          level > 0 && 'ml-4'
        )}
        role="menuitem"
        tabIndex={isActive ? 0 : -1}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-haspopup={hasChildren ? 'menu' : undefined}
        aria-disabled={item.disabled}
        onFocus={() => setActiveIndex(index)}
        onMouseEnter={() => setActiveIndex(index)}
      >
        <span>{item.label}</span>
        {hasChildren && (
          <ChevronDown
            className={cn(
              'ml-2 h-4 w-4 transition-transform',
              isExpanded && 'rotate-180'
            )}
            aria-hidden="true"
          />
        )}
      </div>
    );

    const handleClick = () => {
      if (item.disabled) return;
      
      if (hasChildren) {
        toggleExpanded(index);
      } else if (item.onClick) {
        item.onClick();
      }
    };

    return (
      <li key={index} role="none">
        {item.href && !hasChildren ? (
          <Link
            href={item.href}
            className="block"
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            aria-label={item.external ? `${item.label} (opens in new tab)` : undefined}
          >
            {itemContent}
          </Link>
        ) : (
          <button
            type="button"
            className="block w-full text-left"
            onClick={handleClick}
            disabled={item.disabled}
          >
            {itemContent}
          </button>
        )}
        
        {hasChildren && isExpanded && (
          <ul
            role="menu"
            aria-label={`${item.label} submenu`}
            className="mt-1 space-y-1"
          >
            {item.children!.map((child, childIndex) =>
              renderNavigationItem(child, items.length + childIndex, level + 1)
            )}
          </ul>
        )}
      </li>
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onMobileMenuToggle?.(!showMobileMenu)}
          aria-expanded={showMobileMenu}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation menu"
        >
          {showMobileMenu ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Navigation menu */}
      <nav
        ref={navRef}
        className={cn(
          'navigation',
          orientation === 'horizontal' ? 'flex space-x-1' : 'space-y-1',
          showMobileMenu ? 'block' : 'hidden md:block',
          className
        )}
        role="menubar"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        id="mobile-navigation"
      >
        <ul
          role="menu"
          className={cn(
            orientation === 'horizontal' ? 'flex space-x-1' : 'space-y-1'
          )}
        >
          {items.map((item, index) => renderNavigationItem(item, index))}
        </ul>
      </nav>
    </>
  );
};

Navigation.displayName = 'Navigation';

export { Navigation };