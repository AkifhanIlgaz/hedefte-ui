import { LucideIcon } from "lucide-react";
import { TopicAnalysis } from "../topic/topic.type";

export type Lesson = {
  lessonId: string;
  name: string;
  totalQuestions: number;
  icon: LucideIcon;
  bgClass: string;
  iconColor: string;
};

export type LessonAnalysis = {
  lessonName: string;
  correct: number;
  wrong: number;
  empty: number;
  totalNet: number;
  time: number;
  topicAnalysis: TopicAnalysis[];
};
