
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean;
  loadingText?: string;
}

export function LoadingButton({ 
  loading = false, 
  loadingText,
  children,
  disabled,
  className,
  ...props 
}: LoadingButtonProps) {
  return (
    <Button 
      disabled={loading || disabled}
      className={cn('relative', className)}
      {...props}
    >
      {loading && (
        <Loader className="mr-2 h-4 w-4 animate-spin" />
      )}
      {loading ? (loadingText || 'Loading...') : children}
    </Button>
  );
}
