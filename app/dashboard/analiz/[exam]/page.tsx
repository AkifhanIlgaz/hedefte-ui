"use client";

import { Button } from "@/components/ui/button";
import { BarChart3, Calendar, Plus, Target, TrendingUp } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { text } from "@/lib/constants/text";
import {
  AllExamsContent,
  AnalysisCard,
  DetailedContent,
  GeneralContent,
} from "@/src/features/analysis/components";
import { createClient } from "@/src/lib/supabase/client";
import { DashboardHeader } from "@/src/shared/components/dashboardHeader";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { analysisText } from "@/src/features/analysis/analysis.text";
import { ExamType } from "@/src/shared/domain/types";
import { AddExamRequest } from "@/src/features/analysis/validations/analysis.validation";

export default function Page({
  params,
}: {
  params: Promise<{ exam: ExamType }>;
}) {
  const { exam } = use(params);
  const text = exam === "tyt" ? analysisText.tyt : analysisText.ayt;
  const [data, setData] = useState<AddExamRequest[]>();

  useEffect(() => {
    const getExams = async () => {
      try {
        // Access token'ı al
        const {
          data: { session },
        } = await createClient().auth.getSession();

        // API'ye POST isteği gönder
        const response = await fetch(
          `http://localhost:8080/api/${exam}/analysis`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.access_token}`,
            },
          },
        );

        const result = await response.json();
        setData(result.payload);
      } finally {
      }
    };
    getExams();
  }, [exam]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex sm:flex-row sm:items-center sm:justify-between">
        <DashboardHeader
          title={text.analysis.title}
          subtitle={text.analysis.subtitle}
        />

        <Link href={`/dashboard/analiz/add/${exam}`}>
          <Button className="gap-2 bg-amber-600 hover:bg-amber-700 text-white cursor-pointer">
            <Plus className="size-4" />
            {text.analysis.addButton}
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
        <GeneralContent allExams={data || []} exam={exam} />
        <DetailedContent allExams={data || []} exam={exam} />
        <AllExamsContent allExams={data || []} exam={exam} />
      </Tabs>
    </div>
  );
}
