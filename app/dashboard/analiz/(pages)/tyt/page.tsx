"use client";

import { Button } from "@/components/ui/button";
import { BarChart3, Calendar, Plus, Target, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { text } from "@/lib/constants/text";
import { createClient } from "@/src/lib/supabase/client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AnalysisCard from "../../_components/cards/analysisCard";
import { Header } from "../../_components/header";
import AllExamsContent from "../../_components/tabContents/allExamsContent";
import DetailedContent from "../../_components/tabContents/detailedContent";
import GeneralContent from "../../_components/tabContents/generalContent";
import { AnalysisFormRequest } from "../../_schemas/schema";
import { transformAnalysisData } from "../../_utils/transform";

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<AnalysisFormRequest[]>([
    {
      date: new Date("2025-08-01"),
      totalNet: 35.75,
      name: "Demo TYT 1",
      subjects: [
        {
          name: "Türkçe",
          id: 0,
          correct: 30,
          wrong: 5,
          empty: 5,
          total: 40,
          topicMistakes: [{ topic: "Paragraf", mistakes: 2 }],
        },
        {
          name: "Tarih",
          id: 1,
          correct: 3,
          wrong: 1,
          empty: 1,
          total: 5,
          topicMistakes: [{ topic: "İnkılap", mistakes: 1 }],
        },
        {
          name: "Coğrafya",
          id: 2,
          correct: 4,
          wrong: 1,
          empty: 0,
          total: 5,
          topicMistakes: [{ topic: "Türkiye", mistakes: 1 }],
        },
        {
          name: "Din",
          id: 3,
          correct: 3,
          wrong: 2,
          empty: 0,
          total: 5,
          topicMistakes: [{ topic: "İslam", mistakes: 2 }],
        },
        {
          name: "Felsefe",
          id: 4,
          correct: 2,
          wrong: 2,
          empty: 1,
          total: 5,
          topicMistakes: [{ topic: "Mantık", mistakes: 2 }],
        },
        {
          name: "Matematik",
          id: 5,
          correct: 20,
          wrong: 10,
          empty: 10,
          total: 40,
          topicMistakes: [{ topic: "Problemler", mistakes: 4 }],
        },
        {
          name: "Fizik",
          id: 6,
          correct: 5,
          wrong: 1,
          empty: 1,
          total: 7,
          topicMistakes: [{ topic: "Kuvvet", mistakes: 1 }],
        },
        {
          name: "Kimya",
          id: 7,
          correct: 5,
          wrong: 2,
          empty: 0,
          total: 7,
          topicMistakes: [{ topic: "Maddeler", mistakes: 2 }],
        },
        {
          name: "Biyoloji",
          id: 8,
          correct: 4,
          wrong: 1,
          empty: 1,
          total: 6,
          topicMistakes: [{ topic: "Hücre", mistakes: 1 }],
        },
      ],
    },
    {
      date: new Date("2025-08-08"),
      totalNet: 38.5,
      name: "Demo TYT 2",
      subjects: [
        {
          name: "Türkçe",
          id: 0,
          correct: 32,
          wrong: 4,
          empty: 4,
          total: 40,
          topicMistakes: [{ topic: "Dil Bilgisi", mistakes: 2 }],
        },
        {
          name: "Tarih",
          id: 1,
          correct: 4,
          wrong: 1,
          empty: 0,
          total: 5,
          topicMistakes: [{ topic: "Osmanlı", mistakes: 1 }],
        },
        {
          name: "Coğrafya",
          id: 2,
          correct: 5,
          wrong: 0,
          empty: 0,
          total: 5,
          topicMistakes: [],
        },
        {
          name: "Din",
          id: 3,
          correct: 4,
          wrong: 1,
          empty: 0,
          total: 5,
          topicMistakes: [{ topic: "Ahlak", mistakes: 1 }],
        },
        {
          name: "Felsefe",
          id: 4,
          correct: 3,
          wrong: 2,
          empty: 0,
          total: 5,
          topicMistakes: [{ topic: "Felsefe Tarihi", mistakes: 2 }],
        },
        {
          name: "Matematik",
          id: 5,
          correct: 25,
          wrong: 8,
          empty: 7,
          total: 40,
          topicMistakes: [{ topic: "Geometri", mistakes: 3 }],
        },
        {
          name: "Fizik",
          id: 6,
          correct: 6,
          wrong: 1,
          empty: 0,
          total: 7,
          topicMistakes: [{ topic: "Enerji", mistakes: 1 }],
        },
        {
          name: "Kimya",
          id: 7,
          correct: 6,
          wrong: 1,
          empty: 0,
          total: 7,
          topicMistakes: [{ topic: "Asitler", mistakes: 1 }],
        },
        {
          name: "Biyoloji",
          id: 8,
          correct: 5,
          wrong: 1,
          empty: 0,
          total: 6,
          topicMistakes: [{ topic: "Canlılar", mistakes: 1 }],
        },
      ],
    },
    {
      date: new Date("2025-08-15"),
      totalNet: 40.0,
      name: "Demo TYT 3",
      subjects: [
        {
          name: "Türkçe",
          id: 0,
          correct: 34,
          wrong: 3,
          empty: 3,
          total: 40,
          topicMistakes: [{ topic: "Paragraf", mistakes: 1 }],
        },
        {
          name: "Tarih",
          id: 1,
          correct: 5,
          wrong: 0,
          empty: 0,
          total: 5,
          topicMistakes: [],
        },
        {
          name: "Coğrafya",
          id: 2,
          correct: 5,
          wrong: 0,
          empty: 0,
          total: 5,
          topicMistakes: [],
        },
        {
          name: "Din",
          id: 3,
          correct: 5,
          wrong: 0,
          empty: 0,
          total: 5,
          topicMistakes: [],
        },
        {
          name: "Felsefe",
          id: 4,
          correct: 4,
          wrong: 1,
          empty: 0,
          total: 5,
          topicMistakes: [{ topic: "Mantık", mistakes: 1 }],
        },
        {
          name: "Matematik",
          id: 5,
          correct: 28,
          wrong: 7,
          empty: 5,
          total: 40,
          topicMistakes: [{ topic: "Problemler", mistakes: 2 }],
        },
        {
          name: "Fizik",
          id: 6,
          correct: 7,
          wrong: 0,
          empty: 0,
          total: 7,
          topicMistakes: [],
        },
        {
          name: "Kimya",
          id: 7,
          correct: 7,
          wrong: 0,
          empty: 0,
          total: 7,
          topicMistakes: [],
        },
        {
          name: "Biyoloji",
          id: 8,
          correct: 6,
          wrong: 0,
          empty: 0,
          total: 6,
          topicMistakes: [],
        },
      ],
    },
    {
      date: new Date("2025-08-22"),
      totalNet: 42.0,
      name: "Demo TYT 4",
      subjects: [
        {
          name: "Türkçe",
          id: 0,
          correct: 36,
          wrong: 2,
          empty: 2,
          total: 40,
          topicMistakes: [{ topic: "Dil Bilgisi", mistakes: 1 }],
        },
        {
          name: "Tarih",
          id: 1,
          correct: 5,
          wrong: 0,
          empty: 0,
          total: 5,
          topicMistakes: [],
        },
        {
          name: "Coğrafya",
          id: 2,
          correct: 5,
          wrong: 0,
          empty: 0,
          total: 5,
          topicMistakes: [],
        },
        {
          name: "Din",
          id: 3,
          correct: 5,
          wrong: 0,
          empty: 0,
          total: 5,
          topicMistakes: [],
        },
        {
          name: "Felsefe",
          id: 4,
          correct: 5,
          wrong: 0,
          empty: 0,
          total: 5,
          topicMistakes: [],
        },
        {
          name: "Matematik",
          id: 5,
          correct: 30,
          wrong: 5,
          empty: 5,
          total: 40,
          topicMistakes: [{ topic: "Geometri", mistakes: 1 }],
        },
        {
          name: "Fizik",
          id: 6,
          correct: 7,
          wrong: 0,
          empty: 0,
          total: 7,
          topicMistakes: [],
        },
        {
          name: "Kimya",
          id: 7,
          correct: 7,
          wrong: 0,
          empty: 0,
          total: 7,
          topicMistakes: [],
        },
        {
          name: "Biyoloji",
          id: 8,
          correct: 6,
          wrong: 0,
          empty: 0,
          total: 6,
          topicMistakes: [],
        },
      ],
    },
    {
      date: new Date("2025-08-29"),
      totalNet: 44.5,
      name: "Demo TYT 5",
      subjects: [
        {
          name: "Türkçe",
          id: 0,
          correct: 38,
          wrong: 1,
          empty: 1,
          total: 40,
          topicMistakes: [{ topic: "Paragraf", mistakes: 1 }],
        },
        {
          name: "Tarih",
          id: 1,
          correct: 5,
          wrong: 0,
          empty: 0,
          total: 5,
          topicMistakes: [],
        },
        {
          name: "Coğrafya",
          id: 2,
          correct: 5,
          wrong: 0,
          empty: 0,
          total: 5,
          topicMistakes: [],
        },
        {
          name: "Din",
          id: 3,
          correct: 5,
          wrong: 0,
          empty: 0,
          total: 5,
          topicMistakes: [],
        },
        {
          name: "Felsefe",
          id: 4,
          correct: 5,
          wrong: 0,
          empty: 0,
          total: 5,
          topicMistakes: [],
        },
        {
          name: "Matematik",
          id: 5,
          correct: 35,
          wrong: 3,
          empty: 2,
          total: 40,
          topicMistakes: [{ topic: "Problemler", mistakes: 1 }],
        },
        {
          name: "Fizik",
          id: 6,
          correct: 7,
          wrong: 0,
          empty: 0,
          total: 7,
          topicMistakes: [],
        },
        {
          name: "Kimya",
          id: 7,
          correct: 7,
          wrong: 0,
          empty: 0,
          total: 7,
          topicMistakes: [],
        },
        {
          name: "Biyoloji",
          id: 8,
          correct: 6,
          wrong: 0,
          empty: 0,
          total: 6,
          topicMistakes: [],
        },
      ],
    },
  ]);

  const getExams = useMemo(() => {
    return async () => {
      try {
        // Access token'ı al
        const {
          data: { session },
        } = await createClient().auth.getSession();

        // API'ye POST isteği gönder
        const response = await fetch(
          "http://localhost:8080/api/analysis?exam=TYT",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );
        console.log(response);

        const result = await response.json();

        setData(result.payload);
      } finally {
      }
    };
  }, []);

  const transformedData = useMemo(() => {
    if (!data || data.length === 0) return null;
    return transformAnalysisData(data);
  }, [data]);

  useEffect(() => {
    getExams();
  }, []);
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex sm:flex-row sm:items-center sm:justify-between">
        <Header
          title={text.analysis.tyt.analysis.title}
          subtitle={text.analysis.tyt.analysis.subtitle}
        />

        <Link href="/dashboard/analiz/add/tyt">
          <Button className="gap-2 bg-amber-600 hover:bg-amber-700 text-white cursor-pointer">
            <Plus className="size-4" />
            {text.analysis.tyt.analysis.addButton}
          </Button>
        </Link>
      </div>
      {/* Analysis Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <AnalysisCard
          icon={Target}
          label={"Son Net"}
          value={transformedData?.generalStats.lastNet || 0}
        />
        <AnalysisCard
          icon={TrendingUp}
          label={"Gelişim"}
          value={transformedData?.generalStats.improvement || 0}
          variant={
            transformedData?.generalStats.improvement &&
            transformedData.generalStats.improvement > 0
              ? "up"
              : "down"
          }
        />
        <AnalysisCard
          icon={BarChart3}
          label={"Ortalama"}
          value={transformedData?.generalStats.average || 0}
        />
        <AnalysisCard
          icon={Calendar}
          label={"Toplam Deneme"}
          value={transformedData?.generalStats.totalExams || 0}
        />
      </div>
      {/* Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Genel Analiz</TabsTrigger>
          <TabsTrigger value="detailed">Detaylı Analiz</TabsTrigger>
          <TabsTrigger value="all">Denemeler</TabsTrigger>
        </TabsList>
        <GeneralContent allExams={transformedData?.rawData || []} />
        <DetailedContent allExams={transformedData?.rawData || []} />
        <AllExamsContent
          allExams={transformedData?.rawData || []}
          examType="TYT"
        />
      </Tabs>
    </div>
  );
}
