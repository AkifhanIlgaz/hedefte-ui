"use client";

import { Button } from "@/components/ui/button";
import { BarChart3, Calendar, Plus, Target, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { text } from "@/lib/constants/text";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import AnalysisCard from "../../_components/cards/analysisCard";
import { Header } from "../../_components/header";
import AllExamsContent from "../../_components/tabContents/allExamsContent";
import DetailedContent from "../../_components/tabContents/detailedContent";
import GeneralContent from "../../_components/tabContents/generalContent";
import { AnalysisFormRequest } from "../../_schemas/schema";

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<AnalysisFormRequest[]>();

  const getExams = async () => {
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

        <Button
          onClick={() => router.push("/dashboard/analiz/add/tyt")}
          className="gap-2 bg-amber-600 hover:bg-amber-700 text-white cursor-pointer"
        >
          <Plus className="size-4" />
          {text.analysis.tyt.analysis.addButton}
        </Button>
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
        <AllExamsContent allExams={data || []} />
      </Tabs>
    </div>
  );
}
