"use client";

import { text } from "@/lib/constants/text";
import { routes } from "@/lib/routes";
import { createClient } from "@/lib/supabase/client";
import { LoginRequest, loginSchema } from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (req: LoginRequest) => {
    const { error } = await createClient().auth.signInWithPassword(req);
    if (error) {
      form.setError("email", {
        type: "manual",
        message: "Giriş başarısız: " + error.message,
      });
      return;
    }

    console.log("basarili");
  };

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          {text.auth.welcomeBack}
        </h1>
        <p className="text-default-500">{text.auth.signInSubtitle}</p>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full h-11 bg-background border-default-200 hover:bg-default-50"
          onClick={() => {
            createClient().auth.signInWithOAuth({
              provider: "google",
            });
          }}
          disabled={isLoading}
        >
          <IconBrandGoogle />
          {text.auth.google}
        </Button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-default-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-default-500">
            {text.auth.withEmail}
          </span>
        </div>
      </div>

      {/* Login Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.auth.labels.email}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder={text.auth.placeholders.email}
                        className=" pl-10 pr-10 h-11 border-b-2 border-t-0 border-x-0 border-default-200 rounded-none bg-transparent focus-visible:border-primary hover:border-default-400 shadow-none"
                        required
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.auth.labels.password}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={text.auth.placeholders.password}
                        className="pl-10 pr-10 h-11 border-b-2 border-t-0 border-x-0 border-default-200 rounded-none bg-transparent focus-visible:border-primary hover:border-default-400 shadow-none"
                        required
                        {...field}
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
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" defaultChecked />
              <Label
                htmlFor="remember"
                className=" text-default-600 cursor-pointer"
              >
                {text.auth.labels.rememberMe}
              </Label>
            </div>

            <Label
              onClick={() => router.push(routes.forgotPassword)}
              className="text-sm text-primary hover:text-primary/80 cursor-pointer"
            >
              {text.auth.labels.forgotPassword}
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
                {text.auth.signingIn}
              </>
            ) : (
              text.auth.buttons.login
            )}
          </Button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-default-500 ">
            {text.auth.dontHaveAccount}
            <button
              type="button"
              onClick={() => router.push(routes.register)}
              className="text-primary hover:text-primary/80 font-medium transition-colors ml-2 cursor-pointer"
              disabled={isLoading}
            >
              {text.auth.buttons.register}
            </button>
          </p>
        </form>
      </Form>
    </div>
  );
}
