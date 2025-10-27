import { Icon } from "@mynaui/icons-react";
import { Topic } from "../topic/topic.type";
import { LucideIcon } from "lucide-react";

export type Subject = {
  id: number;
  name: string;
  total: number;
  icon: Icon;
  topics?: Topic[];
};
