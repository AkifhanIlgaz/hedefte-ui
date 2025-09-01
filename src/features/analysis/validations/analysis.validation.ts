import z from "zod";

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
  id: z.int().nonnegative(),
  name: z.string().min(2).max(100),
  mistakes: z.int().min(1, "Yanlış sayısı 1 veya üzeri olmalı"),
});

export const subjectSchema = z
  .object({
    name: z.string(),
    index: z.int().min(0, "Index 0 veya üzeri olmalı"),
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

export const analysisFormSchema = z
  .object({
    date: z.date("Tarih zorunludur"),
    totalNet: z.number(),
    name: z
      .string("Deneme adi zorunludur")
      .min(1, `Lütfen denemenin adını giriniz`),
    subjects: z.array(subjectSchema),
  })
  .transform((data) => {
    // Toplam net'i hesapla
    const totalNet = data.subjects.reduce((sum, subject) => {
      const net = subject.correct - subject.wrong * 0.25;
      return sum + net;
    }, 0);

    return {
      ...data,
      totalNet: Math.round(totalNet * 100) / 100, // 2 ondalık basamağa yuvarla
    };
  });

export type AnalysisFormRequest = z.infer<typeof analysisFormSchema>;
export type TopicMistake = z.infer<typeof topicMistakesSchema>;
