import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/molecules/Card';

export interface FormLayoutProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  variant?: 'card' | 'plain';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  description,
  children,
  className,
  variant = 'card',
  maxWidth = 'lg'
}) => {
  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full'
  };

  const content = (
    <>
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-gray-600">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </>
  );

  if (variant === 'card') {
    return (
      <div className={cn('mx-auto w-full', maxWidths[maxWidth], className)}>
        <Card variant="outlined" padding="lg">
          {(title || description) && (
            <CardHeader>
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
          )}
          <CardContent>
            {children}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn('mx-auto w-full', maxWidths[maxWidth], className)}>
      {content}
    </div>
  );
};

FormLayout.displayName = 'FormLayout';

export { FormLayout };