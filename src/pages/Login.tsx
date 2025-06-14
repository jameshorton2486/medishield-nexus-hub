
import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FIRM_LOGO =
  "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=facearea&w=80&h=80&q=80&facepad=2";
const BRAND_BG =
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  }

  function handleTogglePassword() {
    setShowPassword(v => !v);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Placeholder: Simulate failed login for error UI demo
    setTimeout(() => {
      setLoading(false);
      setError("Invalid credentials. Please try again.");
    }, 1200);
  }

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-background">
      {/* Left: Form */}
      <div className="w-full sm:w-2/5 flex flex-col justify-center px-6 py-10 sm:px-12 bg-white shadow-soft z-10">
        <div className="flex flex-col items-center mb-10">
          <img
            src={FIRM_LOGO}
            alt="Firm Logo"
            className="w-16 h-16 rounded-full bg-gray-100 object-cover mb-3"
          />
          <span className="text-lg font-semibold tracking-wide text-primary">Medical Records Platform</span>
        </div>
        <form className="space-y-5 max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-2xl font-bold mb-1">Sign In to Your Account</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Enter your credentials to access the secure portal.
            </p>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              autoFocus
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="username"
              required
              placeholder="you@lawfirm.com"
              aria-describedby="email-help"
              disabled={loading}
            />
            <div className="text-xs mt-1 text-muted-foreground" id="email-help">
              Use your work email for secure access.
            </div>
          </div>
          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              placeholder="********"
              disabled={loading}
              className="pr-10"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={handleTogglePassword}
              tabIndex={-1}
              className="absolute top-9 right-3 text-gray-500 hover:text-primary focus:outline-none"
              style={{ background: "none", border: "none" }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <div className="flex justify-between items-center mt-1">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  name="remember"
                  checked={form.remember}
                  onCheckedChange={(v) =>
                    setForm(f => ({ ...f, remember: v === true }))
                  }
                  disabled={loading}
                />
                <Label htmlFor="remember" className="text-xs">
                  Remember Me
                </Label>
              </div>
              <a
                href="#"
                className="text-xs text-primary hover:underline underline-offset-2"
                tabIndex={loading ? -1 : 0}
              >
                Forgot Password?
              </a>
            </div>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            className="w-full font-semibold"
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
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
      {/* Right: Branding */}
      <div
        className="relative w-full sm:w-3/5 flex flex-col items-center justify-center overflow-hidden py-10 px-6"
        style={{
          backgroundImage: `url('${BRAND_BG}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-primary opacity-70 z-0"></div>
        <div className="relative z-10 flex flex-col items-center text-center px-2">
          <img
            src={FIRM_LOGO}
            alt="Firm Logo Large"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white shadow-lg object-cover mb-4 border-2 border-white"
          />
          <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-1">
            Acme Health Law Group
          </div>
          <div className="text-white text-base mb-6 font-medium">
            Streamline Your Medical Records Management
          </div>
          <span className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/80 text-primary mb-4 font-semibold text-xs sm:text-sm border border-primary shadow-sm">
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <circle cx="8" cy="8" r="7" stroke="#1e40af" strokeWidth="2" />
              <path d="M6.8 12l-3-3 1.2-1.2 1.8 1.8 4.2-4.2L13 6.2l-5.2 5.8z" fill="#1e40af" />
            </svg>
            Secure &amp; HIPAA Compliant
          </span>
          <div className="bg-white/80 rounded p-3 shadow-md mb-4 w-full max-w-xs text-primary flex flex-col items-center text-xs sm:text-sm">
            <div>Contact Support:</div>
            <div className="font-semibold">support@acmehealth.com</div>
            <div className="font-mono">1-555-555-1234</div>
          </div>
          <div className="flex items-center gap-4 text-white/80 mt-4 text-xs">
            <a href="#" className="hover:underline">Terms</a>
            <span aria-hidden="true">•</span>
            <a href="#" className="hover:underline">Privacy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
