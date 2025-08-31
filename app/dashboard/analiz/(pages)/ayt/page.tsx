"use client";

import { Button } from "@/components/ui/button";
import { BarChart3, Calendar, Plus, Target, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { text } from "@/lib/constants/text";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import AnalysisCard from "../../_components/cards/analysisCard";
import { Header } from "../../_components/header";
import AllExamsContent from "../../_components/tabContents/allExamsContent";
import DetailedContent from "../../_components/tabContents/detailedContent";
import GeneralContent from "../../_components/tabContents/generalContent";
import { AnalysisFormRequest } from "../../_schemas/schema";

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<AnalysisFormRequest[]>([
    {
      date: new Date("2025-08-03"),
      totalNet: 30.5,
      name: "Demo AYT 1",
      subjects: [
        {
          name: "Matematik",
          id: 0,
          correct: 25,
          wrong: 10,
          empty: 5,
          total: 40,
          topicMistakes: [{ topic: "Fonksiyonlar", mistakes: 4 }],
        },
        {
          name: "Fizik",
          id: 1,
          correct: 10,
          wrong: 4,
          empty: 0,
          total: 14,
          topicMistakes: [{ topic: "Kuvvet", mistakes: 2 }],
        },
        {
          name: "Kimya",
          id: 2,
          correct: 10,
          wrong: 4,
          empty: 0,
          total: 14,
          topicMistakes: [{ topic: "Asitler", mistakes: 2 }],
        },
        {
          name: "Biyoloji",
          id: 3,
          correct: 10,
          wrong: 3,
          empty: 1,
          total: 13,
          topicMistakes: [{ topic: "Hücre", mistakes: 1 }],
        },
      ],
    },
    {
      date: new Date("2025-08-10"),
      totalNet: 32.75,
      name: "Demo AYT 2",
      subjects: [
        {
          name: "Matematik",
          id: 0,
          correct: 28,
          wrong: 7,
          empty: 5,
          total: 40,
          topicMistakes: [{ topic: "Limit", mistakes: 3 }],
        },
        {
          name: "Fizik",
          id: 1,
          correct: 12,
          wrong: 2,
          empty: 0,
          total: 14,
          topicMistakes: [{ topic: "Elektrik", mistakes: 1 }],
        },
        {
          name: "Kimya",
          id: 2,
          correct: 12,
          wrong: 2,
          empty: 0,
          total: 14,
          topicMistakes: [{ topic: "Bazlar", mistakes: 1 }],
        },
        {
          name: "Biyoloji",
          id: 3,
          correct: 11,
          wrong: 2,
          empty: 0,
          total: 13,
          topicMistakes: [{ topic: "Genetik", mistakes: 1 }],
        },
      ],
    },
    {
      date: new Date("2025-08-17"),
      totalNet: 35.0,
      name: "Demo AYT 3",
      subjects: [
        {
          name: "Matematik",
          id: 0,
          correct: 30,
          wrong: 5,
          empty: 5,
          total: 40,
          topicMistakes: [{ topic: "Türev", mistakes: 2 }],
        },
        {
          name: "Fizik",
          id: 1,
          correct: 13,
          wrong: 1,
          empty: 0,
          total: 14,
          topicMistakes: [{ topic: "Isı", mistakes: 1 }],
        },
        {
          name: "Kimya",
          id: 2,
          correct: 13,
          wrong: 1,
          empty: 0,
          total: 14,
          topicMistakes: [{ topic: "Karışımlar", mistakes: 1 }],
        },
        {
          name: "Biyoloji",
          id: 3,
          correct: 12,
          wrong: 1,
          empty: 0,
          total: 13,
          topicMistakes: [{ topic: "Ekoloji", mistakes: 1 }],
        },
      ],
    },
    {
      date: new Date("2025-08-24"),
      totalNet: 37.25,
      name: "Demo AYT 4",
      subjects: [
        {
          name: "Matematik",
          id: 0,
          correct: 32,
          wrong: 4,
          empty: 4,
          total: 40,
          topicMistakes: [{ topic: "İntegral", mistakes: 2 }],
        },
        {
          name: "Fizik",
          id: 1,
          correct: 14,
          wrong: 0,
          empty: 0,
          total: 14,
          topicMistakes: [],
        },
        {
          name: "Kimya",
          id: 2,
          correct: 14,
          wrong: 0,
          empty: 0,
          total: 14,
          topicMistakes: [],
        },
        {
          name: "Biyoloji",
          id: 3,
          correct: 13,
          wrong: 0,
          empty: 0,
          total: 13,
          topicMistakes: [],
        },
      ],
    },
    {
      date: new Date("2025-08-31"),
      totalNet: 39.0,
      name: "Demo AYT 5",
      subjects: [
        {
          name: "Matematik",
          id: 0,
          correct: 35,
          wrong: 2,
          empty: 3,
          total: 40,
          topicMistakes: [{ topic: "Kümeler", mistakes: 1 }],
        },
        {
          name: "Fizik",
          id: 1,
          correct: 14,
          wrong: 0,
          empty: 0,
          total: 14,
          topicMistakes: [],
        },
        {
          name: "Kimya",
          id: 2,
          correct: 14,
          wrong: 0,
          empty: 0,
          total: 14,
          topicMistakes: [],
        },
        {
          name: "Biyoloji",
          id: 3,
          correct: 13,
          wrong: 0,
          empty: 0,
          total: 13,
          topicMistakes: [],
        },
      ],
    },
  ]);

  const getExams = async () => {
    try {
      // Access token'ı al
      const {
        data: { session },
      } = await createClient().auth.getSession();

      // API'ye POST isteği gönder
      const response = await fetch(
        "http://localhost:8080/api/analysis?exam=AYT",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      const result = await response.json();

      setData(result.payload);
    } finally {
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex sm:flex-row sm:items-center sm:justify-between">
        <Header
          title={text.analysis.ayt.analysis.title}
          subtitle={text.analysis.ayt.analysis.subtitle}
        />

        <Link href="/dashboard/analiz/add/ayt">
          <Button className="gap-2 bg-amber-600 hover:bg-amber-700 text-white cursor-pointer">
            <Plus className="size-4" />
            {text.analysis.ayt.analysis.addButton}
          </Button>
        </Link>
      </div>
      {/* Analysis Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <AnalysisCard icon={Target} label={"Son Net"} value={88} />
        <AnalysisCard
          icon={TrendingUp}
          label={"Gelişim"}
          value={13.7}
          variant="up"
        />
        <AnalysisCard icon={BarChart3} label={"Ortalama"} value={77.75} />
        <AnalysisCard icon={Calendar} label={"Toplam Deneme"} value={2} />
      </div>
      {/* Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Genel Analiz</TabsTrigger>
          <TabsTrigger value="detailed">Detaylı Analiz</TabsTrigger>
          <TabsTrigger value="all">Denemeler</TabsTrigger>
        </TabsList>
        <GeneralContent allExams={data || []} />
        <DetailedContent allExams={data || []} />
        <AllExamsContent allExams={data || []} examType="AYT" />
      </Tabs>
    </div>
  );
}
