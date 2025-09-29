import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface FormSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className,
  collapsible = false,
  defaultExpanded = true
}) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  const toggleExpanded = () => {
    if (collapsible) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {(title || description) && (
        <div 
          className={cn(
            'border-b border-gray-200 pb-3',
            collapsible && 'cursor-pointer'
          )}
          onClick={toggleExpanded}
          role={collapsible ? 'button' : undefined}
          tabIndex={collapsible ? 0 : undefined}
          onKeyDown={collapsible ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleExpanded();
            }
          } : undefined}
          aria-expanded={collapsible ? isExpanded : undefined}
        >
          {title && (
            <h3 className={cn(
              'text-lg font-medium leading-6 text-gray-900',
              collapsible && 'flex items-center justify-between'
            )}>
              {title}
              {collapsible && (
                <span className="ml-2 text-gray-400">
                  {isExpanded ? '−' : '+'}
                </span>
              )}
            </h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-600">
              {description}
            </p>
          )}
        </div>
      )}
      
      {(!collapsible || isExpanded) && (
        <div className="space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

FormSection.displayName = 'FormSection';

export { FormSection };