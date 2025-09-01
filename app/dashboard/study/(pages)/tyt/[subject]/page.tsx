"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tytSubjectTopics } from "@/lib/constants/topic";
import { createClient } from "@/src/lib/supabase/client";
import { Header } from "@/src/shared/components/dashboardHeader";
import { FlaskConical } from "lucide-react";
import { use, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import AddResourceModal from "../../../_components/modals/addResourceModal";
import { Resource } from "../../../_schemas/resource";

export default function AddAnalysisPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const [changes, setChanges] = useState<Record<string, boolean>>({});
  const [resources, setResources] = useState<Resource[]>([]);
  const { subject: encodedSubject } = use(params);
  const subject = decodeURIComponent(encodedSubject);

  const selectedTopics =
    tytSubjectTopics[subject as keyof typeof tytSubjectTopics];

  const getResources = useMemo(() => {
    return async () => {
      try {
        // Access token'ı al
        const {
          data: { session },
        } = await createClient().auth.getSession();

        // API'ye POST isteği gönder
        const response = await fetch(
          "http://localhost:8080/api/resources?exam=TYT",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );
        console.log(response);

        const result = await response.json();

        setResources(result.payload);
      } finally {
      }
    };
  }, []);

  useEffect(() => {
    getResources();
  }, [getResources]);

  // Sonner ile kaydet uyarısı
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
    <div className="space-y-8">
      <div className="flex sm:flex-row sm:items-center sm:justify-between">
        <Header
          title={`TYT ${subject}`}
          subtitle={"Konuları ve kaynakları takip et"}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="text-md flex gap-2">
            <FlaskConical className={`w-6 h-6`} />
            Konular
          </CardHeader>
          <CardContent className="flex flex-col items-center h-full justify-end gap-4">
            <div className="grid w-full gap-1">
              <p className={`text-xl font-semibold `}>15 / 75</p>
              <p className={`text-sm `}>Tekrarlari biten konular </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-md flex gap-2">
            <FlaskConical className={`w-6 h-6 `} />
            İlerleme
          </CardHeader>
          <CardContent className="flex items-center h-full   justify-end gap-4">
            <div className="grid w-full gap-1">
              <p className={`text-xl font-semibold`}>%15</p>
              <Progress value={15} max={100} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="  flex items-center justify-between text-md  gap-2">
            <div className="flex items-center justify-center gap-2">
              <FlaskConical className={`w-6 h-6 `} />
              <p className={`text-md `}>Kaynaklarım</p>
            </div>

            <AddResourceModal
              subject={subject}
              addResource={(resource) =>
                setResources((prev) => [...prev, resource])
              }
            />
          </CardHeader>
          <CardContent className="flex items-center max-h-lg justify-end ">
            {resources.length > 0 ? (
              <ul className="list-disc list-inside w-full grid grid-cols-2 gap-1">
                {resources.map((resource) => (
                  <li className="text-md font-semibold" key={resource.name}>
                    {resource.name}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm w-full  text-center">
                Henüz kaynak eklenmedi.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tablo Başlangıcı */}
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
              {selectedTopics?.map((topic: any, idx: number) => (
                <TableRow key={idx} className="text-lg">
                  <TableCell>{topic.name}</TableCell>
                  <TableCell className="text-center">
                    <Checkbox
                      onCheckedChange={(checked) => {
                        if (changes.hasOwnProperty(topic)) {
                          setChanges((prev) => {
                            delete prev[topic];
                            return { ...prev };
                          });
                          return;
                        }

                        setChanges((prev) => ({
                          ...prev,
                          [topic]: checked as boolean,
                        }));
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox
                      onCheckedChange={(checked) => {
                        if (changes.hasOwnProperty(topic)) {
                          setChanges((prev) => {
                            delete prev[topic];
                            return { ...prev };
                          });
                          return;
                        }

                        setChanges((prev) => ({
                          ...prev,
                          [topic]: checked as boolean,
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
      {/* Tablo Sonu */}
      <Toaster />
    </div>
  );
}
