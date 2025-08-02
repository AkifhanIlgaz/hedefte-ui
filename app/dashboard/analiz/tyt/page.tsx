"use client";

import AddTYTResultModal from "@/components/app/analiz/addModal";
import { CircularProgress } from "@/components/app/CircularProgress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <span>TYT Analizi</span>
      <Link href={"http://localhost:3000/dashboard/analiz/tyt/ekle"}>
        <Button className="cursor-pointer">TYT Denemesi Ekle</Button>
      </Link>
      <AddTYTResultModal />
      <CircularProgress value={90} />
    </div>
  );
}
