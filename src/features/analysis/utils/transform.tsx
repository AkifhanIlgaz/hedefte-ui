import {
  AnalysisFormRequest,
  TopicAnalysis,
} from "../validations/analysis.validation";

// Transform sonuçları için type'lar
export interface TransformedNetChart {
  formattedDate: string;
  fullDate: string;
  totalNet: number;
  date: Date;
  name: string;
}

export interface TransformedSubjectChart {
  subject: string;
  successRate: number;
  averageNet: number;
  totalQuestions: number;
  examCount: number;
}

export interface TransformedDetailedAnalysis {
  subject: string;
  stats: {
    averageNet: number;
    totalQuestions: number;
    consistencyScore: number;
  };
  examCount: number;
  netChartData: Array<{
    net: number;
    date: string;
    name: string;
  }>;
  topicMistakes: TopicAnalysis[];
}

export interface TransformedAnalysisData {
  netChart: TransformedNetChart[];
  subjectChart: TransformedSubjectChart[];
  detailedAnalysis: TransformedDetailedAnalysis[];
  generalStats: {
    lastNet: number;
    improvement: number;
    average: number;
    totalExams: number;
  };
  rawData: AnalysisFormRequest[];
}

// Ders bazında soru sayıları
export const subjectQuestionCounts: { [key: string]: number } = {
  Türkçe: 40,
  Matematik: 40,
  Tarih: 5,
  Coğrafya: 5,
  Felsefe: 5,
  "Din Kültürü": 5,
  Fizik: 7,
  Kimya: 7,
  Biyoloji: 6,
};

// Net hesaplama fonksiyonu
export const calculateNet = (correct: number, wrong: number): number => {
  return correct - wrong * 0.25;
};

// Başarı oranı hesaplama fonksiyonu
export const calculateSuccessRate = (
  net: number,
  totalQuestions: number,
): number => {
  return Math.max(0, (net / totalQuestions) * 100);
};

// Ana transform fonksiyonu - tüm verileri tek seferde transform eder
export const transformAnalysisData = (
  data: AnalysisFormRequest[],
): TransformedAnalysisData => {
  if (!data || data.length === 0) {
    return {
      netChart: [],
      subjectChart: [],
      detailedAnalysis: [],
      generalStats: {
        lastNet: 0,
        improvement: 0,
        average: 0,
        totalExams: 0,
      },
      rawData: [],
    };
  }

  // 1. Net Chart Data - tek döngüde hesapla
  const netChart: TransformedNetChart[] = data.map((exam) => ({
    formattedDate: new Date(exam.date).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "short",
    }),
    fullDate: new Date(exam.date).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    totalNet: exam.totalNet,
    date: exam.date,
    name: exam.name,
  }));

  // 2. General Stats - tek döngüde hesapla

  const lastNet = data[data.length - 1]?.totalNet || 0;
  const averageNet =
    data.reduce((sum, exam) => sum + exam.totalNet, 0) / data.length;
  let improvement = 0;
  if (data.length >= 2) {
    const lastTwoExams = data.slice(-2);
    improvement = lastTwoExams[1].totalNet - lastTwoExams[0].totalNet;
  }

  const generalStats = {
    lastNet: Math.round(lastNet * 100) / 100,
    improvement: Math.round(improvement * 100) / 100,
    average: Math.round(averageNet * 100) / 100,
    totalExams: data.length,
  };

  // 3. Subject bazlı analizler - tek döngüde hem subject chart hem detailed analysis
  const subjectNames = Array.from(
    new Set(
      data.flatMap((exam) =>
        exam.lessonAnalysis.map((subject) => subject.lessonName),
      ),
    ),
  );

  const subjectChart: TransformedSubjectChart[] = [];
  const detailedAnalysis: TransformedDetailedAnalysis[] = [];

  subjectNames.forEach((subjectName) => {
    // Bu ders için tüm denemelerden verileri topla
    const subjectData = data
      .map((exam) => {
        const subject = exam.lessonAnalysis.find(
          (s) => s.lessonName === subjectName,
        );
        if (!subject) return null;

        const net = calculateNet(subject.correct, subject.wrong);
        const totalQuestions =
          subjectQuestionCounts[subjectName] || subject.totalNet || 40;
        const successRate = calculateSuccessRate(net, totalQuestions);

        return {
          net,
          successRate,
          totalQuestions,
          correct: subject.correct,
          wrong: subject.wrong,
          empty: subject.empty,
          examDate: exam.date,
          examName: exam.name,
          topicMistakes: subject.topicAnalysis || [],
        };
      })
      .filter((data) => data !== null)
      .sort(
        (a, b) =>
          new Date(a!.examDate).getTime() - new Date(b!.examDate).getTime(),
      );

    if (subjectData.length === 0) return;

    // Ortak hesaplamalar
    const nets = subjectData.map((d) => d!.net);
    const successRates = subjectData.map((d) => d!.successRate);

    const averageNet = nets.reduce((sum, net) => sum + net, 0) / nets.length;
    const averageSuccessRate =
      successRates.reduce((sum, rate) => sum + rate, 0) / successRates.length;
    const totalQuestions = subjectQuestionCounts[subjectName] || 40;

    // Subject Chart verisi
    subjectChart.push({
      subject: subjectName,
      successRate: Math.round(averageSuccessRate * 100) / 100,
      averageNet: Math.round(averageNet * 100) / 100,
      totalQuestions,
      examCount: subjectData.length,
    });

    // Detailed Analysis için ek hesaplamalar
    const mean = averageNet;
    const variance =
      nets.reduce((sum, net) => sum + Math.pow(net - mean, 2), 0) / nets.length;
    const stdDev = Math.sqrt(variance);
    const consistencyScore = Math.max(0, 100 - stdDev * 10);

    // Net chart verisi
    const netChartData = subjectData.map((exam) => ({
      net: Math.round(exam!.net * 100) / 100,
      date: new Date(exam!.examDate).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "short",
      }),
      name: exam!.examName,
    }));

    // Tüm konu hatalarını topla
    const allTopicMistakes = subjectData.flatMap((exam) => exam!.topicMistakes);

    // Detailed Analysis verisi
    detailedAnalysis.push({
      subject: subjectName,
      stats: {
        averageNet: Math.round(averageNet * 100) / 100,
        totalQuestions,
        consistencyScore: Math.round(consistencyScore),
      },
      examCount: subjectData.length,
      netChartData,
      topicMistakes: allTopicMistakes,
    });
  });

  return {
    netChart,
    subjectChart,
    detailedAnalysis,
    generalStats,
    rawData: data,
  };
};
