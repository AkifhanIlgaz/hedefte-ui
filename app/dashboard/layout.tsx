"use client";
import { Navbar } from "@/components/app/Navbar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  BarChart,
  BookOpen,
  Calendar,
  GraduationCap,
  Home,
  Target,
  TrendingUp,
} from "lucide-react";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function AuthenticatedLayout({
  children,
}: DashboardLayoutProps) {
  const sidebarGroups = [
    {
      title: "Genel", // GENERAL_GROUP
      items: [
        { id: "overview", label: "Ana Sayfa", icon: Home }, // OVERVIEW_ITEM
      ],
    },
    {
      title: "Çalışma & Takip", // STUDY_TRACKING_GROUP
      items: [
        { id: "tyt-study", label: "TYT Çalışma", icon: GraduationCap }, // TYT_STUDY_ITEM
        { id: "ayt-study", label: "AYT Çalışma", icon: BookOpen }, // AYT_STUDY_ITEM
        { id: "schedule", label: "Haftalık Program", icon: Calendar }, // SCHEDULE_ITEM
        { id: "daily-questions", label: "Günlük Sorular", icon: Target }, // DAILY_QUESTIONS_ITEM
      ],
    },
    {
      title: "Analiz & Raporlar", // ANALYSIS_REPORTS_GROUP
      items: [
        { id: "tyt-analysis", label: "TYT Analizi", icon: BarChart }, // TYT_ANALYSIS_ITEM
        { id: "ayt-analysis", label: "AYT Analizi", icon: TrendingUp }, // AYT_ANALYSIS_ITEM
      ],
    },
  ];

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-bold">H</span> {/* HEDEFTE_LOGO */}
            </div>
            <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">
              Hedefte
            </span>{" "}
            {/* BRAND_NAME */}
          </div>
        </SidebarHeader>
        <SidebarContent>
          {sidebarGroups.map((group, groupIndex) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel className="px-2 text-xs font-medium text-default-500 uppercase tracking-wider">
                {group.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        // isActive={currentSection === item.id}
                        // onClick={() => onSectionChange(item.id)}
                        tooltip={item.label}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <div className="rounded-lg bg-default-100 p-3 group-data-[collapsible=icon]:hidden">
            <h4 className="font-medium text-sm">Yardıma mı ihtiyacın var?</h4>{" "}
            {/* NEED_HELP_TITLE */}
            <p className="text-xs text-default-500 mt-1">
              Rehberler ve eğitimler için dökümantasyonu kontrol et.
            </p>{" "}
            {/* HELP_DESCRIPTION */}
            <Button
              variant="link"
              className="h-auto p-0 mt-2 text-primary text-xs"
            >
              Dökümanlara Bak → {/* VIEW_DOCS_BUTTON */}
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Navbar />
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
