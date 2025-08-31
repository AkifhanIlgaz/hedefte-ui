export const tytSubjects = [
  {
    name: "Türkçe",
    total: 40,
    subFields: [{ index: 0, id: 1, name: "Türkçe", total: 40 }],
  },
  {
    name: "Sosyal Bilimler",
    total: 20,
    subFields: [
      { index: 1, id: 2, name: "Tarih", total: 5 },
      { index: 2, id: 3, name: "Coğrafya", total: 5 },
      { index: 3, id: 4, name: "Felsefe", total: 5 },
      { index: 4, id: 5, name: "Din Kültürü", total: 5 },
    ],
  },
  {
    name: "Matematik",
    total: 40,
    subFields: [{ index: 5, id: 6, name: "Matematik", total: 40 }],
  },
  {
    name: "Fen Bilimleri",
    total: 20,
    subFields: [
      { index: 6, id: 7, name: "Fizik", total: 7 },
      { index: 7, id: 8, name: "Kimya", total: 7 },
      { index: 8, id: 9, name: "Biyoloji", total: 6 },
    ],
  },
];

export const EaSubjects = [
  {
    name: "Edebiyat ve Sosyal Bilimler",
    total: 40,
    subFields: [
      { index: 0, id: 10, name: "Türk Dili ve Edebiyatı", total: 24 },
      { index: 1, id: 11, name: "Tarih", total: 10 },
      { index: 2, id: 12, name: "Coğrafya", total: 6 },
    ],
  },
  {
    name: "Matematik",
    total: 40,
    subFields: [{ index: 3, id: 13, name: "Matematik", total: 40 }],
  },
];

export const MfSubjects = [
  {
    name: "Matematik",
    total: 40,
    subFields: [{ index: 0, id: 13, name: "Matematik", total: 40 }],
  },
  {
    name: "Fen Bilimleri",
    total: 40,
    subFields: [
      { index: 1, id: 14, name: "Fizik", total: 14 },
      { index: 2, id: 15, name: "Kimya", total: 14 },
      { index: 3, id: 16, name: "Biyoloji", total: 13 },
    ],
  },
];

export type Subject = {
  index: number;
  id: number;
  name: string;
  total: number;
};
