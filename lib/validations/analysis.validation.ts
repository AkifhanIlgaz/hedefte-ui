import z from "zod";

export const tytSubjects = [
  {
    name: "Türkçe",
    total: 40,
    subFields: [{ id: 0, name: "Türkçe", total: 40 }],
  },
  {
    name: "Sosyal Bilimler",
    total: 20,
    subFields: [
      { id: 1, name: "Tarih", total: 5 },
      { id: 2, name: "Coğrafya", total: 5 },
      { id: 3, name: "Felsefe", total: 5 },
      { id: 4, name: "Din", total: 5 },
    ],
  },
  {
    name: "Matematik",
    total: 40,
    subFields: [{ id: 5, name: "Matematik", total: 40 }],
  },
  {
    name: "Fen Bilimleri",
    total: 20,
    subFields: [
      { id: 6, name: "Fizik", total: 7 },
      { id: 7, name: "Kimya", total: 7 },
      { id: 8, name: "Biyoloji", total: 6 },
    ],
  },
];

export const tytQuestionMap = {
  tr: 40,
  tarih: 5,
  cografya: 5,
  felsefe: 5,
  din: 5,
  mat: 40,
  fizik: 7,
  kimya: 7,
  biyoloji: 6,
} as const;

export const topicMistakesSchema = z.object({
  topic: z.string("Konu seçimi gerekli").min(1, "Konu seçimi gerekli").max(50),
  mistakes: z.int().min(1, "Yanlış sayısı 1 veya üzeri olmalı"),
});

export const subjectSchema = z
  .object({
    name: z.string(),
    id: z.int().nonnegative(),
    correct: z.number().min(0, "Doğru sayısı 0 veya üzeri olmalı"),
    wrong: z.number().min(0, "Yanlış sayısı 0 veya üzeri olmalı"),
    empty: z.number().min(0, "Boş sayısı 0 veya üzeri olmalı"),
    total: z.number(),
    topicMistakes: z.array(topicMistakesSchema).optional(),
  })
  .refine((data) => data.correct + data.wrong + data.empty <= data.total, {
    message: "Toplam cevap sayısı soru sayısını geçemez",
    path: [],
  });
// .refine(
//   (data) => {
//     const totalMistakes = data.empty + data.wrong;
//     const completedMistakes =
//       data.topicMistakes?.reduce((prev, curr) => prev + curr.mistakes, 0) ||
//       0;

//     return totalMistakes == completedMistakes;
//   },
//   {
//     message: `Lütfen tüm soruların konularını girin.`,
//     path: [],
//   }
// );

export const analysisFormSchema = z.object({
  date: z.date("Tarih zorunludur"),
  name: z
    .string("Deneme adi zorunludur")
    .min(1, `Lütfen denemenin adını giriniz`),
  subjects: z.array(subjectSchema),
  notes: z.string().max(100).optional(),
});

export type AnalysisFormRequest = z.infer<typeof analysisFormSchema>;
export type TopicMistake = z.infer<typeof topicMistakesSchema>;
