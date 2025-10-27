import z from "zod";

export const resourceSchema = z.object({
  name: z.string().min(1, "Kaynak adı boş bırakılamaz"),
  lessonId: z.string().min(1, "Sınav türü seçilmelidir"),
  userId: z.string().min(1, "Ders seçilmelidir"),
});

export type Resource = z.infer<typeof resourceSchema>;
