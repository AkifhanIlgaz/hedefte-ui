import { text } from "@/lib/constants/text";
import { CheckCircle2 } from "lucide-react";

interface Props {
  currentStep: number;
}

interface StepProps {
  stepNumber: number;
  currentStep: number;
  label: string;
  isLast?: boolean;
}

function Step({ stepNumber, currentStep, label, isLast = false }: StepProps) {
  const isActive = currentStep === stepNumber;
  const isCompleted = currentStep > stepNumber;

  const getStepStyles = () => {
    if (isActive) {
      return {
        container: "text-amber-400",
        circle:
          "w-6 h-6 rounded-full bg-amber-500 text-white font-semibold text-sm",
      };
    }

    if (isCompleted) {
      return {
        container: "text-green-600",
        circle:
          "w-8 h-8 rounded-full bg-green-100 text-green-400 dark:bg-green-900 dark:text-green-300",
      };
    }

    return {
      container: "text-muted-foreground",
      circle: "w-8 h-8 rounded-full bg-muted",
    };
  };

  const styles = getStepStyles();

  return (
    <>
      <div className={`flex items-center gap-2 ${styles.container}`}>
        <div
          className={`flex items-center justify-center text-sm font-medium ${styles.circle}`}
        >
          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : stepNumber}
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>

      {!isLast && <div className={`w-16 h-0.5 bg-accent`} />}
    </>
  );
}

export default function AddProgressIndicator({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-center gap-8 py-4">
      <div className="flex items-center gap-3">
        <Step
          stepNumber={1}
          currentStep={currentStep}
          label={text.analysis.firstStep.label}
        />

        <Step
          stepNumber={2}
          currentStep={currentStep}
          label={text.analysis.secondStep.label}
          isLast={true}
        />
      </div>
    </div>
  );
}
