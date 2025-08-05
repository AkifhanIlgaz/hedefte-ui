import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { formatNumber } from "./utils";

interface SubjectCardProps {
  icon: LucideIcon;
  title: string;
  stats: Stats;
}

interface Stats {
  average: number;
  best: number;
  worst: number;
}

export default function SubjectCard({
  icon: Icon,
  title,
  stats,
}: SubjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
              <Icon className="w-6 h-6 text-amber-700 dark:text-amber-300" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Ayrıntılar
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Ana İstatistikler */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <div className="text-xl font-bold text-green-800 dark:text-green-200">
              {formatNumber(stats.best)}
            </div>
            <div className="text-xs text-green-600 dark:text-green-400">
              En İyi
            </div>
          </div>
          <div className="text-center p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <div className="text-xl font-bold text-blue-600">
              {formatNumber(stats.average)}
            </div>
            <div className="text-xs text-blue-600">Ortalama</div>
          </div>
          <div className="text-center p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
            <div className="text-xl font-bold text-red-600 dark:text-red-400">
              {formatNumber(stats.worst)}
            </div>
            <div className="text-xs text-red-800 dark:text-red-200">
              En Kötü
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
