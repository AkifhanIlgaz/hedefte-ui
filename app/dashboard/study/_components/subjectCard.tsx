import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface SubjectCardProps {
  icon: LucideIcon;
  label: string;
}

export default function SubjectCard({ icon: Icon, label }: SubjectCardProps) {
  return (
    <Link href={`http://localhost:3000/dashboard/study/tyt/${label}`}>
      <Card className="transition-transform duration-150 cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] active:scale-98">
        <CardHeader className="p-0"></CardHeader>
        <CardContent className="flex items-center gap-4">
          <div className={`p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg`}>
            <Icon className={`w-6 h-6 text-amber-700 dark:text-amber-300`} />
          </div>
          <div>
            <p className={`text-md text-amber-600 dark:text-amber-400`}>
              {label}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
