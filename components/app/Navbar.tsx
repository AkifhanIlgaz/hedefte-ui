"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Bell, LogOut, Moon, Search, Settings, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    }
    if (theme === "dark") setTheme("light");
  };
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
          onClick={toggleTheme}
          className="h-8 w-8"
        >
          {theme === "dark" ? (
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
              {user?.user_metadata.firstName.charAt(0).toUpperCase()}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium leading-none">
                {user?.user_metadata.firstName}
              </p>
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
                  <p className="font-medium">{user?.user_metadata.name}</p>
                  <p className="text-sm text-default-500">{user?.email}</p>
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
                    onClick={signOut}
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
