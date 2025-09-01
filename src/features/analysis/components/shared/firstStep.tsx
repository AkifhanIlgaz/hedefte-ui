import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import { format } from "date-fns";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  CheckCircle2,
  MinusCircle,
  XCircle,
} from "lucide-react";
import { tr } from "react-day-picker/locale";
import { UseFormReturn } from "react-hook-form";

import { cn } from "@/components/ui/utils";
import {
  EaSubjects,
  MfSubjects,
  tytSubjects,
} from "@/src/shared/domain/subject/subject.data";
import { AnalysisFormRequest } from "../../validations/analysis.validation";

interface FirstStepProps {
  form: UseFormReturn<AnalysisFormRequest>;
  examType: "TYT" | "AYT";
  handleNextStep: () => void;
}

export default function FirstStep({ form, examType, handleNextStep }: FirstStepProps) {
  const {
    formState: { errors },
  } = form;

  const division = localStorage.getItem(`bolum`);
  const subjects =
    examType === "TYT"
      ? tytSubjects
      : division === `EA`
      ? EaSubjects
      : MfSubjects;

  return (
    <>
      {/* Exam Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2  ">
            <CalendarIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            Deneme Bilgileri
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Deneme Tarihi
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`h-11 border-sidebar-border focus:border-amber-500 focus:ring-amber-500/20 bg-background dark:bg-background dark:text-slate-100 ${
                            !field.value ? "text-muted-foreground" : ""
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(field.value, "PPP", { locale: tr })}
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

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Deneme Adı
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Örn: 3. Deneme"
                      className="h-11 border-sidebar-border focus:border-amber-500 focus:ring-amber-500/20 bg-background dark:bg-background dark:text-slate-100"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex  gap-6 justify-center">
            {subjects.map((subject) => (
              <div key={subject.name} className="space-y-4 w-full">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-primary mb-1">
                    {subject.name}
                  </h3>
                  <Separator className="bg-primary/20" />
                </div>

                {subject.subFields.map((s, index) => {
                  const correct = form.watch(`subjects.${index}.correct`) || 0;
                  const wrong = form.watch(`subjects.${index}.wrong`) || 0;

                  return (
                    <Card
                      key={s.name}
                      className={cn(
                        `border transition-all hover:shadow-md bg-background dark:bg-background`,
                        {
                          "border-amber-900": errors.subjects?.[index]?.message,
                        }
                      )}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base font-semibold text-sidebar-foreground">
                            {s.name}
                          </CardTitle>
                          <Badge
                            variant="secondary"
                            className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                          >
                            Net: {(correct - wrong * 0.25).toFixed(2)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-1">
                        <div className="grid grid-cols-3 gap-3">
                          <FormField
                            control={form.control}
                            name={`subjects.${index}.correct`}
                            render={({ field }) => (
                              <FormItem className="text-center">
                                <div className="flex items-center justify-center gap-1 mb-2">
                                  <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                                  <FormLabel className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                    Doğru
                                  </FormLabel>
                                </div>
                                <FormControl>
                                  <Input
                                    type="number"
                                    className="h-9 text-center text-sm border-sidebar-border focus:border-emerald-400 focus:ring-emerald-400/20 bg-background dark:bg-background dark:text-slate-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    value={field.value || 0}
                                    onChange={(e) =>
                                      field.onChange(Number(e.target.value))
                                    }
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    min="0"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`subjects.${index}.wrong`}
                            render={({ field }) => (
                              <FormItem className="text-center">
                                <div className="flex items-center justify-center gap-1 mb-2">
                                  <XCircle className="h-3 w-3 text-red-600 dark:text-red-400" />
                                  <FormLabel className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                    Yanlış
                                  </FormLabel>
                                </div>
                                <FormControl>
                                  <Input
                                    type="number"
                                    className="h-9 text-center text-sm border-sidebar-border focus:border-red-500 focus:ring-red-400/20 bg-background dark:bg-background dark:text-slate-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    value={field.value || 0}
                                    onChange={(e) =>
                                      field.onChange(Number(e.target.value))
                                    }
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    min="0"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`subjects.${index}.empty`}
                            render={({ field }) => (
                              <FormItem className="text-center">
                                <div className="flex items-center justify-center gap-1 mb-2">
                                  <MinusCircle className="h-3 w-3 text-slate-500 dark:text-slate-400" />
                                  <FormLabel className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                    Boş
                                  </FormLabel>
                                </div>
                                <FormControl>
                                  <Input
                                    type="number"
                                    className="h-9 text-center text-sm border-sidebar-border focus:border-slate-500 focus:ring-slate-400/20 bg-background dark:bg-background dark:text-slate-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    value={field.value || 0}
                                    onChange={(e) =>
                                      field.onChange(Number(e.target.value))
                                    }
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    min="0"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        {errors.subjects?.[index] && (
                          <p className="text-xs text-destructive bg-destructive/10 p-2 mt-4 rounded-lg">
                            {errors.subjects[index]!.message}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end items-center gap-4 w-full">
        <Button
          type="button"
          variant="outline"
          className="gap-2 border-sidebar-border hover:bg-sidebar-accent dark:hover:bg-sidebar-accent bg-transparent"
          onClick={() => window.history.back()}
        >
          İptal
        </Button>
        <Button
          type="button"
          className="gap-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-8"
          onClick={handleNextStep}
        >
          İleri
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
}
