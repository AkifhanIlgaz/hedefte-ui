"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  TYTFormRequest,
  tytFormSchema,
} from "@/lib/validations/analysis.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";
import { tr } from "react-day-picker/locale";
import { useForm } from "react-hook-form";
interface TopicMistake {
  topic: string;
  mistakes: number;
}

interface ExamResult {
  id: string;
  date: string;
  examName: string;
  examType: "tyt" | "ayt";
  subjects: {
    name: string;
    correct: number;
    wrong: number;
    empty: number;
    total: number;
    topicMistakes?: TopicMistake[];
  }[];
  totalNet: number;
  notes?: string;
}

const tytSubjects = [
  { title: "Türkçe", subjects: [{ name: "Türkçe", id: "tr" }] },
  {
    title: "Sosyal Bilimler",
    subjects: [
      { name: "Tarih", id: "tarih" },
      { name: "Coğrafya", id: "cografya" },
      { name: "Felsefe", id: "felsefe" },
      { name: "Din", id: "din" },
    ],
  },
  { title: "Matematik", subjects: [{ name: "Matematik", id: "mat" }] },

  {
    title: "Fen Bilimleri",
    subjects: [
      { name: "Fizik", id: "fizik" },
      { name: "Kimya", id: "kimya" },
      { name: "Biyoloji", id: "biyoloji" },
    ],
  },
];

