"use client";

import { createClient } from "@/src/lib/supabase/client";

export default function Page() {
  createClient()
    .auth.getSession()
    .then((value) => {
      console.log(value.data.session);
    });

  return <p>Dashboard protected</p>;
}
