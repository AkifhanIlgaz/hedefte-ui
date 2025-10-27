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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { text } from "@/lib/constants/text";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TopicAnalysisRequest,
  topicAnalysisSchema,
} from "../../validations/analysis.validation";
import { Topic, TopicAnalysis } from "@/src/shared/domain/topic/topic.type";

interface ModalProps {
  addTopicAnalysis: (
    lessonIndex: number,
    topicId: string,
    val: number,
    name: string,
  ) => void;
  topics: Topic[];
  lessonIndex: number;
}

export default function AddTopicAnalysisModal({
  addTopicAnalysis,
  topics,
  lessonIndex,
}: ModalProps) {
  const form = useForm<TopicAnalysisRequest>({
    resolver: zodResolver(topicAnalysisSchema),
    defaultValues: {
      topicId: "",
      name: "",
      mistakes: 1,
    },
  });

  const [open, setOpen] = useState(false);

  function onSubmit(data: TopicAnalysisRequest) {
    addTopicAnalysis(lessonIndex, data.topicId, data.mistakes, data.name);
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen((open) => !open);
        form.reset();
      }}
    >
      <DialogTrigger className="gap-2" asChild>
        <Button
          variant="default"
          size="sm"
          className="w-full group-hover:shadow-md transition-all duration-300 bg-primary hover:bg-primary/90"
        >
          {text.analysis.common.buttons.addTopic}
        </Button>
      </DialogTrigger>
      <Form {...form}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{text.analysis.modal.addTopic.title}</DialogTitle>
            <DialogDescription>
              {text.analysis.modal.addTopic.description}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="topicId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    value={field.value}
                    onValueChange={(val) => {
                      const selectedTopic = topics.find(
                        (t) => t.topicId === val,
                      );
                      field.onChange(selectedTopic?.name);
                      if (selectedTopic) {
                        form.setValue("topicId", selectedTopic.topicId);
                        form.setValue("name", selectedTopic.name);
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            text.analysis.modal.addTopic.selectPlaceholder
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {topics.map((t: Topic) => (
                        <SelectItem key={t.topicId} value={t.topicId}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mistakes"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        onClick={() =>
                          form.setValue(
                            `mistakes`,
                            form.getValues().mistakes - 1,
                          )
                        }
                      >
                        <Minus />
                      </Button>
                      <Input
                        type="number"
                        min={1}
                        className="max-w-1/6 text-center font-extrabold"
                        {...field}
                      ></Input>
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        onClick={() =>
                          form.setValue(
                            `mistakes`,
                            form.getValues().mistakes + 1,
                          )
                        }
                      >
                        <Plus />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="destructive">
                {text.analysis.common.buttons.cancel}
              </Button>
            </DialogClose>
            <Button onClick={form.handleSubmit(onSubmit)} className="gap-2">
              <Plus className="w-4 h-4" />
              {text.analysis.common.buttons.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
