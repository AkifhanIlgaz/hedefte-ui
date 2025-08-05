import { Button } from "@/components/ui/button";
import { text } from "@/lib/constants/text";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  currentStep: number;
}

export function Header({ title, currentStep }: HeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 mb-8">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          router.back();
        }}
        className="w-10 h-10 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/20"
      >
        <ArrowLeft className="w-10 h-10" />
      </Button>
      <div className="flex flex-col space-y-0">
        <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
        <p className="text-lg text-muted-foreground">
          {currentStep === 1
            ? text.analysis.firstStep.subtitle
            : text.analysis.secondStep.subtitle}
        </p>
      </div>
    </div>
  );
}
