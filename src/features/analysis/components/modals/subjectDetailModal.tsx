import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Info } from "lucide-react";
import { TopicAnalysis } from "../../validations/analysis.validation";

export default function SubjectDetailModal({
  name,
  topicMistakes,
}: {
  name: string;
  topicMistakes: TopicAnalysis[];
}) {
  // Aynı konuları grupla ve mistake sayılarını topla
  const groupedTopics = topicMistakes
    .reduce((acc, topic) => {
      const existing = acc.find((item) => item.topicId === topic.topicId);
      if (existing) {
        existing.mistakes += topic.mistakes;
      } else {
        acc.push({ ...topic });
      }
      return acc;
    }, [] as TopicAnalysis[])
    .sort((a, b) => b.mistakes - a.mistakes);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-amber-700 border-amber-200 hover:bg-amber-50 hover:text-amber-800"
        >
          <Info className="w-4 h-4 mr-1" />
          Ayrıntılar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <div className="p-1 bg-amber-100 rounded">
              <Info className="w-5 h-5 text-amber-700" />
            </div>
            {name} - Konu Analizi
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Çözemediğin konular ve toplam yanlış sayıları
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {groupedTopics.length > 0 ? (
            groupedTopics.map((topic, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg transition-colors hover:bg-amber-100 dark:hover:bg-amber-900/20"
              >
                <span className="text-sm font-medium text-amber-900 dark:text-amber-100">
                  {topic.topicName}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full font-semibold">
                    {topic.mistakes} yanlış
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-amber-600">
              <Eye className="w-12 h-12 mx-auto mb-3 text-amber-400" />
              <p>Bu ders için henüz konu hatası bulunmuyor.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
