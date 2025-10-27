import { TabsContent } from "@/components/ui/tabs";
import { AnalysisFormRequest } from "../../validations/analysis.validation";
import NetChart from "../charts/netChart";
import SubjectChart from "../charts/subjectChart";

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
