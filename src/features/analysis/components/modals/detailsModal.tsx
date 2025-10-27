"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { text } from "@/lib/constants/text";
import { TopicAnalysis } from "@/src/shared/domain/topic/topic.type";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { TopicAnalysisRequest } from "../../validations/analysis.validation";

interface DetailsProps {
  lessonIndex: number;
  topicAnalysis: TopicAnalysisRequest[];
  updateTopicAnalysis?: (
    lessonIndex: number,
    topicAnalysis: TopicAnalysisRequest[],
  ) => void;
}

export default function DetailsModal({
  topicAnalysis,
  lessonIndex,
  updateTopicAnalysis,
}: DetailsProps) {
  const [allMistakes, setMistakes] = useState(topicAnalysis);

  const update = (idx: number, val: number) => {
    const updatedMistakes = [...allMistakes];
    updatedMistakes[idx].mistakes = val;
    setMistakes(updatedMistakes);
  };

  const deleteTopic = (idx: number) => {
    const updatedMistakes = [...allMistakes];
    updatedMistakes.splice(idx, 1);
    setMistakes(updatedMistakes);
  };

  useEffect(() => {
    setMistakes(topicAnalysis);
  }, [topicAnalysis]);

  return (
    <Dialog>
      <DialogTrigger className="gap-2" asChild>
        <Button
          variant="default"
          size="sm"
          className="group-hover:shadow-md transition-all duration-300 bg-orange-600 hover:bg-orange-700 text-white dark:bg-orange-500 dark:hover:bg-orange-600"
        >
          {text.analysis.common.buttons.details}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{text.analysis.modal.details.title}</DialogTitle>
          <DialogDescription>
            {text.analysis.modal.details.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-8">
          {(allMistakes || []).map((tm: TopicAnalysisRequest, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg"
            >
              <div>
                <div className="font-medium text-amber-800 dark:text-amber-200 text-sm">
                  {tm.name}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => update(idx, tm.mistakes - 1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="text-sm font-medium w-8 text-center">
                    {tm.mistakes}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => update(idx, tm.mistakes + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-danger hover:text-danger"
                  onClick={() => deleteTopic(idx)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive">
              {text.analysis.common.buttons.cancel}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="bg-primary text-primary-foreground"
              onClick={() => updateTopicAnalysis!(lessonIndex, allMistakes)}
            >
              {text.analysis.common.buttons.save}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
