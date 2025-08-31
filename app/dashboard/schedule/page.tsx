"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Calendar, Edit2, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../analiz/_components/header";

interface StudySession {
  id: string;
  subject: string;
  topic: string;
  startTime: string;
  endTime: string;
  duration: number; // minutes
  type: "study" | "revision" | "practice" | "break";
  priority: "low" | "medium" | "high";
  notes?: string;
}

interface DaySchedule {
  day: string;
  sessions: StudySession[];
}

const daysOfWeek = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
];

const subjectOptions = [
  "Matematik",
  "Türkçe",
  "Fizik",
  "Kimya",
  "Biyoloji",
  "Edebiyat",
  "Tarih",
  "Coğrafya",
  "Felsefe",
  "İngilizce",
];

const sessionTypes = [
  { value: "study", label: "Çalışma", color: "bg-primary" },
  { value: "revision", label: "Tekrar", color: "bg-warning" },
  { value: "practice", label: "Soru Çözme", color: "bg-secondary" },
  { value: "break", label: "Mola", color: "bg-default-400" },
];

const priorityColors = {
  low: "border-l-default-300",
  medium: "border-l-warning",
  high: "border-l-danger",
};

const mockSchedule: DaySchedule[] = [
  {
    day: "Pazartesi",
    sessions: [
      {
        id: "1",
        subject: "Matematik",
        topic: "Türev",
        startTime: "09:00",
        endTime: "10:30",
        duration: 90,
        type: "study",
        priority: "high",
      },
      {
        id: "2",
        subject: "Türkçe",
        topic: "Sözcükte Anlam",
        startTime: "11:00",
        endTime: "12:00",
        duration: 60,
        type: "practice",
        priority: "medium",
      },
      {
        id: "3",
        subject: "Matematik",
        topic: "Türev",
        startTime: "09:00",
        endTime: "10:30",
        duration: 90,
        type: "study",
        priority: "high",
      },
      {
        id: "4",
        subject: "Matematik",
        topic: "Türev",
        startTime: "09:00",
        endTime: "10:30",
        duration: 90,
        type: "study",
        priority: "high",
      },
    ],
  },
  {
    day: "Salı",
    sessions: [
      {
        id: "3",
        subject: "Fizik",
        topic: "Kuvvet ve Hareket",
        startTime: "14:00",
        endTime: "15:30",
        duration: 90,
        type: "study",
        priority: "high",
      },
    ],
  },
  {
    day: "Çarşamba",
    sessions: [],
  },
  {
    day: "Perşembe",
    sessions: [],
  },
  {
    day: "Cuma",
    sessions: [],
  },
  {
    day: "Cumartesi",
    sessions: [],
  },
  {
    day: "Pazar",
    sessions: [],
  },
];

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(mockSchedule);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: "",
      topic: "",
      startTime: "",
      endTime: "",
      type: "study" as StudySession["type"],
      priority: "medium" as StudySession["priority"],
      notes: "",
    },
  });

  const calculateDuration = (start: string, end: string): number => {
    const [startHour, startMin] = start.split(":").map(Number);
    const [endHour, endMin] = end.split(":").map(Number);
    return endHour * 60 + endMin - (startHour * 60 + startMin);
  };

  const getSessionTypeInfo = (type: StudySession["type"]) => {
    return sessionTypes.find((t) => t.value === type) || sessionTypes[0];
  };

  const onSubmit = (data: any) => {
    const duration = calculateDuration(data.startTime, data.endTime);
    if (duration <= 0) {
      alert("Bitiş saati başlangıç saatinden sonra olmalıdır.");
      return;
    }
    const newSession: StudySession = {
      id: Date.now().toString(),
      ...data,
      duration,
    };
    setSchedule((prev) =>
      prev.map((day) =>
        day.day === selectedDay
          ? {
              ...day,
              sessions: [...day.sessions, newSession].sort((a, b) =>
                a.startTime.localeCompare(b.startTime)
              ),
            }
          : day
      )
    );
    reset();
    setSelectedDay(null);
  };

  return (
    <div className="space-y-8">
      <Header
        title={`Haftalık Çalışma Programı`}
        subtitle={"Haftalık çalışma programınızı yönetin"}
      />
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {schedule.map((day) => (
          <div
            key={day.day}
            className="bg-card rounded-lg border border-divider"
          >
            {/* Day Header */}
            <div className="p-4 border-b border-divider">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{day.day}</h3>
                <Dialog
                  open={selectedDay === day.day}
                  onOpenChange={(open) => {
                    if (open) {
                      setSelectedDay(day.day);
                      reset();
                    } else {
                      setSelectedDay(null);
                      reset();
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="w-3 h-3 mr-1" />
                      Ekle
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>{`${day.day} - Yeni Oturum`}</DialogTitle>
                      <DialogDescription>
                        Çalışma oturumunuzun detaylarını girin.
                      </DialogDescription>
                    </DialogHeader>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="subject">Ders *</Label>
                        <Select
                          value={watch("subject")}
                          onValueChange={(value) => setValue("subject", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Ders seçiniz" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjectOptions.map((subject) => (
                              <SelectItem key={subject} value={subject}>
                                {subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.subject && (
                          <span className="text-xs text-danger">
                            Ders seçiniz
                          </span>
                        )}
                        <input
                          type="hidden"
                          {...register("subject", { required: true })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="topic">Konu *</Label>
                        <Input
                          id="topic"
                          placeholder="Çalışılacak konu"
                          {...register("topic", { required: true })}
                        />
                        {errors.topic && (
                          <span className="text-xs text-danger">
                            Konu giriniz
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="startTime">Başlangıç *</Label>
                          <Input
                            id="startTime"
                            type="time"
                            {...register("startTime", { required: true })}
                          />
                          {errors.startTime && (
                            <span className="text-xs text-danger">
                              Başlangıç saati giriniz
                            </span>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="endTime">Bitiş *</Label>
                          <Input
                            id="endTime"
                            type="time"
                            {...register("endTime", { required: true })}
                          />
                          {errors.endTime && (
                            <span className="text-xs text-danger">
                              Bitiş saati giriniz
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="type">Tür</Label>
                          <Select
                            value={watch("type")}
                            onValueChange={(value) =>
                              setValue("type", value as StudySession["type"])
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {sessionTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <input type="hidden" {...register("type")} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="priority">Öncelik</Label>
                          <Select
                            value={watch("priority")}
                            onValueChange={(value) =>
                              setValue(
                                "priority",
                                value as StudySession["priority"]
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Düşük</SelectItem>
                              <SelectItem value="medium">Orta</SelectItem>
                              <SelectItem value="high">Yüksek</SelectItem>
                            </SelectContent>
                          </Select>
                          <input type="hidden" {...register("priority")} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Notlar</Label>
                        <Textarea
                          id="notes"
                          placeholder="Ek notlar..."
                          {...register("notes")}
                          rows={2}
                        />
                      </div>

                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setSelectedDay(null);
                            reset();
                          }}
                        >
                          İptal
                        </Button>
                        <Button
                          type="submit"
                          disabled={!watch("subject") || !watch("topic")}
                        >
                          {"Oturum Ekle"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Sessions */}
            <div className="p-2 space-y-4 h-auto">
              {day.sessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                  <Calendar className="w-8 h-8 text-default-400 mb-2" />
                  <p className="text-sm text-default-500 mb-3">
                    Henüz oturum eklenmemiş
                  </p>
                </div>
              ) : (
                day.sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-3 rounded-lg border-1  border-l-4 bg-default-50 hover:bg-default-100 transition-colors border-l-amber-400 ${
                      priorityColors[session.priority]
                    }`}
                  >
                    <div className="flex items-start justify-between ">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="secondary"
                            className={`${
                              getSessionTypeInfo(session.type).color
                            } text-white text-xs`}
                          >
                            {getSessionTypeInfo(session.type).label}
                          </Badge>
                          <span className="text-xs text-default-500">
                            {session.duration}dk
                          </span>
                        </div>
                        <h4 className="font-medium text-sm truncate">
                          {session.subject}
                        </h4>
                        <p className="text-xs text-default-600 truncate">
                          {session.topic}
                        </p>
                        <p className="text-xs text-default-500 mt-1">
                          {session.startTime} - {session.endTime}
                        </p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 ml-2"
                          >
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {}}>
                            <Edit2 className="w-4 h-4 mr-2" />
                            Düzenle
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {}}
                            className="text-danger focus:text-danger"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Sil
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
