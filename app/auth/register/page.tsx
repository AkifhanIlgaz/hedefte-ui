"use client";

import { authText } from "@/src/features/auth/auth.text";
import {
  AuthDivider,
  AuthHeader,
  RegisterForm,
  SignInWithGoogle,
} from "@/src/features/auth/components";

export default function SignupForm() {
  return (
    <div className="w-full space-y-8">
      <AuthHeader
        title={authText.registerTitle}
        subtitle={authText.registerSubtitle}
      />
      <SignInWithGoogle />
      <AuthDivider />
      <RegisterForm />
    </div>
  );
}
