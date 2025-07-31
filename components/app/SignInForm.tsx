"use client";

import { routes } from "@/lib/routes";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function SigninForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const updateLoginData = (data: Partial<typeof loginData>) => {
    setLoginData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Login submitted:", loginData);
    // Here you would typically send the data to your backend for authentication
    // For demo purposes, we'll extract name from email and navigate to dashboard
    const name = loginData.email
      .split("@")[0]
      .replace(".", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    setIsLoading(false);
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Welcome back</h1>
        <p className="text-default-500">Sign in to your account to continue</p>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full h-11 bg-background border-default-200 hover:bg-default-50"
          disabled={isLoading}
        >
          <IconBrandGoogle />
          Continue with Google
        </Button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-default-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-default-500">
            Or continue with email
          </span>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={(e) => updateLoginData({ email: e.target.value })}
                className="pl-10 h-11"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 w-4 h-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) => updateLoginData({ password: e.target.value })}
                className="pl-10 pr-10 h-11 "
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-default-400 hover:text-default-600 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={loginData.rememberMe}
              onCheckedChange={(checked) =>
                updateLoginData({ rememberMe: checked === true })
              }
              disabled={isLoading}
            />
            <Label
              htmlFor="remember"
              className=" text-default-600 cursor-pointer"
            >
              Beni Hatırla
            </Label>
          </div>

          <Label
            onClick={() => router.push(routes.forgotPassword)}
            className="text-sm text-primary hover:text-primary/80 cursor-pointer"
          >
            Şifremi unuttum
          </Label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-default-500 ">
          {"Don't have an account ?"}
          <button
            type="button"
            onClick={() => router.push(routes.signup)}
            className="text-primary hover:text-primary/80 font-medium transition-colors mr-2"
            disabled={isLoading}
          >
            Kaydol
          </button>
        </p>
      </form>
    </div>
  );
}
