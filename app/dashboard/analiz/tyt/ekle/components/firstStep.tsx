import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  TYTFormRequest,
  tytSubjects,
} from "@/lib/validations/analysis.validation";
import { format } from "date-fns";
import { ArrowRight, Calendar as CalendarIcon } from "lucide-react";
import { tr } from "react-day-picker/locale";
import { UseFormReturn } from "react-hook-form";

interface FirstStepProps {
  form: UseFormReturn<TYTFormRequest>;
  handleNextStep: () => void;
}

export function FirstStep({ form, handleNextStep }: FirstStepProps) {
  return (
    <>
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
                        <h4 className="font-medium text-sm">{s.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          Net:{" "}
                          {(form.watch(`subjects.${s.id}.correct`) || 0) -
                            (form.watch(`subjects.${s.id}.wrong`) || 0) * 0.25}
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
  );
}
