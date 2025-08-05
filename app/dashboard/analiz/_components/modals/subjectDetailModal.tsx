import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { subjectPerformanceData } from "../tabContents/detailedContent";

export default function SubjectDetailModal({
  subject,
}: {
  subject: (typeof subjectPerformanceData)[0];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Ayrıntılar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{subject.subject}</DialogTitle>
          <DialogDescription>Çözemediğin konular ve sayıları</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          {subject.weakestTopics.map((topic, index) => (
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
      </DialogContent>
    </Dialog>
  );
}
