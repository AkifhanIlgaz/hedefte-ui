"use client";
import { createClient } from "@/src/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      // Çıkış yapıldığında anasayfaya yönlendir
      if (event === "SIGNED_OUT") {
        router.push("/");
        router.refresh();
      } else if (event === "SIGNED_IN") {
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth, router]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      // onAuthStateChange içinde yönlendirme yapılacak
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return { user, loading, signOut };
}
