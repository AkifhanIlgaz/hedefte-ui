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

export const topicAnalysisSchema = z.object({
  topicId: z.string(),
  topicName: z.string(),
  mistakes: z.int().min(1, "Yanlış sayısı 1 veya üzeri olmalı"),
});

export const lessonAnalysisSchema = z
  .object({
    index: z.int().min(0, "Index 0 veya üzeri olmalı"),
    lessonId: z.string(),
    lessonName: z.string(),
    correct: z.number().min(0, "Doğru sayısı 0 veya üzeri olmalı"),
    wrong: z.number().min(0, "Yanlış sayısı 0 veya üzeri olmalı"),
    empty: z.number().min(0, "Boş sayısı 0 veya üzeri olmalı"),
    totalNet: z.number(),
    time: z.number().min(0, "Süre 0 veya üzeri olmalı"),
    topicAnalysis: z.array(topicAnalysisSchema).optional(),
  })
  .refine((data) => data.correct + data.wrong + data.empty <= data.totalNet, {
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
    lessonAnalysis: z.array(lessonAnalysisSchema),
  })
  .transform((data) => {
    // Toplam net'i hesapla
    const totalNet = data.lessonAnalysis.reduce((sum, subject) => {
      const net = subject.correct - subject.wrong * 0.25;
      return sum + net;
    }, 0);

    return {
      ...data,
      totalNet: Math.round(totalNet * 100) / 100, // 2 ondalık basamağa yuvarla
    };
  });

export type AnalysisFormRequest = z.infer<typeof analysisFormSchema>;
export type TopicAnalysis = z.infer<typeof topicAnalysisSchema>;
