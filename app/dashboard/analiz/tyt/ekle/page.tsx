"use client";

import { CircularProgress } from "@/components/app/CircularProgress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
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
import {
  TYTFormRequest,
  tytFormSchema,
  tytSubjects,
} from "@/lib/validations/analysis.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { tr } from "react-day-picker/locale";
import { useForm } from "react-hook-form";

export default function AddTYTResultPage() {
  const form = useForm<TYTFormRequest>({
    resolver: zodResolver(tytFormSchema),
    defaultValues: {
      date: new Date(),
      name: "",
      notes: "",
      subjects: tytSubjects
        .map((s) =>
          s.subFields.map((sf) => ({
            name: sf.name,
            correct: 0,
            wrong: 0,
            empty: 0,
            total: sf.total,
            topicMistakes: [],
          }))
        )
        .flat(),
    },
  });

  const {
    formState: { errors },
  } = form;

  const [currentStep, setCurrentStep] = useState(1);

  const onSubmit = async (req: TYTFormRequest) => {
    console.log(req);
  };

  const handleNextStep = () => {
    form.trigger().then((isValid) => {
      if (isValid) setCurrentStep(2);
    });
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
  };

  console.log(errors);
  console.log(form.getValues());
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
      <div className="container mx-auto p-6 max-w-full">
        {/* Header - Sol tarafa yapıştırıldı */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            TYT Deneme Sonucu Ekle
          </h1>
          <p className="text-lg text-muted-foreground">
            {currentStep === 1
              ? "Deneme sonuçlarınızı derse göre girin."
              : "Hangi konulardan kaç yanlış yaptığınızı belirtin."}
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8  flex flex-col items-center justify-center "
          >
            {/* Progress Indicator - Ortada üstte */}
            <div className="flex justify-center mb-6 ">
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center gap-2 ${
                    currentStep === 1 ? "text-primary" : "text-green-600"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep === 1
                        ? "bg-primary text-primary-foreground"
                        : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    }`}
                  >
                    {currentStep === 1 ? 1 : <Check className="size-4" />}
                  </div>
                  <span className="font-medium">Temel Sonuçlar</span>
                </div>
                <div
                  className={`w-16 h-0.5 ${
                    currentStep === 2 ? "bg-primary" : "bg-muted"
                  }`}
                />
                <div
                  className={`flex items-center gap-2 ${
                    currentStep === 2 ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep === 2
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    2
                  </div>
                  <span className="font-medium">Konu Bazında Yanlışlar</span>
                </div>
              </div>
            </div>

            {currentStep === 1 ? (
              <>
                {/* Basic Info Card - Title kaldırıldı */}
                <Card className=" shadow-lg border-0 bg-white/80 dark:bg-slate-800/80   backdrop-blur-sm pb-0">
                  <CardContent className="p-6 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-sm font-medium">
                              Deneme Tarihi
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={`w-full justify-start text-left font-normal h-11 ${
                                      !field.value
                                        ? "text-muted-foreground"
                                        : ""
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
                            <FormLabel className="text-sm font-medium">
                              Deneme Adı
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Deneme ismini giriniz"
                                className="h-11"
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

                {/* Subject Results - Title kaldırıldı */}
                <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80  backdrop-blur-sm max-w-7xl">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                      {tytSubjects.map((subject) => (
                        <div key={subject.name} className="space-y-4 ">
                          <div className="text-center">
                            <h3 className="text-lg font-semibold text-primary mb-1">
                              {subject.name}
                            </h3>
                            <Separator className="bg-primary/20" />
                          </div>

                          {subject.subFields.map((s) => (
                            <Card
                              key={s.name}
                              className="  group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
                            >
                              <CardContent className="p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-sm">
                                    {s.name}
                                  </h4>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Net:{" "}
                                    {(form.watch(`subjects.${s.id}.correct`) ||
                                      0) -
                                      (form.watch(`subjects.${s.id}.wrong`) ||
                                        0) *
                                        0.25}
                                  </Badge>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                  <FormField
                                    control={form.control}
                                    name={`subjects.${s.id}.correct`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-xs text-green-600 dark:text-green-400 font-medium underline underline-offset-2">
                                          Doğru
                                        </FormLabel>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            className="h-9 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            value={field.value || 0}
                                            onChange={(e) =>
                                              field.onChange(
                                                Number(e.target.value)
                                              )
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
                                    name={`subjects.${s.id}.wrong`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-xs text-red-600 dark:text-red-400 font-medium underline underline-offset-2">
                                          Yanlış
                                        </FormLabel>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            className="h-9 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            value={field.value || 0}
                                            onChange={(e) =>
                                              field.onChange(
                                                Number(e.target.value)
                                              )
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
                                    name={`subjects.${s.id}.empty`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-xs text-gray-500 dark:text-gray-400 font-medium underline underline-offset-2">
                                          Boş
                                        </FormLabel>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            className="h-9 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            value={field.value || 0}
                                            onChange={(e) =>
                                              field.onChange(
                                                Number(e.target.value)
                                              )
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
                                {/* {errors[s.id] && (
                                  <p className="text-xs text-destructive bg-destructive/10 p-2 rounded">
                                    {errors[s.id].message}
                                  </p>
                                )} */}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end items-center gap-4 w-full max-w-7xl">
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    onClick={() => window.history.back()}
                  >
                    İptal
                  </Button>
                  <Button
                    type="button"
                    className="gap-2 bg-primary hover:bg-primary/90"
                    onClick={handleNextStep}
                  >
                    İleri
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Step 2 Content - Title kaldırıldı */}
                <Card className="w-full max-w-7xl shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="mb-6 text-center">
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        Konu Bazında Yanlışlar
                      </h2>
                      <p className="text-muted-foreground">
                        Sadece yanlış veya boş bıraktığınız dersler gösteriliyor
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {form
                        .getValues()
                        .subjects.filter((s) => s.empty + s.wrong > 0)
                        .map((sub, index) => {
                          const totalMistakes = sub.empty + sub.wrong;
                          const completedMistakes =
                            sub.topicMistakes?.reduce(
                              (prev, curr) => prev + curr.mistakes,
                              0
                            ) || 0;
                          const progressPercentage =
                            totalMistakes > 0
                              ? (completedMistakes / totalMistakes) * 100
                              : 0;

                          return (
                            <Card
                              key={index}
                              className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
                            >
                              <CardContent className="p-6">
                                <div className="flex flex-col items-center space-y-4">
                                  {/* Subject Name */}
                                  <div className="text-center">
                                    <h3 className="font-semibold text-lg text-foreground mb-1">
                                      {sub.name}
                                    </h3>
                                    <div className="w-12 h-0.5 bg-primary/60 mx-auto rounded-full"></div>
                                  </div>

                                  {/* Circular Progress */}
                                  <div className="relative">
                                    <CircularProgress
                                      value={completedMistakes}
                                      total={totalMistakes}
                                    />
                                  </div>

                                  {/* Stats */}
                                  <div className="w-full space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                      <span className="text-muted-foreground">
                                        Yanlış:
                                      </span>
                                      <span className="font-medium text-red-600">
                                        {sub.wrong}
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                      <span className="text-muted-foreground">
                                        Boş:
                                      </span>
                                      <span className="font-medium text-gray-600">
                                        {sub.empty}
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                      <span className="text-muted-foreground">
                                        Toplam:
                                      </span>
                                      <span className="font-medium text-foreground">
                                        {totalMistakes}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Progress Bar */}
                                  <div className="w-full">
                                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                      <span>İlerleme</span>
                                      <span>
                                        {Math.round(progressPercentage)}%
                                      </span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2">
                                      <div
                                        className={`h-2 rounded-full transition-all duration-500 ${
                                          progressPercentage === 100
                                            ? "bg-green-500"
                                            : progressPercentage > 50
                                            ? "bg-blue-500"
                                            : "bg-orange-500"
                                        }`}
                                        style={{
                                          width: `${progressPercentage}%`,
                                        }}
                                      ></div>
                                    </div>
                                  </div>

                                  {/* Action Button */}
                                  <Button
                                    variant="default"
                                    size="sm"
                                    className="w-full group-hover:shadow-md transition-all duration-300 bg-primary hover:bg-primary/90"
                                  >
                                    <Plus className="w-4 h-4 mr-2" />
                                    {completedMistakes === 0
                                      ? "Konu Ekle"
                                      : "Konu Düzenle"}
                                  </Button>

                                  {/* Completion Badge */}
                                  {progressPercentage === 100 && (
                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                      <Check className="w-3 h-3 mr-1" />
                                      Tamamlandı
                                    </Badge>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                    </div>

                    {/* Empty State */}
                    {form
                      .getValues()
                      .subjects.filter((s) => s.empty + s.wrong > 0).length ===
                      0 && (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">
                          Hiç yanlış veya boş cevabınız yok!
                        </h3>
                        <p className="text-muted-foreground">
                          Tüm soruları doğru cevapladınız. Tebrikler! 🎉
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end items-center gap-4 w-full max-w-7xl">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreviousStep}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Geri
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                  >
                    İptal
                  </Button>
                  <Button
                    type="submit"
                    className="gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4" />
                    Kaydet
                  </Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
