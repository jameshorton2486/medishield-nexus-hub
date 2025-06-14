
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Lock } from "lucide-react";

const PASSWORD_REGEX = /^(?=.*[!@#$%^&*(),.?":{}|<>0-9])(?=.{8,})/;

type Props = {
  onSuccessRedirect?: () => void;
};

export default function ResetPasswordForm({ onSuccessRedirect }: Props) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [touched, setTouched] = useState({ password: false, confirm: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const passwordRef = useRef<HTMLInputElement>(null);

  // Focus on first input for accessibility
  useEffect(() => {
    passwordRef.current?.focus();
  }, []);

  const passwordValid = PASSWORD_REGEX.test(password);
  const match = password === confirm;
  const confirmError =
    touched.confirm && !match ? "Passwords do not match." : "";
  const passwordError =
    touched.password && !password
      ? "Password is required."
      : touched.password && !passwordValid
      ? "Password must be at least 8 characters and include a number or symbol."
      : "";

  const formValid = passwordValid && match;

  // Utility: get accessToken from query parameters
  function getAccessToken() {
    const searchParams = new URLSearchParams(window.location.search);
    // Supabase's reset link sets access_token in query params
    return searchParams.get("access_token") || "";
  }

  // Handle form submission
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ password: true, confirm: true });
    setStatus(null);
    setMessage(null);

    if (!formValid) return;

    setLoading(true);

    try {
      const access_token = getAccessToken();
      if (!access_token) {
        setStatus("error");
        setMessage("Invalid or missing token. Please use your email link again.");
        setLoading(false);
        return;
      }
      // Set the token for Supabase sessionless update
      // @ts-ignore
      const { error: sessionError } = await window.supabase.auth.setSession({
        access_token,
        refresh_token: access_token, // not strictly needed for reset, but Starlette requires both
      });
      if (sessionError) {
        setStatus("error");
        setMessage("Unable to reset password. Please try again.");
        setLoading(false);
        return;
      }

      // Now update the user's password
      // @ts-ignore
      const { error } = await window.supabase.auth.updateUser({
        password,
      });

      if (!error) {
        setStatus("success");
        setMessage("Password updated. You may now log in.");
        setTimeout(() => {
          // Redirect if handler provided, otherwise link shown below
          onSuccessRedirect && onSuccessRedirect();
        }, 1500);
      } else {
        setStatus("error");
        setMessage("Unable to reset password. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Unable to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit}
      aria-labelledby="reset-password-title"
      autoComplete="off"
      noValidate
    >
      <div className="flex flex-col items-center mb-4">
        <Lock className="w-10 h-10 text-primary mb-2" aria-hidden="true" />
        <h2
          id="reset-password-title"
          className="text-2xl font-bold text-gray-900 mb-1 text-center"
        >
          Reset Your Password
        </h2>
        <p className="text-sm text-muted-foreground text-center">
          Enter and confirm your new password to regain access to your account.
        </p>
      </div>
      <div>
        <Label htmlFor="password" className="flex items-center gap-1">
          New Password{" "}
          <span className="text-destructive text-base font-bold" aria-hidden="true">
            *
          </span>
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            ref={passwordRef}
            required
            minLength={8}
            autoComplete="new-password"
            aria-required="true"
            aria-invalid={!!passwordError}
            aria-describedby={passwordError ? "password-error" : "password-help"}
            disabled={loading || status === "success"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            className={`mt-1 pr-10 transition-colors ${
              touched.password
                ? passwordError
                  ? "border-destructive ring-2 ring-destructive/60"
                  : "border-green-500 ring-2 ring-green-300"
                : "border-input"
            } bg-gray-50 focus:border-primary focus:ring-primary`}
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={0}
            className="absolute top-2 right-3 text-gray-500 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 bg-transparent border-none"
            disabled={loading}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div
          className={`text-xs mt-1 ${
            passwordError ? "text-destructive" : "text-muted-foreground"
          }`}
          id={passwordError ? "password-error" : "password-help"}
        >
          {passwordError
            ? passwordError
            : "At least 8 characters, must include a number or symbol."}
        </div>
      </div>
      <div>
        <Label htmlFor="confirm" className="flex items-center gap-1">
          Confirm Password{" "}
          <span className="text-destructive text-base font-bold" aria-hidden="true">
            *
          </span>
        </Label>
        <div className="relative">
          <Input
            id="confirm"
            name="confirm"
            type={showConfirm ? "text" : "password"}
            required
            minLength={8}
            autoComplete="new-password"
            aria-required="true"
            aria-invalid={!!confirmError}
            aria-describedby={confirmError ? "confirm-error" : "confirm-help"}
            disabled={loading || status === "success"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, confirm: true }))}
            className={`mt-1 pr-10 transition-colors ${
              touched.confirm
                ? confirmError
                  ? "border-destructive ring-2 ring-destructive/60"
                  : match && confirm
                  ? "border-green-500 ring-2 ring-green-300"
                  : "border-input"
                : "border-input"
            } bg-gray-50 focus:border-primary focus:ring-primary`}
          />
          <button
            type="button"
            aria-label={showConfirm ? "Hide password" : "Show password"}
            onClick={() => setShowConfirm((v) => !v)}
            tabIndex={0}
            className="absolute top-2 right-3 text-gray-500 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 bg-transparent border-none"
            disabled={loading}
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div
          className={`text-xs mt-1 ${
            confirmError ? "text-destructive" : "text-muted-foreground"
          }`}
          id={confirmError ? "confirm-error" : "confirm-help"}
        >
          {confirmError
            ? confirmError
            : "Repeat your new password."}
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
        disabled={loading || !formValid || status === "success"}
        aria-label="Set New Password"
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
        Set New Password
      </Button>
      <div className="flex flex-col items-center gap-2 mt-4">
        <a
          href="/login"
          className="text-primary font-medium underline underline-offset-2 hover:text-primary/80 text-sm focus:outline-none"
          tabIndex={0}
        >
          Return to Login
        </a>
      </div>
    </form>
  );
}
