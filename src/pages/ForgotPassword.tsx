
import * as React from "react";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

// Responsive, centered layout reusing login page styles
export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary px-4 py-10 font-inter">
      <div className="w-full max-w-[420px] rounded-2xl shadow-card px-6 py-8 bg-white">
        <ForgotPasswordForm />
      </div>
      {/* Support contact + future footer, can be refactored as needed */}
      <div className="mt-8 flex flex-col items-center text-center text-xs gap-2 text-muted-foreground">
        <div>
          Need help? Contact{" "}
          <a
            className="text-primary underline font-medium"
            href="mailto:support@acmehealth.com"
            tabIndex={0}
          >
            support@acmehealth.com
          </a>
        </div>
        <div className="flex gap-3 mt-1">
          <a
            href="#"
            className="hover:underline focus:underline focus:outline-none"
            tabIndex={0}
          >
            Privacy Policy
          </a>
          <span>•</span>
          <a
            href="#"
            className="hover:underline focus:underline focus:outline-none"
            tabIndex={0}
          >
            Terms of Use
          </a>
        </div>
      </div>
    </div>
  );
}
