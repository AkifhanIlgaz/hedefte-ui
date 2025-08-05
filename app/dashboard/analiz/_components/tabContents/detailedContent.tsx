"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { ChartConfig } from "@/components/ui/chart";
import { TabsContent } from "@/components/ui/tabs";
import { BookOpen, Calculator, Globe, FlaskConical } from "lucide-react";
import SubjectDetailModal from "../modals/subjectDetailModal";

export const radarData = [
  {
    subject: "Türkçe",
    averageNet: 35,
    maxWrongTopic: "Paragraf",
    wrongCount: 8,
    totalQuestions: 40,
    topicDetails: [
      { topic: "Paragraf", wrongCount: 8 },
      { topic: "Dilbilgisi", wrongCount: 5 },
      { topic: "Sözcük Bilgisi", wrongCount: 3 },
      { topic: "Anlatım Bozuklukları", wrongCount: 2 },
    ],
  },
  {
    subject: "Matematik",
    averageNet: 25,
    maxWrongTopic: "Fonksiyon",
    wrongCount: 12,
    totalQuestions: 40,
    topicDetails: [
      { topic: "Fonksiyon", wrongCount: 12 },
      { topic: "Geometri", wrongCount: 8 },
      { topic: "Olasılık", wrongCount: 6 },
      { topic: "Trigonometri", wrongCount: 4 },
    ],
  },
  {
    subject: "Sosyal Bilimler",
    averageNet: 15,
    maxWrongTopic: "Tarih",
    wrongCount: 6,
    totalQuestions: 20,
    topicDetails: [
      { topic: "Tarih", wrongCount: 6 },
      { topic: "Coğrafya", wrongCount: 4 },
      { topic: "Felsefe", wrongCount: 3 },
      { topic: "Din Kültürü", wrongCount: 2 },
    ],
  },
  {
    subject: "Sosyal Bilimler",
    averageNet: 15,
    maxWrongTopic: "Tarih",
    wrongCount: 6,
    totalQuestions: 20,
    topicDetails: [
      { topic: "Tarih", wrongCount: 6 },
      { topic: "Coğrafya", wrongCount: 4 },
      { topic: "Felsefe", wrongCount: 3 },
      { topic: "Din Kültürü", wrongCount: 2 },
    ],
  },
  {
    subject: "Sosyal Bilimler",
    averageNet: 15,
    maxWrongTopic: "Tarih",
    wrongCount: 6,
    totalQuestions: 20,
    topicDetails: [
      { topic: "Tarih", wrongCount: 6 },
      { topic: "Coğrafya", wrongCount: 4 },
      { topic: "Felsefe", wrongCount: 3 },
      { topic: "Din Kültürü", wrongCount: 2 },
    ],
  },
  {
    subject: "Sosyal Bilimler",
    averageNet: 15,
    maxWrongTopic: "Tarih",
    wrongCount: 6,
    totalQuestions: 20,
    topicDetails: [
      { topic: "Tarih", wrongCount: 6 },
      { topic: "Coğrafya", wrongCount: 4 },
      { topic: "Felsefe", wrongCount: 3 },
      { topic: "Din Kültürü", wrongCount: 2 },
    ],
  },

  {
    subject: "Fen Bilimleri",
    averageNet: 12,
    maxWrongTopic: "Fizik",
    wrongCount: 8,
    totalQuestions: 20,
    topicDetails: [
      { topic: "Fizik", wrongCount: 8 },
      { topic: "Kimya", wrongCount: 5 },
      { topic: "Biyoloji", wrongCount: 3 },
    ],
  },
];

const radarConfig = {
  averageNet: {
    label: "Ortalama Net",
    color: "#d97706",
  },
  wrongCount: {
    label: "En Çok Yanlış",
    color: "#dc2626",
  },
} satisfies ChartConfig;


// Ders iconlarını tanımla
const subjectIcons = {
  Türkçe: BookOpen,
  Matematik: Calculator,
  "Sosyal Bilimler": Globe,
  "Fen Bilimleri": FlaskConical,
};


export default function DetailedContent() {
  return (
    <TabsContent value="detailed" className="space-y-2">
      <div className="w-full">
        {/* Subject Cards */}
        <div className="space-y-4">
         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {radarData.slice(0, 4).map((subject, index) => {
              const IconComponent =
                subjectIcons[subject.subject as keyof typeof subjectIcons];
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                          <IconComponent className="w-6 h-6 text-amber-700 dark:text-amber-300" />
                        </div>
                        <h4 className="font-semibold text-foreground text-lg">
                          {subject.subject}
                        </h4>
                      </div>
                      <SubjectDetailModal subject={subject} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg">
                          <div className="text-2xl font-bold text-amber-600">
                            {subject.averageNet}
                          </div>
                          <div className="text-sm text-amber-600">
                            Ortalama Net
                          </div>
                          <div className="text-xs text-muted-foreground">
                            / {subject.totalQuestions}
                          </div>
                        </div>
                        <div className="text-center p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">
                            {subject.wrongCount}
                          </div>
                          <div className="text-sm text-red-600">
                            En Çok Yanlış
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {subject.maxWrongTopic}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-muted-foreground">
                          Top 3 Yanlış Konular:
                        </h5>
                        <div className="space-y-1">
                          {subject.topicDetails
                            .slice(0, 3)
                            .map((topic, topicIndex) => (
                              <div
                                key={topicIndex}
                                className="flex justify-between items-center p-2 bg-muted/50 rounded text-sm"
                              >
                                <span className="font-medium">
                                  {topic.topic}
                                </span>
                                <span className="text-red-600 font-semibold">
                                  {topic.wrongCount}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
