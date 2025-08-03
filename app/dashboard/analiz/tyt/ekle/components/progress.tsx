import { CheckCircle2 } from "lucide-react";

interface Props {
  currentStep: number;
}

export function ProgressIndicator({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-center gap-8 py-4 ">
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center gap-2 ${
            currentStep === 1 ? "text-amber-400" : "text-green-600"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep === 1
                ? "flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white font-semibold text-sm"
                : "bg-green-100 text-green-400 dark:bg-green-900 dark:text-green-300"
            }`}
          >
            {currentStep === 1 ? 1 : <CheckCircle2 className="w-4 h-4" />}
          </div>
          <span className=" text-sm font-medium ">Temel Sonuçlar</span>
        </div>
        <div
          className={`w-16 h-0.5 ${
            currentStep === 2 ? "bg-primary" : "bg-muted"
          }`}
        ></div>
        <div
          className={`flex items-center gap-2 ${
            currentStep === 2 ? "text-amber-400" : "text-muted-foreground"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep === 2
                ? "flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white font-semibold text-sm"
                : "bg-muted"
            }`}
          >
            2
          </div>
          <span className="text-sm font-medium">
            Konu Bazında Yanlışlar
          </span>
        </div>
      </div>
    </div>
  );
}
