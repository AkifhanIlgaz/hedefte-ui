"use client";

import { ImageCarousel } from "@/components/app/ImageCarousel";
import { ForgotPasswordForm } from "./form";

export default function ForgotPasswordFlow() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Visual Storytelling */}
      <div className="hidden md:flex md:w-1/2 relative">
        <ImageCarousel />
      </div>

      {/* Right Panel - Forgot Password Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
