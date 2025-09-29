import React from 'react';
import { cn } from '@/lib/utils';
import { Input, InputProps } from '@/components/atoms/Input';
import { Textarea, TextareaProps } from '@/components/atoms/Textarea';
import { Label } from '@/components/atoms/Label';

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  type?: 'input' | 'textarea';
  inputProps?: Omit<InputProps, 'label' | 'error' | 'helperText'>;
  textareaProps?: Omit<TextareaProps, 'label' | 'error' | 'helperText'>;
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