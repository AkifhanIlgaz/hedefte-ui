import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface SubjectCardProps {
  icon: LucideIcon;
  label: string;
  exam: "TYT" | "AYT";
  bgClass?: string;
  iconColor?: string;
}

export default function SubjectCard({
  icon: Icon,
  exam,
  label,
  bgClass,
  iconColor,
}: SubjectCardProps) {
  return (
    <Link href={`http://localhost:3000/dashboard/study/${exam}/${label}`}>
      <Card className="transition-transform duration-150 cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] active:scale-98">
        <CardHeader className="p-0"></CardHeader>
        <CardContent className="flex items-center gap-4">
          <div className={`p-2 ${bgClass} rounded-lg`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <div>
            <p className={`text-md ${iconColor}`}>{label}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