export default function AddTYTResultModal() {
  const form = useForm<TYTFormRequest>({
    resolver: zodResolver(tytFormSchema),
    defaultValues: {
      date: new Date(),
      name: "",
      notes: "",
      tr: {
        correct: 0,
        wrong: 0,
        empty: 0,
        topicMistakes: [],
      },
      tarih: {
        correct: 0,
        wrong: 0,
        empty: 0,
        topicMistakes: [],
      },
      cografya: {
        correct: 0,
        wrong: 0,
        empty: 0,
        topicMistakes: [],
      },
      felsefe: {
        correct: 0,
        wrong: 0,
        empty: 0,
        topicMistakes: [],
      },
      din: {
        correct: 0,
        wrong: 0,
        empty: 0,
        topicMistakes: [],
      },
      mat: {
        correct: 0,
        wrong: 0,
        empty: 0,
        topicMistakes: [],
      },
      fizik: {
        correct: 0,
        wrong: 0,
        empty: 0,
        topicMistakes: [],
      },
      kimya: {
        correct: 0,
        wrong: 0,
        empty: 0,
        topicMistakes: [],
      },
      biyoloji: {
        correct: 0,
        wrong: 0,
        empty: 0,
        topicMistakes: [],
      },
    },
  });

  const {
    formState: { errors },
  } = form;

  console.log(errors);

  const [editingItem, setEditingItem] = useState<ExamResult | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const onSubmit = async (req: TYTFormRequest) => {
    console.log(req);
  };

  const handleNextStep = () => {
    setCurrentStep(2);
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
  };

  return (
    <Dialog>
      <DialogTrigger className="gap-2" asChild>
        <Button size={"sm"}>
          <Plus className="w-4 h-4" />
          Deneme Sonucu Ekle
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl  max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? "Deneme Sonucunu Düzenle" : `TYT Deneme Sonucu Ekle`}{" "}
            -{currentStep === 1 ? " Temel Sonuçlar" : " Konu Bazında Yanlışlar"}
          </DialogTitle>
          <DialogDescription>
            {currentStep === 1
              ? "Deneme sonuçlarınızı derse göre girin."
              : "Hangi konulardan kaç yanlış yaptığınızı belirtin."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {currentStep === 1 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Deneme Tarihi</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={`w-[280px] justify-start text-left font-normal ${
                                    !field.value ? "text-muted-foreground" : ""
                                  }`}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {format(field.value, "PPP", {
                                    locale: tr,
                                  })}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                locale={tr}
                                selected={field.value}
                                onSelect={field.onChange}
                                captionLayout="label"
                              />
                            </PopoverContent>
                          </Popover>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deneme Adi</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                id="name"
                                placeholder="Deneme ismini giriniz" // LAST_NAME_PLACEHOLDER
                                className="w-[280px] border-2 border-default-100 rounded-b-lg bg-transparent focus-visible:border-primary hover:border-default-400"
                                required
                                {...field}
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Ders Bazında Sonuçlar</Label>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {tytSubjects.map((subject, index) => (
                      <div key={subject.title} className="space-y-2">
                        <h4 className="font-bold text-center">
                          {subject.title}
                        </h4>
                        {subject.subjects.map((s) => (
                          <div
                            key={s.name}
                            className="border border-default-200 rounded-lg p-4 space-y-3 gap-4"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="font-light">{s.name}</h4>
                              <Badge variant="outline">Net: </Badge>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                              <FormField
                                control={form.control}
                                name={`${s.id}.correct`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-xs text-success">
                                      Doğru
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        id={`${s.id}.correct`}
                                        type="number"
                                        className="h-8"
                                        required
                                        value={field.value || 0}
                                        onChange={(e) =>
                                          field.onChange(Number(e.target.value))
                                        }
                                        onBlur={field.onBlur}
                                        name={field.name}
                                      />
                                    </FormControl>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`${s.id}.wrong`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-xs text-danger">
                                      Yanlış
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        id={`${s.id}.wrong`}
                                        type="number"
                                        className="h-8"
                                        required
                                        value={field.value || 0}
                                        onChange={(e) =>
                                          field.onChange(Number(e.target.value))
                                        }
                                        onBlur={field.onBlur}
                                        name={field.name}
                                      />
                                    </FormControl>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`${s.id}.empty`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-xs text-default-500">
                                      Boş
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        id={`${s.id}.empty`}
                                        type="number"
                                        className="h-8"
                                        required
                                        value={field.value || 0}
                                        onChange={(e) =>
                                          field.onChange(Number(e.target.value))
                                        }
                                        onBlur={field.onBlur}
                                        name={field.name}
                                      />
                                    </FormControl>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            {
                              // "tr": {
                              //     "message": "Toplam cevap sayısı soru sayısını geçemez",
                              //     "type": "custom"
                              // }
                            }
                            {errors[s.id] && (
                              <p className="text-xs text-destructive">
                                {errors[s.id].message}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="bg-destructive text-destructive-foreground"
                    >
                      İptal
                    </Button>
                  </DialogClose>
                  <Button onClick={handleNextStep}>İleri →</Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deneme Adi</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                id="name"
                                placeholder="Deneme ismini giriniz" // LAST_NAME_PLACEHOLDER
                                className="w-[280px] border-2 border-default-100 rounded-b-lg bg-transparent focus-visible:border-primary hover:border-default-400"
                                required
                                {...field}
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deneme Adi</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                id="name"
                                placeholder="Deneme ismini giriniz" // LAST_NAME_PLACEHOLDER
                                className="w-[280px] border-2 border-default-100 rounded-b-lg bg-transparent focus-visible:border-primary hover:border-default-400"
                                required
                                {...field}
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>{" "}
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deneme Adi</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                id="name"
                                placeholder="Deneme ismini giriniz" // LAST_NAME_PLACEHOLDER
                                className="w-[280px] border-2 border-default-100 rounded-b-lg bg-transparent focus-visible:border-primary hover:border-default-400"
                                required
                                {...field}
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deneme Adi</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                id="name"
                                placeholder="Deneme ismini giriniz" // LAST_NAME_PLACEHOLDER
                                className="w-[280px] border-2 border-default-100 rounded-b-lg bg-transparent focus-visible:border-primary hover:border-default-400"
                                required
                                {...field}
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant={"outline"} onClick={handlePreviousStep}>
                    ← Geri
                  </Button>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="bg-destructive text-destructive-foreground"
                    >
                      İptal
                    </Button>
                  </DialogClose>
                  <Button type="submit" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Ekle
                  </Button>
                </DialogFooter>
              </>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
