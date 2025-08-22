"use client";

import { Button } from "@/components/ui/button";
import { BarChart3, Calendar, Plus, Target, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { text } from "@/lib/constants/text";
import { createClient } from "@/lib/supabase/client";
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
  const [data, setData] = useState<AnalysisFormRequest[]>();

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
