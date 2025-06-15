
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  required?: boolean;
}

export function EnhancedInput({
  label,
  error,
  success,
  helperText,
  required,
  className,
  ...props
}: EnhancedInputProps) {
  const hasError = !!error;
  const hasSuccess = success && !hasError;

  return (
    <div className="space-y-2">
      {label && (
        <Label className={cn(hasError && 'text-destructive')}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      
      <div className="relative">
        <Input
          className={cn(
            'pr-10',
            hasError && 'border-destructive focus-visible:ring-destructive',
            hasSuccess && 'border-green-500 focus-visible:ring-green-500',
            className
          )}
          {...props}
        />
        
        {(hasError || hasSuccess) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {hasError && (
              <AlertCircle className="h-4 w-4 text-destructive" />
            )}
            {hasSuccess && (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <p className={cn(
          'text-sm',
          hasError ? 'text-destructive' : 'text-muted-foreground'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}
