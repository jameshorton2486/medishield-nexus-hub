
import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// --- Constants for branding ---
const FIRM_LOGO =
  "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=facearea&w=80&h=80&q=80&facepad=2";
const BRAND_BG_GRADIENT =
  "linear-gradient(135deg,#1e40af 60%,#88b2fa 100%)"; // blue to light blue

// --- Email validation regex (simple) ---
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  // --- Form state ---
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Validation state ---
  const emailValid = EMAIL_REGEX.test(form.email);
  const emailError =
    !form.email && touched.email
      ? "Email is required."
      : !!form.email && !emailValid && touched.email
      ? "Enter a valid email."
      : "";
  const passwordValid = form.password.length >= 8;
  const passwordError =
    !form.password && touched.password
      ? "Password is required."
      : !!form.password && !passwordValid && touched.password
      ? "Password must be at least 8 characters."
      : "";

  const formValid = emailValid && passwordValid;

  // --- Handlers ---
  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : e.target.value,
    }));
  }

  function handleTogglePassword() {
    setShowPassword((v) => !v);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!formValid) return; // Don't submit if invalid
    setLoading(true);
    setError(null);
    // Simulate login error
    setTimeout(() => {
      setLoading(false);
      setError("Invalid credentials. Please try again.");
    }, 1200);
  }

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-secondary font-inter">
      {/* --- Left: Login Form --- */}
      <main className="w-full sm:w-2/5 flex flex-col justify-center items-center px-4 py-8 sm:px-8 bg-white z-10">
        <div
          className="w-full max-w-[420px] rounded-2xl shadow-card px-6 py-8"
          aria-label="Login form container"
          tabIndex={-1}
        >
          {/* --- Firm Logo --- */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={FIRM_LOGO}
              alt="Firm Logo"
              className="w-16 h-16 rounded-full bg-gray-100 object-cover mb-2 border"
            />
            <span className="text-lg font-semibold tracking-wide text-primary mt-1">
              Medical Records Platform
            </span>
          </div>
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
            aria-labelledby="sign-in-title"
            autoComplete="on"
            noValidate
          >
            {/* --- Heading --- */}
            <div>
              <h2
                id="sign-in-title"
                className="text-2xl font-bold mb-1 text-gray-900"
              >
                Sign In to Your Account
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Enter your credentials to access the secure portal.
              </p>
            </div>
            {/* --- Email Input --- */}
            <div className="mb-2">
              <Label
                htmlFor="email"
                className="flex items-center gap-1"
                aria-label="Email address"
              >
                Email{" "}
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
                placeholder="you@lawfirm.com"
                aria-required="true"
                aria-invalid={!!emailError}
                aria-describedby={
                  emailError
                    ? "email-error"
                    : "email-help"
                }
                tabIndex={0}
                disabled={loading}
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 transition-colors ${
                  touched.email
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
                  : "Use your work email for secure access."}
              </div>
            </div>
            {/* --- Password Input --- */}
            <div className="mb-2 relative">
              <Label
                htmlFor="password"
                className="flex items-center gap-1"
                aria-label="Password"
              >
                Password{" "}
                <span
                  className="text-destructive text-base leading-snug font-bold"
                  aria-hidden="true"
                >
                  *
                </span>
              </Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="At least 8 characters"
                aria-required="true"
                aria-invalid={!!passwordError}
                aria-describedby={
                  passwordError
                    ? "password-error"
                    : "password-help"
                }
                disabled={loading}
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="current-password"
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
                onClick={handleTogglePassword}
                tabIndex={0}
                className="absolute top-9 right-3 text-gray-500 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 bg-transparent border-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <div
                className={`text-xs mt-1 ${
                  passwordError ? "text-destructive" : "text-muted-foreground"
                }`}
                id={passwordError ? "password-error" : "password-help"}
              >
                {passwordError
                  ? passwordError
                  : "Password must be at least 8 characters."}
              </div>
            </div>
            {/* --- Remember Me + Forgot Password --- */}
            <div className="flex justify-between items-center mt-2 mb-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  name="remember"
                  checked={form.remember}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, remember: v === true }))
                  }
                  disabled={loading}
                  aria-label="Remember Me"
                  tabIndex={0}
                />
                <Label
                  htmlFor="remember"
                  className="text-xs"
                  aria-label="Remember Me"
                >
                  Remember Me
                </Label>
              </div>
              <a
                href="#"
                className="text-xs text-primary hover:underline underline-offset-2 focus:outline-none"
                tabIndex={loading ? -1 : 0}
                aria-label="Forgot password"
              >
                Forgot Password?
              </a>
            </div>
            {/* --- Error Message --- */}
            {error && (
              <Alert variant="destructive" className="mb-2" aria-live="assertive">
                <AlertDescription className="text-destructive">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            {/* --- Sign In Button --- */}
            <Button
              type="submit"
              className="w-full font-semibold text-base h-11 bg-primary hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md transition disabled:opacity-70"
              aria-label="Sign in"
              disabled={loading || !formValid}
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
              Sign In
            </Button>
          </form>
        </div>
      </main>
      {/* --- Right: Branding Side --- */}
      <aside
        className="relative w-full sm:w-3/5 flex flex-col items-center justify-center overflow-hidden py-10 px-6"
        style={{
          background: BRAND_BG_GRADIENT,
        }}
        aria-label="Branding area"
        tabIndex={-1}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/50 z-0" />
        <div className="relative z-10 flex flex-col items-center text-center px-2">
          <img
            src={FIRM_LOGO}
            alt="Firm Logo Large"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white shadow-lg object-cover mb-4 border-2 border-white"
          />
          <div
            className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-1"
            style={{ textShadow: "0 2px 8px #183c92" }}
          >
            Acme Health Law Group
          </div>
          <div className="text-white text-base mb-6 font-medium">
            Streamline Your Medical Records Management
          </div>
          <span className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/90 text-primary mb-4 font-semibold text-xs sm:text-sm border border-primary shadow-sm">
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <circle cx="8" cy="8" r="7" stroke="#1e40af" strokeWidth="2" />
              <path
                d="M6.8 12l-3-3 1.2-1.2 1.8 1.8 4.2-4.2L13 6.2l-5.2 5.8z"
                fill="#1e40af"
              />
            </svg>
            Secure &amp; HIPAA Compliant
          </span>
          <div className="bg-white/80 rounded p-3 shadow-md mb-4 w-full max-w-xs text-primary flex flex-col items-center text-xs sm:text-sm">
            <div>Contact Support:</div>
            <div className="font-semibold">support@acmehealth.com</div>
            <div className="font-mono">1-555-555-1234</div>
          </div>
          <div className="flex items-center gap-4 text-white/90 mt-4 text-xs">
            <a href="#" className="hover:underline focus:underline focus:outline-none">
              Terms
            </a>
            <span aria-hidden="true">•</span>
            <a href="#" className="hover:underline focus:underline focus:outline-none">
              Privacy
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
