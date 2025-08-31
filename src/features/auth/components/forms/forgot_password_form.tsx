"use client";

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
import { createClient } from "@/src/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authText } from "../../auth.text";
import { ForgotPasswordRequest, forgotPasswordSchema } from "../../validations";
import AuthHeader from "../shared/header";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (req: ForgotPasswordRequest) => {
    try {
      setIsLoading(true);

      const { error } = await createClient().auth.resetPasswordForEmail(
        req.email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (error) {
        form.setError("email", {
          type: "manual",
          message: error?.message ?? String(error),
        });
        return;
      }

      setIsSubmitted(true);
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

  if (isSubmitted) {
    return <Submitted email={form.getValues().email} />;
  }

  return (
    <>
      <AuthHeader
        title={authText.forgotPassword}
        subtitle={authText.enterEmail}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
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
                        className="pl-10 h-11 border-b-2 border-t-0 border-x-0 border-default-200 rounded-none bg-transparent focus-visible:border-primary hover:border-default-400"
                        required
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <Button type="submit" className="w-full h-11">
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {authText.sendingLink}
                </>
              ) : (
                authText.buttons.sendResetLink
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full h-11"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {authText.buttons.returnLogin}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

interface SubmittedProps {
  email: string;
}

function Submitted({ email }: SubmittedProps) {
  const router = useRouter();

  return (
    <>
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {authText.checkEmail}
          </h1>
          <p className="text-default-500">
            Şifre sıfırlama bağlantısını{" "}
            <span className="font-medium text-foreground">{email}</span>{" "}
            adresine gönderdik.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-default-50 border border-default-200 rounded-lg">
          <p className="text-sm text-default-600">{authText.checkSpam}</p>
        </div>

        <Button
          onClick={() => router.back()}
          variant="outline"
          className="w-full h-11"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {authText.buttons.returnLogin}
        </Button>
      </div>
    </>
  );
}
