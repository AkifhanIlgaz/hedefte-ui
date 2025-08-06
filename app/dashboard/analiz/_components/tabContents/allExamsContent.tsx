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
import { AnalysisFormRequest } from "../../_schemas/schema";

export default function AllExamsContent({
  allExams,
}: {
  allExams: AnalysisFormRequest[];
}) {
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
              {allExams?.length === 0 ? (
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
                allExams?.map((item, index) => (
                  <TableRow key={index} className="hover:bg-muted/50 ">
                    <TableCell className="font-medium">
                      {new Date(item.date).toLocaleDateString("tr-TR")}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {item.name}
                    </TableCell>
                    {item?.subjects.map((s, i) => {
                      return (
                        <TableCell key={i} className="text-center">
                          <Badge
                            variant="outline"
                            className="bg-yellow-50 text-yellow-700"
                          >
                            {formatNumber(s.correct - s.wrong * 0.25)}
                          </Badge>
                        </TableCell>
                      );
                    })}

                    <TableCell className="text-center">
                      <Badge
                        variant="default"
                        className="bg-amber-600 text-white font-bold"
                      >
                        {item.totalNet}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() => handleDelete(item.name)}
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
