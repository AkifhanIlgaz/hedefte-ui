import { TabsContent } from "@/components/ui/tabs";
import { ExamType } from "@/src/shared/domain/types";
import { AddExamRequest } from "../../validations/analysis.validation";
import TotalNetChart from "../charts/totalNetChart";
import LessonNetChart from "../charts/lessonNetChart";

interface GeneralContentProps {
  allExams: AddExamRequest[];
  exam: ExamType;
}

export default function GeneralContent({
  allExams,
  exam,
}: GeneralContentProps) {
  return (
    <TabsContent value="general" className="space-y-2 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TotalNetChart chartData={allExams} />
        <LessonNetChart chartData={allExams} exam={exam} />
      </div>
    </TabsContent>
  );
}
