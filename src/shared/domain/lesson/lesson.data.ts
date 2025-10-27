import {
  Atom,
  BookOpen,
  Brain,
  Earth,
  FlaskConical,
  Infinity,
  Lightbulb,
  Swords,
  Trees,
} from "lucide-react";
import { Lesson } from "./lesson.type";
import { ExamType } from "../types";
import { Field } from "@/src/features/profile/data";

export const lessons = {
  tyt: {
    Türkçe: {
      lessonId: "68f9db855c0ab474416cdc70",
      name: "Türkçe",
      totalQuestions: 40,
      icon: BookOpen,
      bgClass: "bg-amber-100 dark:bg-amber-900/20",
      iconColor: "text-amber-700 dark:text-amber-300",
    },
    Tarih: {
      lessonId: "68f9db8c5c0ab474416cdc8e",
      name: "Tarih",
      totalQuestions: 5,
      icon: Swords,
      bgClass: "bg-rose-100 dark:bg-rose-900/20",
      iconColor: "text-rose-700 dark:text-rose-300",
    },
    Coğrafya: {
      index: 2,
      lessonId: "68f9db915c0ab474416cdca5",
      name: "Coğrafya",
      totalQuestions: 5,
      icon: Earth,
      bgClass: "bg-sky-100 dark:bg-sky-900/20",
      iconColor: "text-sky-700 dark:text-sky-300",
    },
    Felsefe: {
      lessonId: "68f9db955c0ab474416cdcb9",
      name: "Felsefe",
      totalQuestions: 5,
      icon: Lightbulb,
      bgClass: "bg-violet-100 dark:bg-violet-900/20",
      iconColor: "text-violet-700 dark:text-violet-300",
    },
    "Din Kültürü": {
      lessonId: "68f9db985c0ab474416cdcc7",
      name: "Din Kültürü",
      totalQuestions: 5,
      icon: Brain,
      bgClass: "bg-emerald-100 dark:bg-emerald-900/20",
      iconColor: "text-emerald-700 dark:text-emerald-300",
    },
    Matematik: {
      lessonId: "68f9db9b5c0ab474416cdcd2",
      name: "Matematik",
      totalQuestions: 40,
      icon: Infinity,
      bgClass: "bg-indigo-100 dark:bg-indigo-900/20",
      iconColor: "text-indigo-700 dark:text-indigo-300",
    },
    Fizik: {
      lessonId: "68f9dbaa5c0ab474416cdd18",
      name: "Fizik",
      totalQuestions: 7,
      icon: Atom,
      bgClass: "bg-teal-100 dark:bg-teal-900/20",
      iconColor: "text-teal-700 dark:text-teal-300",
    },
    Kimya: {
      lessonId: "68f9dbad5c0ab474416cdd25",
      name: "Kimya",
      totalQuestions: 7,
      icon: FlaskConical,
      bgClass: "bg-lime-100 dark:bg-lime-900/20",
      iconColor: "text-lime-700 dark:text-lime-300",
    },
    Biyoloji: {
      lessonId: "68f9dbb05c0ab474416cdd30",
      name: "Biyoloji",
      totalQuestions: 6,
      icon: Trees,
      bgClass: "bg-fuchsia-100 dark:bg-fuchsia-900/20",
      iconColor: "text-fuchsia-700 dark:text-fuchsia-300",
    },
  },
  ayt: {
    Edebiyat: {
      lessonId: "68f9dbb25c0ab474416cdd3b",
      name: "Edebiyat",
      totalQuestions: 24,
      icon: BookOpen,
      bgClass: "bg-amber-100 dark:bg-amber-900/20",
      iconColor: "text-amber-700 dark:text-amber-300",
    },
    Tarih: {
      lessonId: "68f9dbb65c0ab474416cdd4d",
      name: "Tarih",
      totalQuestions: 10,
      icon: Swords,
      bgClass: "bg-rose-100 dark:bg-rose-900/20",
      iconColor: "text-rose-700 dark:text-rose-300",
    },
    Coğrafya: {
      lessonId: "68f9dbbc5c0ab474416cdd69",
      name: "Coğrafya",
      totalQuestions: 6,
      icon: Earth,
      bgClass: "bg-sky-100 dark:bg-sky-900/20",
      iconColor: "text-sky-700 dark:text-sky-300",
    },
    Matematik: {
      lessonId: "68f9dbc55c0ab474416cdd91",
      name: "Matematik",
      totalQuestions: 40,
      icon: Infinity,
      bgClass: "bg-indigo-100 dark:bg-indigo-900/20",
      iconColor: "text-indigo-700 dark:text-indigo-300",
    },
    Fizik: {
      lessonId: "68f9dbd95c0ab474416cddea",
      name: "Fizik",
      totalQuestions: 14,
      icon: Atom,
      bgClass: "bg-teal-100 dark:bg-teal-900/20",
      iconColor: "text-teal-700 dark:text-teal-300",
    },
    Kimya: {
      lessonId: "68f9dbdf5c0ab474416cde04",
      name: "Kimya",
      totalQuestions: 13,
      icon: FlaskConical,
      bgClass: "bg-lime-100 dark:bg-lime-900/20",
      iconColor: "text-lime-700 dark:text-lime-300",
    },
    Biyoloji: {
      lessonId: "68f9dbe45c0ab474416cde1b",
      name: "Biyoloji",
      totalQuestions: 13,
      icon: Trees,
      bgClass: "bg-fuchsia-100 dark:bg-fuchsia-900/20",
      iconColor: "text-fuchsia-700 dark:text-fuchsia-300",
    },
  },
};

