import { TabsContent } from "@/components/ui/tabs";
import NetChart from "../charts/netChart";
import SubjectChart from "../charts/subjectChart";

const chartData = [
  { date: "January", net: 60 },
  { date: "February", net: 65 },
  { date: "March", net: 62 },
  { date: "May", net: 70 },
  { date: "June", net: 68 },
  { date: "January", net: 60 },
  { date: "February", net: 65 },
  { date: "March", net: 62 },
  { date: "May", net: 70 },
  { date: "June", net: 68 },
];

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

export default function GeneralContent() {
  return (
    <TabsContent value="general" className="space-y-2 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NetChart chartData={chartData} />
        <SubjectChart chartData={subjectAnalysis} />
      </div>
    </TabsContent>
  );
}
