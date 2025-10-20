"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { routes } from "@/src/config/routes";
import { Navbar } from "@/src/shared/components/navbar";
import { useAuth } from "@/src/shared/hooks/useAuth";
import {
  BarChart,
  BookOpen,
  Calendar,
  GraduationCap,
  Home,
  TrendingUp,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

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
    title: "Analiz & Raporlar",
    items: [
      {
        id: "tyt-analysis",
        label: "TYT Deneme Analizi",
        icon: BarChart,
        href: routes.dashboard.analysis.tyt,
      },
      {
        id: "ayt-analysis",
        label: "AYT Deneme Analizi",
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
  const { user } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    if (user && path !== routes.dashboard.profile.base) {
      const meta = user.user_metadata || {};

      // name varsa firstName ve lastName çıkar
      let firstName = meta.firstName || "";
      let lastName = meta.lastName || "";

      if (meta.name && !firstName && !lastName) {
        const nameParts = meta.name.trim().split(" ");
        if (nameParts.length > 1) {
          lastName = nameParts.pop() || "";
          firstName = nameParts.join(" ");
        } else {
          firstName = meta.name;
        }
      }

      const isProfileIncomplete =
        !firstName || !lastName || !meta.uni || !meta.department || !meta.field;

      setShowProfileModal(isProfileIncomplete);
    }
  }, [user, path]);

  const handleGoToProfile = () => {
    router.push(routes.dashboard.profile.base);
    setShowProfileModal(false);
  };

  return (
    <SidebarProvider>
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Profil Bilgilerinizi Tamamlayın</DialogTitle>
            <DialogDescription>
              Hedefte{"'"}yi kullanmaya başlamadan önce profil bilgilerinizi
              tamamlamanız gerekmektedir. Lütfen ad, soyad, üniversite, bölüm ve
              alan bilgilerinizi ekleyin.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleGoToProfile}>Profile Git</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                        onClick={() =>
                          router.push(
                            typeof item.href === "string"
                              ? item.href
                              : item.href.base
                          )
                        }
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
        <SidebarFooter></SidebarFooter>
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
