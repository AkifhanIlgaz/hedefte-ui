"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Topic } from "@/src/shared/domain/topic/topic.type";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Resource } from "../validations/resource.validation";

interface TopicTableProps {
  resources: Resource[];
  topics: Topic[];
}

export default function TopicTable({ resources, topics }: TopicTableProps) {
  const [changes, setChanges] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (Object.keys(changes).length > 0 && toast.getToasts().length === 0) {
      toast.warning("Değişiklikleriniz var. Kaydetmek için tıklayın.", {
        position: "bottom-right",
        action: {
          label: "Kaydet",
          onClick: () => {
            // Burada kaydetme işlemini başlatabilirsin
            console.log("Değişiklikler kaydedildi:", changes);
            toast.success("Değişiklikler kaydedildi!");
          },
        },
        closeButton: true,
        duration: Infinity,
      });
    }
  }, [changes]);

  return (
    <Card>
      <CardContent className="p-5">
        <Table>
          <TableHeader className="font-bold">
            <TableRow>
              <TableHead>İsim</TableHead>
              <TableHead className="text-center">Çalışma</TableHead>
              <TableHead className="text-center">Tekrar</TableHead>
              {resources.map((res) => (
                <TableHead key={res.name} className=" text-center">
                  {res.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="p-4">
            {topics?.map((topic: Topic, idx: number) => (
              <TableRow key={idx} className="text-lg">
                <TableCell>{topic.name}</TableCell>
                <TableCell className="text-center">
                  <Checkbox
                    onCheckedChange={(checked) => {
                      if (changes.hasOwnProperty(topic.name)) {
                        setChanges((prev) => {
                          delete prev[topic.name];
                          return { ...prev };
                        });
                        return;
                      }

                      setChanges((prev) => ({
                        ...prev,
                        [topic.name]: checked as boolean,
                      }));
                    }}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Checkbox
                    onCheckedChange={(checked) => {
                      if (changes.hasOwnProperty(topic.name)) {
                        setChanges((prev) => {
                          delete prev[topic.name];
                          return { ...prev };
                        });
                        return;
                      }

                      setChanges((prev) => ({
                        ...prev,
                        [topic.name]: checked as boolean,
                      }));
                    }}
                  />
                </TableCell>
                {resources.map((res) => (
                  <TableCell key={res.name} className="text-center">
                    <Checkbox
                      onCheckedChange={(checked) => {
                        if (changes.hasOwnProperty(res.name)) {
                          setChanges((prev) => {
                            delete prev[res.name];
                            return { ...prev };
                          });
                          return;
                        }

                        setChanges((prev) => ({
                          ...prev,
                          [res.name]: checked as boolean,
                        }));
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
