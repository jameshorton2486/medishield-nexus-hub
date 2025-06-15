
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EnhancedInput } from "@/components/ui/enhanced-input";

interface AddClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddClient: (client: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
  }) => void;
  isSubmitting: boolean;
}

export function AddClientModal({
  open,
  onOpenChange,
  onAddClient,
  isSubmitting,
}: AddClientModalProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.dateOfBirth) {
      setError("All fields are required.");
      return;
    }
    onAddClient(form);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <EnhancedInput
              name="firstName"
              label="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <EnhancedInput
              name="lastName"
              label="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <EnhancedInput
            name="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <EnhancedInput
            name="phone"
            label="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <EnhancedInput
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            value={form.dateOfBirth}
            onChange={handleChange}
            required
          />
          {error && <div className="text-destructive text-sm">{error}</div>}
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Adding..." : "Add Client"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
