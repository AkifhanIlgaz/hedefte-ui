"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { routes } from "@/src/config/routes";
import { createClient } from "@/src/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authRoutes } from "../../auth.routes";
import { authText } from "../../auth.text";
import { LoginRequest, loginSchema } from "../../validations";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (req: LoginRequest) => {
    try {
      setIsLoading(true);
      const { error } = await createClient().auth.signInWithPassword(req);
      if (error) {
        form.setError("email", {
          type: "manual",
          message: "Giriş başarısız: " + error.message,
        });
        return;
      }

      router.push(routes.dashboard.home);
    } catch (err) {
      form.setError("email", {
        type: "manual",
        message: "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{authText.labels.email}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={authText.placeholders.email}
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
                <FormLabel>{authText.labels.password}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={authText.placeholders.password}
                      className="pl-10 pr-10 h-11 border-b-2 border-t-0 border-x-0 border-default-200 rounded-none bg-transparent focus-visible:border-primary hover:border-default-400 shadow-none"
                      required
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-default-400 hover:text-default-600 transition-colors"
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
              {authText.labels.rememberMe}
            </Label>
          </div>

          <Label
            onClick={() => router.push(authRoutes.forgotPassword)}
            className="text-sm text-primary hover:text-primary/80 cursor-pointer"
          >
            {authText.labels.forgotPassword}
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
              {authText.signingIn}
            </>
          ) : (
            authText.buttons.login
          )}
        </Button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-default-500 ">
          {authText.dontHaveAccount}
          <button
            type="button"
            onClick={() => router.push(authRoutes.register)}
            className="text-primary hover:text-primary/80 font-medium transition-colors ml-2 cursor-pointer"
            disabled={isLoading}
          >
            {authText.buttons.register}
          </button>
        </p>
      </form>
    </Form>
  );
}
