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
import { routes } from "@/lib/routes";
import {
  BarChart,
  BookOpen,
  Calendar,
  GraduationCap,
  Home,
  TrendingUp,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

const sidebarGroups = [
  {
    title: "Genel",
    items: [
      {
        id: "overview",
        label: "Ana Sayfa",
        icon: Home,
        href: routes.dashboard.home,
      },
    ],
  },
  {
    title: "Çalışma & Takip",
    items: [
      {
        id: "tyt-study",
        label: "TYT Çalışma",
        icon: GraduationCap,
        href: routes.dashboard.study.tyt,
      },
      {
        id: "ayt-study",
        label: "AYT Çalışma",
        icon: BookOpen,
        href: routes.dashboard.study.ayt,
      },
      {
        id: "schedule",
        label: "Haftalık Program",
        icon: Calendar,
        href: routes.dashboard.schedule,
      },
    ],
  },
  {
    title: "Analiz & Raporlar", // ANALYSIS_REPORTS_GROUP
    items: [
      {
        id: "tyt-analysis",
        label: "TYT Analizi",
        icon: BarChart,
        href: routes.dashboard.analysis.tyt,
      },
      {
        id: "ayt-analysis",
        label: "AYT Analizi",
        icon: TrendingUp,
        href: routes.dashboard.analysis.ayt,
      },
    ],
  },
];

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const path = usePathname();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <div className="h-8 w-8 items-center justify-center rounded-lg  hidden group-data-[collapsible=icon]:flex">
              <span className="text-sm pacifico-regular">H</span>{" "}
            </div>
            <span className="font-semibold  text-lg text-center  group-data-[collapsible=icon]:hidden">
              Hedefte
            </span>{" "}
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
                        isActive={path === item.href}
                        onClick={() => router.push(item.href!)}
                        tooltip={item.label}
                        className="cursor-pointer "
                      >
                        <item.icon className="w-6 h-6 group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5 text-amber-700 dark:text-amber-300" />
                        <span className="">{item.label}</span>
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
        <div className="flex flex-1 flex-col gap-8 p-8 min-h-screen ">
          <div className="flex flex-1 flex-col ">
            <div className="container mx-auto max-w-full">{children}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
