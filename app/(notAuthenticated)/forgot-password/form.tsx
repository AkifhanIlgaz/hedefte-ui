import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { text } from "@/lib/constants/text";
import {
  ForgotPasswordRequest,
  forgotPasswordSchema,
} from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

export function ForgotPasswordForm() {
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
    // TODO: Implement flow
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
              {text.auth.checkEmail}
            </h1>
            <p className="text-default-500">
              Şifre sıfırlama bağlantısını{" "}
              <span className="font-medium text-foreground">
                {form.getValues().email}
              </span>{" "}
              adresine gönderdik.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-default-50 border border-default-200 rounded-lg">
            <p className="text-sm text-default-600">{text.auth.checkSpam}</p>
          </div>

          <Button
            onClick={() => router.back()}
            variant="outline"
            className="w-full h-11"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {text.auth.buttons.returnLogin}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          {text.auth.forgotPassword}
        </h1>
        <p className="text-default-500">{text.auth.enterEmail}</p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
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
            <Button type="submit" className="w-full h-11" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {text.auth.sendingLink}
                </>
              ) : (
                text.auth.buttons.sendResetLink
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full h-11"
              onClick={() => router.back()}
              disabled={isLoading}
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
