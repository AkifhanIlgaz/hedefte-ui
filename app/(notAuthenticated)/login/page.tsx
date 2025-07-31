"use client";

import { ImageCarousel } from "@/components/app/ImageCarousel";
import { LoginForm } from "./form";

export default function SigninFlow() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Visual Storytelling */}
      <div className="hidden md:flex md:w-1/2 relative">
        <ImageCarousel />
      </div>

      {/* Right Panel - Signin Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
