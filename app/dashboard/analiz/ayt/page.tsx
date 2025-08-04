import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <span>AYT Analizi</span>
      <Link href={"http://localhost:3000/dashboard/analiz/ayt/ekle"}>
        <Button className="cursor-pointer">AYT Denemesi Ekle</Button>
      </Link>
    </div>
  );
}
