import z from "zod";

export const resourceSchema = z.object({
  name: z.string().min(1, "Kaynak adı boş bırakılamaz"),
  examType: z.string().min(1, "Sınav türü seçilmelidir"),
  subject: z.string().min(1, "Ders seçilmelidir"),
});

export type Resource = z.infer<typeof resourceSchema>;
