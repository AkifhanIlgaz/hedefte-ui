import { text } from "@/lib/constants/text";

interface HeaderProps {
  title: string;
  currentStep: number;
}

export function Header({ title, currentStep }: HeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
      <p className="text-lg text-muted-foreground">
        {currentStep === 1
          ? text.analysis.firstStep.subtitle
          : text.analysis.secondStep.subtitle}
      </p>
    </div>
  );
}