export const tytLessons = [
  {
    name: "Türkçe",
    total: 40,
    subFields: [
      {
        index: 0,
        lessonId: "68f9db855c0ab474416cdc70",
        name: "Türkçe",
        totalQuestions: 40,
        icon: BookOpen,
        bgClass: "bg-amber-100 dark:bg-amber-900/20",
        iconColor: "text-amber-700 dark:text-amber-300",
      },
    ],
  },
  {
    name: "Sosyal Bilimler",
    total: 20,
    subFields: [
      {
        index: 1,
        lessonId: "68f9db8c5c0ab474416cdc8e",
        name: "Tarih",
        totalQuestions: 5,
        icon: Swords,
        bgClass: "bg-rose-100 dark:bg-rose-900/20",
        iconColor: "text-rose-700 dark:text-rose-300",
      },
      {
        index: 2,
        lessonId: "68f9db915c0ab474416cdca5",
        name: "Coğrafya",
        totalQuestions: 5,
        icon: Earth,
        bgClass: "bg-sky-100 dark:bg-sky-900/20",
        iconColor: "text-sky-700 dark:text-sky-300",
      },
      {
        index: 3,
        lessonId: "68f9db955c0ab474416cdcb9",
        name: "Felsefe",
        totalQuestions: 5,
        icon: Lightbulb,
        bgClass: "bg-violet-100 dark:bg-violet-900/20",
        iconColor: "text-violet-700 dark:text-violet-300",
      },
      {
        index: 4,
        lessonId: "68f9db985c0ab474416cdcc7",
        name: "Din Kültürü",
        totalQuestions: 5,
        icon: Brain,
        bgClass: "bg-emerald-100 dark:bg-emerald-900/20",
        iconColor: "text-emerald-700 dark:text-emerald-300",
      },
    ],
  },
  {
    name: "Matematik",
    total: 40,
    subFields: [
      {
        index: 5,
        lessonId: "68f9db9b5c0ab474416cdcd2",
        name: "Matematik",
        totalQuestions: 40,
        icon: Infinity,
        bgClass: "bg-indigo-100 dark:bg-indigo-900/20",
        iconColor: "text-indigo-700 dark:text-indigo-300",
      },
    ],
  },
  {
    name: "Fen Bilimleri",
    total: 20,
    subFields: [
      {
        index: 6,
        lessonId: "68f9dbaa5c0ab474416cdd18",
        name: "Fizik",
        totalQuestions: 7,
        icon: Atom,
        bgClass: "bg-teal-100 dark:bg-teal-900/20",
        iconColor: "text-teal-700 dark:text-teal-300",
      },
      {
        index: 7,
        lessonId: "68f9dbad5c0ab474416cdd25",
        name: "Kimya",
        totalQuestions: 7,
        icon: FlaskConical,
        bgClass: "bg-lime-100 dark:bg-lime-900/20",
        iconColor: "text-lime-700 dark:text-lime-300",
      },
      {
        index: 8,
        lessonId: "68f9dbb05c0ab474416cdd30",
        name: "Biyoloji",
        totalQuestions: 6,
        icon: Trees,
        bgClass: "bg-fuchsia-100 dark:bg-fuchsia-900/20",
        iconColor: "text-fuchsia-700 dark:text-fuchsia-300",
      },
    ],
  },
];

