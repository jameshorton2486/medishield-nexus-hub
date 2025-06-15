
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Mail, Phone, Calendar } from "lucide-react";

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!open) {
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
      });
      setErrors({});
      setTouched({});
    }
  }, [open]);

  function validateField(name: string, value: string) {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim().length < 2 ? `${name === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters` : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'phone':
        const phoneRegex = /^[\+]?[\s\-\(\)]*([0-9][\s\-\(\)]*){10,}$/;
        return !phoneRegex.test(value) ? 'Please enter a valid phone number' : '';
      case 'dateOfBirth':
        const date = new Date(value);
        const today = new Date();
        const minAge = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
        return date > today || date < minAge ? 'Please enter a valid date of birth' : '';
      default:
        return '';
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }

  function validateForm() {
    const newErrors: Record<string, string> = {};
    
    // Check required fields
    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
        return;
      }
      
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onAddClient(form);
  }

  const hasErrors = Object.values(errors).some(error => error);
  const isFormValid = Object.values(form).every(value => value.trim()) && !hasErrors;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Add New Client
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter first name"
                className={touched.firstName && errors.firstName ? "border-destructive" : ""}
                disabled={isSubmitting}
              />
              {touched.firstName && errors.firstName && (
                <p className="text-xs text-destructive mt-1">{errors.firstName}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter last name"
                className={touched.lastName && errors.lastName ? "border-destructive" : ""}
                disabled={isSubmitting}
              />
              {touched.lastName && errors.lastName && (
                <p className="text-xs text-destructive mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1">
              <Mail className="h-3 w-3" />
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="client@example.com"
              className={touched.email && errors.email ? "border-destructive" : ""}
              disabled={isSubmitting}
            />
            {touched.email && errors.email && (
              <p className="text-xs text-destructive mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-1">
              <Phone className="h-3 w-3" />
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="(555) 123-4567"
              className={touched.phone && errors.phone ? "border-destructive" : ""}
              disabled={isSubmitting}
            />
            {touched.phone && errors.phone && (
              <p className="text-xs text-destructive mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <Label htmlFor="dateOfBirth" className="text-sm font-medium flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Date of Birth <span className="text-destructive">*</span>
            </Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={form.dateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.dateOfBirth && errors.dateOfBirth ? "border-destructive" : ""}
              disabled={isSubmitting}
              max={new Date().toISOString().split('T')[0]}
            />
            {touched.dateOfBirth && errors.dateOfBirth && (
              <p className="text-xs text-destructive mt-1">{errors.dateOfBirth}</p>
            )}
          </div>

          {hasErrors && (
            <Alert variant="destructive">
              <AlertDescription>
                Please correct the errors above before submitting.
              </AlertDescription>
            </Alert>
          )}

          <DialogFooter className="gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !isFormValid}
              className="min-w-[100px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Adding...
                </div>
              ) : (
                "Add Client"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
