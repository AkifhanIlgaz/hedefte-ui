import { Button } from "@/components/ui/button";
import { BookOpen, Calculator, FlaskConical, Globe } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { radarData } from "../tabContents/detailedContent";

export default function SubjectDetailModal({
  subject,
}: {
  subject: (typeof radarData)[0];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Ayrıntılar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{subject.subject} Detayları</DialogTitle>
          <DialogDescription>
            En çok yanlış yapılan konular ve sayıları
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">
                {subject.averageNet}
              </div>
              <div className="text-amber-600">Ortalama Net</div>
            </div>
            <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {subject.wrongCount}
              </div>
              <div className="text-red-600">En Çok Yanlış</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-foreground">
              Konu Bazında Yanlışlar:
            </h4>
            {subject.topicDetails.map((topic, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 bg-muted rounded"
              >
                <span className="text-sm font-medium">{topic.topic}</span>
                <span className="text-sm text-red-600 font-semibold">
                  {topic.wrongCount} yanlış
                </span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
