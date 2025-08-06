"use client";

import { createClient } from "@/lib/supabase/client";

export default function Page() {
  createClient()
    .auth.getSession()
    .then((value) => {
      console.log(value.data.session);
    });

  localStorage.setItem("bolum", "MF");

  return <p>Dashboard protected</p>;
}
