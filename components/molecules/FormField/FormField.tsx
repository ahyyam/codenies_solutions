import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  type?: 'input' | 'textarea';
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  helperText,
  className,
  type = 'input',
  inputProps,
  textareaProps
}) => {
  const fieldId = `field-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={fieldId} required={required}>
          {label}
        </Label>
      )}
      
      {type === 'input' ? (
        <Input
          id={fieldId}
          error={error}
          helperText={helperText}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined}
          {...inputProps}
        />
      ) : (
        <Textarea
          id={fieldId}
          error={error}
          helperText={helperText}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined}
          {...textareaProps}
        />
      )}
    </div>
  );
};

FormField.displayName = 'FormField';

export { FormField };