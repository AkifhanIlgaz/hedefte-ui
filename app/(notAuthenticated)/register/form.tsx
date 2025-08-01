import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { text } from "@/lib/constants/text";
import { routes } from "@/lib/routes";
import { supabase } from "@/lib/supabase/actions";
import {
  RegisterRequest,
  registerSchema,
} from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Check, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import { Input } from "../../../components/ui/input";

interface PasswordStrengthProps {
  password: string;
}

function PasswordStrength({ password }: PasswordStrengthProps) {
  const requirements = [
    { label: "En az 8 karakter", test: (pwd: string) => pwd.length >= 8 }, // PASSWORD_MIN_LENGTH_TEXT
    { label: "Büyük harf içerir", test: (pwd: string) => /[A-Z]/.test(pwd) }, // PASSWORD_UPPERCASE_TEXT
    { label: "Küçük harf içerir", test: (pwd: string) => /[a-z]/.test(pwd) }, // PASSWORD_LOWERCASE_TEXT
    { label: "Sayı içerir", test: (pwd: string) => /\d/.test(pwd) }, // PASSWORD_NUMBER_TEXT
  ];

  const strength = requirements.filter((req) => req.test(password)).length;
  const strengthColors = ["bg-danger", "bg-danger", "bg-warning", "bg-success"];
  const strengthText = ["Zayıf", "Kötü", "İyi", "Güçlü"]; // PASSWORD_STRENGTH_LABELS

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-default-200 rounded-full h-2">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              password
                ? strengthColors[strength - 1] || "bg-default-200"
                : "bg-default-200"
            }`}
            style={{ width: `${(strength / requirements.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-default-500">
          {password ? strengthText[strength - 1] || "Çok Zayıf" : ""}{" "}
          {/* PASSWORD_STRENGTH_DEFAULT */}
        </span>
      </div>

      <div className="space-y-1">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full flex items-center justify-center ${
                req.test(password) ? "bg-success" : "bg-default-200"
              }`}
            >
              {req.test(password) && <Check className="w-2 h-2 text-white" />}
            </div>
            <span
              className={`text-xs ${
                req.test(password) ? "text-success" : "text-default-400"
              }`}
            >
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SignupForm() {
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
    console.log(req);

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

    const { error } = await supabase.auth.signUp(credentials);
    if (error) {
      form.setError("email", {
        type: "manual",
        message: "Giriş başarısız: " + error.message,
      });
      return;
    }

    console.log("basarili");
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          {text.auth.registerTitle}
        </h1>
        <p className="text-default-500">
          {text.auth.registerSubtitle} {/* SIGNUP_SUBTITLE */}
        </p>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full h-11 bg-background border-default-200 hover:bg-default-50"
          onClick={() => {
            supabase.auth.signInWithOAuth({
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
            {text.auth.withEmail} {/* OR_CONTINUE_WITH_EMAIL */}
          </span>
        </div>
      </div>

      {/* Form */}
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
                      <FormLabel> {text.auth.labels.firstName}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 w-4 h-4" />
                          <Input
                            id="firstName"
                            placeholder={text.auth.placeholders.firstName} // FIRST_NAME_PLACEHOLDER
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
                      <FormLabel> {text.auth.labels.lastName}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 w-4 h-4" />
                          <Input
                            id="lastName"
                            placeholder={text.auth.placeholders.lastName} // LAST_NAME_PLACEHOLDER
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
                    <FormLabel> {text.auth.labels.email}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 w-4 h-4" />
                        <Input
                          id="email"
                          type="email"
                          placeholder={text.auth.placeholders.email} // EMAIL_PLACEHOLDER
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
                    <FormLabel> {text.auth.labels.password}</FormLabel>
                    <FormControl>
                      <div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 w-4 h-4" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder={text.auth.placeholders.password} // CONFIRM_PASSWORD_PLACEHOLDER
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
                    <FormLabel> {text.auth.labels.confirmPassword}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 w-4 h-4" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder={text.auth.placeholders.confirmPassword} // CONFIRM_PASSWORD_PLACEHOLDER
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
                Hesap oluşturuluyor...
              </>
            ) : (
              text.auth.buttons.register
            )}
          </Button>

          {/* Sign In Link */}
          <p className="text-center text-sm text-default-500">
            {text.auth.alreadyHaveAccount}
            <button
              type="button"
              onClick={() => router.push(routes.login)}
              className="text-primary ml-2 hover:text-primary/80 font-medium transition-colors cursor-pointer"
              disabled={isLoading}
            >
              {text.auth.buttons.login}
            </button>
          </p>
        </form>
      </Form>
    </div>
  );
}
