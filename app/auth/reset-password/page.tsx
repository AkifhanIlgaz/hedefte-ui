"use client";

import { PasswordStrength } from "@/components/app/PasswordStrength";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { text } from "@/lib/constants/text";
import { routes } from "@/lib/routes";
import { createClient } from "@/lib/supabase/client";
import {
  ResetPasswordRequest,
  resetPasswordSchema,
} from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check, Eye, EyeOff, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ResetPasswordPage() {
  const router = useRouter();
  const form = useForm<ResetPasswordRequest>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (req: ResetPasswordRequest) => {
    setIsLoading(true);

    const { error } = await createClient().auth.updateUser({
      password: req.password,
    });

    if (error) {
      alert(error);
    }

    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              {text.auth.passwordUpdated}
            </h1>
            <p className="text-default-500">
              {text.auth.passwordUpdatedSubtitle}
            </p>
          </div>
        </div>

        <Button
          onClick={() => {
            router.push(routes.login);
          }}
          className="w-full h-11"
        >
          {text.auth.buttons.login}
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          {text.auth.createNewPassword}
        </h1>
        <p className="text-default-500">
          {text.auth.createNewPasswordSubtitle}
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> {text.auth.labels.password}</FormLabel>
                    <FormControl>
                      <div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 w-4 h-4" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder={text.auth.placeholders.password}
                            className={`pl-10 pr-10 h-11 border-b-2 border-t-0 border-x-0 rounded-none bg-transparent transition-all duration-200 ${
                              form.getValues().confirmPassword &&
                              form.getValues().password !==
                                form.getValues().confirmPassword
                                ? "border-danger hover:border-danger focus-visible:border-danger"
                                : "border-default-200 hover:border-default-400 focus-visible:border-primary"
                            }`}
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
                        {form.getValues().password && (
                          <div className="mt-3">
                            <PasswordStrength
                              password={form.getValues().password}
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> {text.auth.labels.confirmPassword}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 w-4 h-4" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder={text.auth.placeholders.confirmPassword}
                          className={`pl-10 pr-10 h-11 border-b-2 border-t-0 border-x-0 rounded-none bg-transparent transition-all duration-200 ${
                            form.getValues().confirmPassword &&
                            form.getValues().password !==
                              form.getValues().confirmPassword
                              ? "border-danger hover:border-danger focus-visible:border-danger"
                              : "border-default-200 hover:border-default-400 focus-visible:border-primary"
                          }`}
                          required
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-default-400 hover:text-default-600 transition-colors"
                        >
                          {showConfirmPassword ? (
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
          </div>

          <div className="space-y-4">
            <Button type="submit" className="w-full h-11">
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {text.auth.updatingPassword}
                </>
              ) : (
                text.auth.buttons.updatePassword
              )}
            </Button>

            <Button
              type="button"
              onClick={() => router.push(routes.login)}
              variant="ghost"
              className="w-full h-11"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {text.auth.buttons.returnLogin}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
