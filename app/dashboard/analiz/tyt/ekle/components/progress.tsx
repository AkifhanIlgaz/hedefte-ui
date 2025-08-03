import { Check } from "lucide-react";

interface Props {
  currentStep: number;
}

export function ProgressIndicator({ currentStep }: Props) {
  return (
    <div className="flex justify-center mb-6 ">
      <div className="flex items-center gap-4">
        <div
          className={`flex items-center gap-2 ${
            currentStep === 1 ? "text-primary" : "text-green-600"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep === 1
                ? "bg-primary text-primary-foreground"
                : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
            }`}
          >
            {currentStep === 1 ? 1 : <Check className="size-4" />}
          </div>
          <span className="font-medium">Temel Sonuçlar</span>
        </div>
        <div
          className={`w-16 h-0.5 ${
            currentStep === 2 ? "bg-primary" : "bg-muted"
          }`}
        />
        <div
          className={`flex items-center gap-2 ${
            currentStep === 2 ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep === 2
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            2
          </div>
          <span className="font-medium">Konu Bazında Yanlışlar</span>
        </div>
      </div>
    </div>
  );
}
