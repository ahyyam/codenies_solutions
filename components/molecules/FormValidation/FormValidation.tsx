import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export interface ValidationMessage {
  type: 'error' | 'warning' | 'success' | 'info';
  message: string;
  field?: string;
}

export interface FormValidationProps {
  messages: ValidationMessage[];
  className?: string;
  showIcons?: boolean;
  live?: boolean;
}

const FormValidation: React.FC<FormValidationProps> = ({
  messages,
  className,
  showIcons = true,
  live = true
}) => {
  if (messages.length === 0) return null;

  const icons = {
    error: AlertCircle,
    warning: AlertTriangle,
    success: CheckCircle,
    info: Info
  };

  const styles = {
    error: 'text-red-600 bg-red-50 border-red-200',
    warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    success: 'text-green-600 bg-green-50 border-green-200',
    info: 'text-blue-600 bg-blue-50 border-blue-200'
  };

  const iconStyles = {
    error: 'text-red-400',
    warning: 'text-yellow-400',
    success: 'text-green-400',
    info: 'text-blue-400'
  };

  // Group messages by type for better organization
  const groupedMessages = messages.reduce((acc, message) => {
    if (!acc[message.type]) {
      acc[message.type] = [];
    }
    acc[message.type].push(message);
    return acc;
  }, {} as Record<string, ValidationMessage[]>);

  return (
    <div
      className={cn('space-y-2', className)}
      role={live ? 'status' : 'group'}
      aria-live={live ? 'polite' : undefined}
      aria-atomic={live ? 'true' : undefined}
    >
      {Object.entries(groupedMessages).map(([type, typeMessages]) => {
        const Icon = icons[type as keyof typeof icons];
        
        return (
          <div
            key={type}
            className={cn(
              'rounded-md border p-3',
              styles[type as keyof typeof styles]
            )}
            role="alert"
          >
            <div className="flex items-start">
              {showIcons && (
                <div className="flex-shrink-0">
                  <Icon
                    className={cn('h-5 w-5', iconStyles[type as keyof typeof iconStyles])}
                    aria-hidden="true"
                  />
                </div>
              )}
              <div className={cn(showIcons && 'ml-3')}>
                {typeMessages.length === 1 ? (
                  <p className="text-sm font-medium">
                    {typeMessages[0].message}
                  </p>
                ) : (
                  <>
                    <h4 className="text-sm font-medium mb-2">
                      {type === 'error' && 'Errors:'}
                      {type === 'warning' && 'Warnings:'}
                      {type === 'success' && 'Success:'}
                      {type === 'info' && 'Information:'}
                    </h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      {typeMessages.map((message, index) => (
                        <li key={index}>
                          {message.field && (
                            <span className="font-medium">{message.field}: </span>
                          )}
                          {message.message}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

FormValidation.displayName = 'FormValidation';

export { FormValidation };