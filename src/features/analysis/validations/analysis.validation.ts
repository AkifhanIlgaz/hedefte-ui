import z from "zod";

export const topicAnalysisSchema = z.object({
  topicId: z.string(),
  name: z.string(),
  mistakes: z.int().min(1, "Yanlış sayısı 1 veya üzeri olmalı"),
});

export const lessonAnalysisSchema = z
  .object({
    index: z.number(),
    lessonId: z.string(),
    lessonName: z.string(),
    correct: z.number().min(0, "Doğru sayısı 0 veya üzeri olmalı"),
    wrong: z.number().min(0, "Yanlış sayısı 0 veya üzeri olmalı"),
    empty: z.number().min(0, "Boş sayısı 0 veya üzeri olmalı"),
    totalNet: z.number().min(0, "Toplam net sayısı 0 veya üzeri olmalı"),
    time: z.number().min(0, "Süre 0 veya üzeri olmalı"),
    topicAnalysis: z.array(topicAnalysisSchema).optional(),
  })
  .transform((data) => {
    const net = data.correct - data.wrong * 0.25;

    return {
      ...data,
      totalNet: Math.round(net * 100) / 100,
    };
  });
export const addExamSchema = z
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

export type AddExamRequest = z.infer<typeof addExamSchema>;
export type TopicAnalysisRequest = z.infer<typeof topicAnalysisSchema>;
