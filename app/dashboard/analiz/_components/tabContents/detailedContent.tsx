"use client";

import { TabsContent } from "@/components/ui/tabs";
import {
  BookOpen,
  Calculator,
  FlaskConical,
  Globe,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import SubjectCard from "../cards/subjectCard";

export const subjectPerformanceData = [
  {
    subject: "Türkçe",
    icon: BookOpen,
    stats: {
      average: 35,
      totalQuestions: 40,
      best: 38,
      worst: 32,
      improvement: +3,
      consistencyScore: 85,
    },
    weakestTopics: [
      { topic: "Paragraf", wrongCount: 8, trend: "down" },
      { topic: "Dilbilgisi", wrongCount: 5, trend: "stable" },
      { topic: "Sözcük Bilgisi", wrongCount: 3, trend: "up" },
    ],
    recentTrend: "up",
  },
  {
    subject: "Matematik",
    icon: Calculator,
    stats: {
      average: 25,
      totalQuestions: 40,
      best: 30,
      worst: 20,
      improvement: -2,
      consistencyScore: 65,
    },
    weakestTopics: [
      { topic: "Fonksiyon", wrongCount: 12, trend: "down" },
      { topic: "Geometri", wrongCount: 8, trend: "stable" },
      { topic: "Trigonometri", wrongCount: 6, trend: "up" },
    ],
    recentTrend: "down",
  },
  {
    subject: "Sosyal Bilimler",
    icon: Globe,
    stats: {
      average: 15,
      totalQuestions: 20,
      best: 18,
      worst: 12,
      improvement: +1,
      consistencyScore: 75,
    },
    weakestTopics: [
      { topic: "Tarih", wrongCount: 6, trend: "stable" },
      { topic: "Coğrafya", wrongCount: 4, trend: "up" },
      { topic: "Felsefe", wrongCount: 3, trend: "up" },
    ],
    recentTrend: "stable",
  },
  {
    subject: "Fen Bilimleri",
    icon: FlaskConical,
    stats: {
      average: 12,
      totalQuestions: 20,
      best: 15,
      worst: 8,
      improvement: +4,
      consistencyScore: 60,
    },
    weakestTopics: [
      { topic: "Fizik", wrongCount: 8, trend: "down" },
      { topic: "Kimya", wrongCount: 5, trend: "up" },
      { topic: "Biyoloji", wrongCount: 3, trend: "up" },
    ],
    recentTrend: "up",
  },
];

function getTrendIcon(trend: string) {
  switch (trend) {
    case "up":
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    case "down":
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    default:
      return <Minus className="w-4 h-4 text-gray-500" />;
  }
}

function getTrendColor(trend: string) {
  switch (trend) {
    case "up":
      return "text-green-600";
    case "down":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
}

export default function DetailedContent() {
  return (
    <TabsContent value="detailed" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {subjectPerformanceData.map((subject, index) => {
          return (
            <SubjectCard
              key={index}
              icon={subject.icon}
              title={subject.subject}
              stats={subject.stats}
            />
          );
        })}
      </div>
    </TabsContent>
  );
}
