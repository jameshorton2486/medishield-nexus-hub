
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogFooter, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Are you sure?",
  description = "",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm sm:max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
        </DialogHeader>
        {description ? (
          <DialogDescription className="text-muted-foreground text-sm py-2 block">{description}</DialogDescription>
        ) : (
          // Always render a placeholder desc to silence aria warnings.
          <DialogDescription className="sr-only">Are you sure?</DialogDescription>
        )}
        <DialogFooter className="flex flex-row justify-end gap-2 pt-2">
          <Button variant="secondary" type="button" onClick={() => onOpenChange(false)}>
            {cancelText}
          </Button>
          <Button 
            variant="destructive" 
            type="button"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
