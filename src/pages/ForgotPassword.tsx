
import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const emailValid = EMAIL_REGEX.test(email);
  const emailError =
    touched && !email
      ? "Email is required."
      : email && !emailValid && touched
      ? "Enter a valid email."
      : "";

  // Placeholder for sending reset email logic
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    setError(null);
    setSuccess(null);
    if (!emailValid) return;
    setLoading(true);
    // Simulate request (replace this section with Supabase call)
    setTimeout(() => {
      setLoading(false);
      if (email === "notfound@example.com") {
        setError("Email not found. Please check and try again.");
      } else {
        setSuccess("Check your inbox for a reset link.");
      }
    }, 1200);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary px-4 py-10 font-inter">
      <div className="w-full max-w-[420px] rounded-2xl shadow-card px-6 py-8 bg-white">
        <div className="flex flex-col items-center mb-6">
          <Mail className="w-10 h-10 text-primary mb-2" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">
            Forgot your password?
          </h2>
          <p className="text-sm text-muted-foreground text-center">
            Enter your email and we&apos;ll send you reset instructions.
          </p>
        </div>
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
          aria-labelledby="forgot-password-title"
          noValidate
        >
          <div className="mb-2">
            <Label
              htmlFor="email"
              className="flex items-center gap-1"
              aria-label="Email address"
            >
              Email Address
              <span className="text-destructive text-base leading-snug font-bold" aria-hidden="true">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoFocus
              autoComplete="username"
              required
              placeholder="your@email.com"
              aria-required="true"
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "email-error" : "email-help"}
              tabIndex={0}
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              className={`mt-1 transition-colors ${
                touched
                  ? emailError
                    ? "border-destructive ring-2 ring-destructive/60"
                    : "border-green-500 ring-2 ring-green-300"
                  : "border-input"
              } bg-gray-50 focus:border-primary focus:ring-primary`}
            />
            <div
              className={`text-xs mt-1 ${
                emailError ? "text-destructive" : "text-muted-foreground"
              }`}
              id={emailError ? "email-error" : "email-help"}
            >
              {emailError
                ? emailError
                : "Enter the email linked to your account."}
            </div>
          </div>
          {error && (
            <Alert variant="destructive" className="mb-2" aria-live="assertive">
              <AlertDescription className="text-destructive">
                {error}
              </AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-2" aria-live="polite">
              <AlertDescription className="text-green-700">
                {success}
              </AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            className="w-full font-semibold text-base h-11 bg-primary hover:bg-primary/90 text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md transition disabled:opacity-70"
            aria-label="Send Reset Link"
            disabled={loading || !emailValid}
            tabIndex={0}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-30"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-70"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            )}
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
}
