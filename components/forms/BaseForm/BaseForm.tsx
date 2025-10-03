import React, { FormHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface BaseFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  children: ReactNode;
  loading?: boolean;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
  showActions?: boolean;
  actionsClassName?: string;
  formClassName?: string;
}

const BaseForm: React.FC<BaseFormProps> = ({
  onSubmit,
  children,
  loading = false,
  submitText = 'Submit',
  cancelText = 'Cancel',
  onCancel,
  showActions = true,
  actionsClassName,
  formClassName,
  className,
  ...props
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('space-y-6', formClassName, className)}
      {...props}
    >
      <div className="space-y-4">
        {children}
      </div>
      
      {showActions && (
        <div className={cn('flex items-center justify-end space-x-3 pt-4 border-t', actionsClassName)}>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              {cancelText}
            </Button>
          )}
          <Button
            type="submit"
            disabled={loading}
          >
            {submitText}
          </Button>
        </div>
      )}
    </form>
  );
};

BaseForm.displayName = 'BaseForm';

export { BaseForm };