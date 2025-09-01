import { TabsContent } from "@/components/ui/tabs";
import { AnalysisFormRequest } from "../../validations/analysis.validation";
import NetChart from "../charts/netChart";
import SubjectChart from "../charts/subjectChart";

const subjectAnalysis = [
  {
    subject: "Türkçe",
    averageNet: 35,
    totalQuestions: 40,
    percentage: (35 / 40) * 100,
  },
  {
    subject: "Matematik",
    averageNet: 25,
    totalQuestions: 40,
    percentage: (25 / 40) * 100,
  },
  {
    subject: "Sosyal Bilimler",
    averageNet: 15,
    totalQuestions: 20,
    percentage: (15 / 20) * 100,
  },
  {
    subject: "Fen Bilimleri",
    averageNet: 12,
    totalQuestions: 20,
    percentage: (12 / 20) * 100,
  },
];

interface GeneralContentProps {
  allExams: AnalysisFormRequest[];
}

export default function GeneralContent({ allExams }: GeneralContentProps) {
  return (
    <TabsContent value="general" className="space-y-2 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NetChart chartData={allExams} />
        <SubjectChart chartData={allExams} />
      </div>
    </TabsContent>
  );
}
