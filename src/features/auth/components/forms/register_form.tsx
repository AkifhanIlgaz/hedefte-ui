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
import { createClient } from "@/src/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authRoutes } from "../../auth.routes";
import { authText } from "../../auth.text";
import { RegisterRequest, registerSchema } from "../../validations";
import PasswordStrength from "../shared/password_strength";

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (req: RegisterRequest) => {
    try {
      setIsLoading(true);

      const credentials: SignUpWithPasswordCredentials = {
        email: req.email,
        password: req.password,
        options: {
          data: {
            firstName: req.firstName,
            lastName: req.lastName,
            agreeToTerms: req.agreeToTerms,
          },
        },
      };

      const { error } = await createClient().auth.signUp(credentials);

      if (error) {
        form.setError("email", {
          type: "manual",
          message: "Kayıt başarısız: " + error.message,
        });
        return;
      }

      // Başarılı kayıt sonrası yönlendirme veya bilgi
      router.push(authRoutes.login);
    } catch (err) {
      form.setError("email", {
        type: "manual",
        message:
          err instanceof Error
            ? err.message
            : "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              {/* Name Fields */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> {authText.labels.firstName}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 w-4 h-4" />
                        <Input
                          id="firstName"
                          placeholder={authText.placeholders.firstName} // FIRST_NAME_PLACEHOLDER
                          className="pl-10 h-11 border-b-2 border-t-0 border-x-0 border-default-200 rounded-none bg-transparent focus-visible:border-primary hover:border-default-400"
                          required
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> {authText.labels.lastName}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 w-4 h-4" />
                        <Input
                          id="lastName"
                          placeholder={authText.placeholders.lastName} // LAST_NAME_PLACEHOLDER
                          className="pl-10 h-11 border-b-2 border-t-0 border-x-0 border-default-200 rounded-none bg-transparent focus-visible:border-primary hover:border-default-400"
                          required
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> {authText.labels.email}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder={authText.placeholders.email} // EMAIL_PLACEHOLDER
                        className="pl-10 h-11 border-b-2 border-t-0 border-x-0 border-default-200 rounded-none bg-transparent focus-visible:border-primary hover:border-default-400"
                        required
                        disabled={isLoading}
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> {authText.labels.password}</FormLabel>
                  <FormControl>
                    <div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 w-4 h-4" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder={authText.placeholders.password} // CONFIRM_PASSWORD_PLACEHOLDER
                          className={`pl-10 pr-10 h-11 border-b-2 border-t-0 border-x-0 rounded-none bg-transparent transition-all duration-200 ${
                            form.getValues().confirmPassword &&
                            form.getValues().password !==
                              form.getValues().confirmPassword
                              ? "border-danger hover:border-danger focus-visible:border-danger"
                              : "border-default-200 hover:border-default-400 focus-visible:border-primary"
                          }`}
                          required
                          disabled={isLoading}
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
                  <FormLabel> {authText.labels.confirmPassword}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={authText.placeholders.confirmPassword} // CONFIRM_PASSWORD_PLACEHOLDER
                        className={`pl-10 pr-10 h-11 border-b-2 border-t-0 border-x-0 rounded-none bg-transparent transition-all duration-200 ${
                          form.getValues().confirmPassword &&
                          form.getValues().password !==
                            form.getValues().confirmPassword
                            ? "border-danger hover:border-danger focus-visible:border-danger"
                            : "border-default-200 hover:border-default-400 focus-visible:border-primary"
                        }`}
                        required
                        disabled={isLoading}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-default-400 hover:text-default-600 transition-colors"
                        disabled={isLoading}
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

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      id="terms"
                      disabled={isLoading}
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                      className="mt-0.5"
                    />
                  </FormControl>
                  <div>
                    <Label
                      htmlFor="terms"
                      className="text-sm leading-5 cursor-pointer text-muted-foreground"
                    >
                      <a
                        href="#"
                        className="text-primary hover:text-primary/80 underline"
                      >
                        Kullanım Şartları
                      </a>{" "}
                      ve{" "}
                      <a
                        href="#"
                        className="text-primary hover:text-primary/80 underline"
                      >
                        Gizlilik Politikası
                      </a>{" "}
                      kabul ediyorum.
                    </Label>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full h-11" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              {authText.creatingAccount}
            </>
          ) : (
            authText.buttons.register
          )}
        </Button>

        {/* Sign In Link */}
        <p className="text-center text-sm text-default-500">
          {authText.alreadyHaveAccount}
          <button
            type="button"
            onClick={() => router.push(authRoutes.login)}
            className="text-primary ml-2 hover:text-primary/80 font-medium transition-colors cursor-pointer"
            disabled={isLoading}
          >
            {authText.buttons.login}
          </button>
        </p>
      </form>
    </Form>
  );
}
