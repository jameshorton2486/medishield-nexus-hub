
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react";

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

  useEffect(() => {
    passwordRef.current?.focus();
  }, []);

  const passwordValid = PASSWORD_REGEX.test(password);
  const match = password === confirm && confirm.length > 0;
  const confirmError = touched.confirm && confirm && !match ? "Passwords do not match." : "";
  const passwordError = touched.password && !password
    ? "Password is required."
    : touched.password && password && !passwordValid
    ? "Password must be at least 8 characters and include a number or symbol."
    : "";

  const formValid = passwordValid && match && password && confirm;

  function getAccessToken() {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("access_token") || "";
  }

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
        setMessage("Invalid or expired reset link. Please request a new password reset.");
        setLoading(false);
        return;
      }

      // @ts-ignore
      const { error: sessionError } = await window.supabase.auth.setSession({
        access_token,
        refresh_token: access_token,
      });
      
      if (sessionError) {
        console.error("Session error:", sessionError);
        setStatus("error");
        setMessage("Unable to authenticate reset request. Please try again or request a new reset link.");
        setLoading(false);
        return;
      }

      // @ts-ignore
      const { error } = await window.supabase.auth.updateUser({
        password,
      });

      if (!error) {
        setStatus("success");
        setMessage("Password successfully updated! Redirecting to login...");
        setTimeout(() => {
          onSuccessRedirect && onSuccessRedirect();
        }, 2000);
      } else {
        console.error("Password update error:", error);
        setStatus("error");
        setMessage(error.message || "Unable to update password. Please try again.");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setStatus("error");
      setMessage("An unexpected error occurred. Please try again.");
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
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
          <Lock className="w-6 h-6 text-primary" aria-hidden="true" />
        </div>
        <h2
          id="reset-password-title"
          className="text-2xl font-bold text-gray-900 mb-2 text-center"
        >
          Create New Password
        </h2>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          Your new password must be different from your previous password and meet our security requirements.
        </p>
      </div>

      <div>
        <Label htmlFor="password" className="flex items-center gap-1 mb-2">
          New Password
          <span className="text-destructive" aria-hidden="true">*</span>
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            ref={passwordRef}
            required
            autoComplete="new-password"
            aria-required="true"
            aria-invalid={!!passwordError}
            aria-describedby={passwordError ? "password-error" : "password-help"}
            disabled={loading || status === "success"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            className={`pr-10 ${
              touched.password
                ? passwordError
                  ? "border-destructive focus:ring-destructive"
                  : passwordValid
                  ? "border-green-500 focus:ring-green-500"
                  : ""
                : ""
            }`}
            placeholder="Enter your new password"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
            disabled={loading}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div
          className={`text-xs mt-1 ${passwordError ? "text-destructive" : "text-muted-foreground"}`}
          id={passwordError ? "password-error" : "password-help"}
        >
          {passwordError || "At least 8 characters with a number or symbol"}
        </div>
      </div>

      <div>
        <Label htmlFor="confirm" className="flex items-center gap-1 mb-2">
          Confirm Password
          <span className="text-destructive" aria-hidden="true">*</span>
        </Label>
        <div className="relative">
          <Input
            id="confirm"
            name="confirm"
            type={showConfirm ? "text" : "password"}
            required
            autoComplete="new-password"
            aria-required="true"
            aria-invalid={!!confirmError}
            aria-describedby={confirmError ? "confirm-error" : "confirm-help"}
            disabled={loading || status === "success"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, confirm: true }))}
            className={`pr-10 ${
              touched.confirm && confirm
                ? confirmError
                  ? "border-destructive focus:ring-destructive"
                  : match
                  ? "border-green-500 focus:ring-green-500"
                  : ""
                : ""
            }`}
            placeholder="Confirm your new password"
          />
          <button
            type="button"
            aria-label={showConfirm ? "Hide password" : "Show password"}
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
            disabled={loading}
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div
          className={`text-xs mt-1 ${confirmError ? "text-destructive" : "text-muted-foreground"}`}
          id={confirmError ? "confirm-error" : "confirm-help"}
        >
          {confirmError || "Re-enter your password to confirm"}
        </div>
      </div>

      {message && (
        <Alert
          variant={status === "error" ? "destructive" : "default"}
          className={status === "success" ? "border-green-200 bg-green-50" : ""}
        >
          <div className="flex items-center gap-2">
            {status === "success" && <CheckCircle className="h-4 w-4 text-green-600" />}
            <AlertDescription
              className={status === "success" ? "text-green-800" : ""}
            >
              {message}
            </AlertDescription>
          </div>
        </Alert>
      )}

      <Button
        type="submit"
        className="w-full h-11 font-semibold"
        disabled={loading || !formValid || status === "success"}
      >
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
        )}
        {status === "success" ? "Password Updated!" : "Update Password"}
      </Button>

      <div className="text-center pt-4">
        <a
          href="/login"
          className="text-sm text-primary font-medium hover:text-primary/80 transition-colors"
        >
          ← Back to Login
        </a>
      </div>
    </form>
  );
}