export const eaLessons = [
  {
    name: "Edebiyat ve Sosyal Bilimler",
    total: 40,
    subFields: [
      {
        index: 0,
        lessonId: "68f9dbb25c0ab474416cdd3b",
        name: "Edebiyat",
        totalQuestions: 24,
        icon: BookOpen,
        bgClass: "bg-amber-100 dark:bg-amber-900/20",
        iconColor: "text-amber-700 dark:text-amber-300",
      },
      {
        index: 1,
        lessonId: "68f9dbb65c0ab474416cdd4d",
        name: "Tarih",
        totalQuestions: 10,
        icon: Swords,
        bgClass: "bg-rose-100 dark:bg-rose-900/20",
        iconColor: "text-rose-700 dark:text-rose-300",
      },
      {
        index: 2,
        lessonId: "68f9dbbc5c0ab474416cdd69",
        name: "Coğrafya",
        totalQuestions: 6,
        icon: Earth,
        bgClass: "bg-sky-100 dark:bg-sky-900/20",
        iconColor: "text-sky-700 dark:text-sky-300",
      },
    ],
  },
  {
    name: "Matematik",
    total: 40,
    subFields: [
      {
        index: 3,
        lessonId: "68f9dbc55c0ab474416cdd91",
        name: "Matematik",
        totalQuestions: 40,
        icon: Infinity,
        bgClass: "bg-indigo-100 dark:bg-indigo-900/20",
        iconColor: "text-indigo-700 dark:text-indigo-300",
      },
    ],
  },
];

export const mfLessons = [
  {
    name: "Matematik",
    total: 40,
    subFields: [
      {
        index: 0,
        lessonId: "68f9dbc55c0ab474416cdd91",
        name: "Matematik",
        totalQuestions: 40,
        icon: Infinity,
        bgClass: "bg-indigo-100 dark:bg-indigo-900/20",
        iconColor: "text-indigo-700 dark:text-indigo-300",
      },
    ],
  },
  {
    name: "Fen Bilimleri",
    total: 40,
    subFields: [
      {
        index: 1,
        lessonId: "68f9dbd95c0ab474416cddea",
        name: "Fizik",
        totalQuestions: 14,
        icon: Atom,
        bgClass: "bg-teal-100 dark:bg-teal-900/20",
        iconColor: "text-teal-700 dark:text-teal-300",
      },
      {
        index: 2,
        lessonId: "68f9dbdf5c0ab474416cde04",
        name: "Kimya",
        totalQuestions: 13,
        icon: FlaskConical,
        bgClass: "bg-lime-100 dark:bg-lime-900/20",
        iconColor: "text-lime-700 dark:text-lime-300",
      },
      {
        index: 3,
        lessonId: "68f9dbe45c0ab474416cde1b",
        name: "Biyoloji",
        totalQuestions: 13,
        icon: Trees,
        bgClass: "bg-fuchsia-100 dark:bg-fuchsia-900/20",
        iconColor: "text-fuchsia-700 dark:text-fuchsia-300",
      },
    ],
  },
];

export function getLessonByName(
  exam: ExamType,
  name: keyof (typeof lessons)["ayt"] | keyof (typeof lessons)["tyt"],
): Lesson {
  if (exam === "tyt") {
    const key = name as keyof (typeof lessons)["tyt"];
    return lessons.tyt[key];
  } else {
    const key = name as keyof (typeof lessons)["ayt"];
    return lessons.ayt[key];
  }
}

export function getAllLessons(exam: ExamType, field: Field) {
  const lessons =
    exam === "tyt"
      ? tytLessons
      : field === `Eşit Ağırlık`
        ? eaLessons
        : mfLessons;

  return lessons.flatMap((group) => group.subFields);
}

export function getAllLessonsByGroup(exam: ExamType, field: Field) {
  return exam === "tyt"
    ? tytLessons
    : field === `Eşit Ağırlık`
      ? eaLessons
      : mfLessons;
}
