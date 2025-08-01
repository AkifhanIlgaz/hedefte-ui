"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  BarChart,
  Bell,
  BookOpen,
  Calendar,
  Gamepad2,
  GraduationCap,
  Home,
  LogOut,
  Moon,
  Search,
  Settings,
  Sun,
  Target,
  TrendingUp,
  User,
} from "lucide-react";
import { ReactNode, useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  user: {
    name: string;
    email: string;
  };
  onSignout: () => void;
  currentSection: string;
  onSectionChange: (section: string) => void;
  isDarkMode: boolean; // IS_DARK_MODE_PROP
  onToggleDarkMode: () => void; // TOGGLE_DARK_MODE_PROP
}

interface NavbarProps {
  user: {
    name: string;
    email: string;
  };
  onSignout: () => void;
  isDarkMode: boolean; // IS_DARK_MODE_PROP
  onToggleDarkMode: () => void; // TOGGLE_DARK_MODE_PROP
}

function Navbar({
  user,
  onSignout,
  isDarkMode,
  onToggleDarkMode,
}: NavbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b border-divider">
      <SidebarTrigger className="-ml-1" />

      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-default-400" />
          <Input
            placeholder="Ara..." // SEARCH_PLACEHOLDER
            className="pl-10 bg-default-100 border-0 h-9"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleDarkMode}
          className="h-8 w-8"
        >
          {isDarkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>

        <Button variant="ghost" size="icon" className="h-8 w-8 relative">
          <Bell className="h-4 w-4" />
          <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-danger border-2 border-background"></div>
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="h-8 px-2 gap-2"
          >
            <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs text-default-500">{user.email}</p>
            </div>
          </Button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
              ></div>
              <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-divider bg-background p-2 shadow-lg z-20">
                <div className="px-2 py-1.5 border-b border-divider">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-default-500">{user.email}</p>
                </div>

                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 mt-1"
                >
                  <User className="h-4 w-4" />
                  Profil Ayarları {/* PROFILE_SETTINGS */}
                </Button>

                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Settings className="h-4 w-4" />
                  Hesap Ayarları {/* ACCOUNT_SETTINGS */}
                </Button>

                <div className="border-t border-divider mt-1 pt-1">
                  <Button
                    variant="ghost"
                    onClick={onSignout}
                    className="w-full justify-start gap-2 text-danger hover:text-danger hover:bg-danger/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Çıkış Yap {/* SIGN_OUT_BUTTON */}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default function AuthenticatedLayout({
  children,
}: DashboardLayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(false); // DARK_MODE_STATE

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

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
    {
      title: "Ekstralar", // EXTRAS_GROUP
      items: [
        { id: "memory-game", label: "Memory Oyunu", icon: Gamepad2 }, // MEMORY_GAME_ITEM
      ],
    },
    {
      title: "Ayarlar", // SETTINGS_GROUP
      items: [
        { id: "settings", label: "Ayarlar", icon: Settings }, // SETTINGS_ITEM
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
        <Navbar
          user={{ email: "sdfsdf", name: "sdfsdf" }}
          onSignout={() => {}}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
