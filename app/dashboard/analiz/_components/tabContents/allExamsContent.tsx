import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import { BookOpen, Trash2 } from "lucide-react";

interface ExamResult {
  id: string;
  date: string;
  examName: string;
  turkce: number;
  tarih: number;
  cografya: number;
  felsefe: number;
  din: number;
  matematik: number;
  fizik: number;
  kimya: number;
  biyoloji: number;
  total: number;
}

const mockData: ExamResult[] = [
  {
    id: "1",
    date: "2024-01-15",
    examName: "1. Deneme",
    turkce: 35.5,
    tarih: 8,
    cografya: 6,
    felsefe: 4,
    din: 3,
    matematik: 25,
    fizik: 6,
    kimya: 5,
    biyoloji: 7,
    total: 100.5,
  },
  {
    id: "2",
    date: "2024-01-22",
    examName: "2. Deneme",
    turkce: 38,
    tarih: 7,
    cografya: 8,
    felsefe: 5,
    din: 4,
    matematik: 22,
    fizik: 5,
    kimya: 6,
    biyoloji: 8,
    total: 103,
  },
  {
    id: "3",
    date: "2024-01-29",
    examName: "3. Deneme",
    turkce: 32,
    tarih: 9,
    cografya: 7,
    felsefe: 3,
    din: 5,
    matematik: 28,
    fizik: 7,
    kimya: 4,
    biyoloji: 6,
    total: 101,
  },
];

export default function AllExamsContent() {
  const handleEdit = (item: ExamResult) => {
    // Edit logic here
  };

  const handleDelete = (id: string) => {
    // Delete logic here
  };

  const formatNumber = (value: number): string => {
    return value % 1 === 0 ? value.toString() : value.toFixed(1);
  };

  return (
    <TabsContent value="all" className="space-y-2">
      <Card>
        <CardContent className="p-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] ">Tarih</TableHead>
                <TableHead className="w-[100px] text-center">
                  Deneme Adı
                </TableHead>
                <TableHead className="w-[100px] text-center">Türkçe</TableHead>
                <TableHead className="w-[100px] text-center">Tarih</TableHead>
                <TableHead className="w-[100px] text-center">
                  Coğrafya
                </TableHead>
                <TableHead className="w-[100px] text-center">Felsefe</TableHead>
                <TableHead className="w-[100px] text-center">Din</TableHead>
                <TableHead className="w-[100px] text-center">
                  Matematik
                </TableHead>
                <TableHead className="w-[100px] text-center">Fizik</TableHead>
                <TableHead className="w-[100px] text-center">Kimya</TableHead>
                <TableHead className="w-[100px] text-center">
                  Biyoloji
                </TableHead>
                <TableHead className="w-[100px] text-center">Toplam</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={13} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <BookOpen className="w-8 h-8 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Henüz deneme sonucu eklenmemiş
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                mockData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50 ">
                    <TableCell className="font-medium">
                      {new Date(item.date).toLocaleDateString("tr-TR")}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {item.examName}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700"
                      >
                        {formatNumber(item.turkce)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700"
                      >
                        {formatNumber(item.tarih)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700"
                      >
                        {formatNumber(item.cografya)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700"
                      >
                        {formatNumber(item.felsefe)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700"
                      >
                        {formatNumber(item.din)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700"
                      >
                        {formatNumber(item.matematik)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700"
                      >
                        {formatNumber(item.fizik)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700"
                      >
                        {formatNumber(item.kimya)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700"
                      >
                        {formatNumber(item.biyoloji)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="default"
                        className="bg-amber-600 text-white font-bold"
                      >
                        {formatNumber(item.total)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() => handleDelete(item.id)}
                        className="h-8 w-8 text-danger hover:text-danger hover:bg-danger/10"
                      >
                        <Trash2 className="w-4 h-4 " />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
