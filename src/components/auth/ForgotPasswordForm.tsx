
import * as React from "react";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

type Props = {
  onFinished?: () => void;
};

export default function ForgotPasswordForm({ onFinished }: Props) {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Rate limiting state - tracked in-memory for sessionless, privacy-first flow
  const attemptsRef = useRef<number[]>([]);

  const emailValid = EMAIL_REGEX.test(email);
  const emailError =
    touched && !email
      ? "Email is required."
      : email && !emailValid && touched
      ? "Enter a valid email."
      : "";

  // Rate limiting message
  const showRateLimit = (() => {
    // Remove old attempts
    const now = Date.now();
    attemptsRef.current = attemptsRef.current.filter(
      (t) => now - t < RATE_LIMIT_WINDOW
    );
    return attemptsRef.current.length >= MAX_ATTEMPTS;
  })();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    setStatus(null);
    setMessage(null);

    // Clean up old attempts
    const now = Date.now();
    attemptsRef.current = attemptsRef.current.filter(
      (t) => now - t < RATE_LIMIT_WINDOW
    );

    if (showRateLimit) {
      setStatus("error");
      setMessage("Too many requests. Please try again in a minute.");
      return;
    }
    if (!emailValid) return;

    setLoading(true);
    attemptsRef.current.push(now);

    // --- CSRF safe: no session data stored client-side, just call Supabase SDK ---
    try {
      // @ts-ignore
      const { error } = await window.supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/reset-password", // You can update as needed
      });

      if (error) {
        // Do NOT expose if email exists.
        setStatus("success");
        setMessage("Check your inbox for a reset link.");
        // Rate-limit abuse (optional, already done above).
      } else {
        setStatus("success");
        setMessage("Check your inbox for a reset link.");
        if (onFinished) onFinished();
      }
    } catch {
      setStatus("error");
      setMessage("Sorry, there was a problem. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit}
      aria-labelledby="forgot-password-title"
      noValidate
      autoComplete="off"
    >
      <div className="flex flex-col items-center mb-4">
        <Mail className="w-10 h-10 text-primary mb-2" aria-hidden="true" />
        <h2
          id="forgot-password-title"
          className="text-2xl font-bold text-gray-900 mb-1 text-center"
        >
          Forgot your password?
        </h2>
        <p className="text-sm text-muted-foreground text-center">
          Enter your email and we&apos;ll send you reset instructions.
        </p>
      </div>
      <div>
        <Label
          htmlFor="email"
          className="flex items-center gap-1"
          aria-label="Email address"
        >
          Email Address
          <span
            className="text-destructive text-base leading-snug font-bold"
            aria-hidden="true"
          >
            *
          </span>
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
          disabled={loading || status === "success"}
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
      {message && (
        <Alert
          variant={status === "error" ? "destructive" : "default"}
          className={`mb-2 ${
            status === "success"
              ? "bg-green-100 border-green-400 text-green-800"
              : ""
          }`}
          aria-live={status === "error" ? "assertive" : "polite"}
        >
          <AlertDescription
            className={
              status === "success"
                ? "text-green-700"
                : "text-destructive"
            }
          >
            {message}
          </AlertDescription>
        </Alert>
      )}
      <Button
        type="submit"
        className="w-full font-semibold text-base h-11 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md transition disabled:opacity-70 min-h-[44px]"
        aria-label="Send Reset Link"
        disabled={loading || !emailValid || status === "success"}
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
      <div className="flex flex-col items-center gap-2 mt-4">
        <a
          href="/login"
          className="text-primary font-medium underline underline-offset-2 hover:text-primary/80 text-sm focus:outline-none"
          tabIndex={0}
        >
          Back to Login
        </a>
      </div>
    </form>
  );
}
