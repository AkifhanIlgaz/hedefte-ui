"use client";

import { authText } from "@/src/features/auth/auth.text";
import {
  AuthDivider,
  AuthHeader,
  LoginForm,
  SignInWithGoogle,
} from "@/src/features/auth/components";

export default function LoginPage() {
  return (
    <div className="w-full space-y-8">
      <AuthHeader
        title={authText.welcomeBack}
        subtitle={authText.signInSubtitle}
      />
      <SignInWithGoogle />
      <AuthDivider />
      <LoginForm />
    </div>
  );
}
