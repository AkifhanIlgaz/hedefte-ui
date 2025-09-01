import { Icon } from "@mynaui/icons-react";
import { Topic } from "../topic/topic.type";

export type Subject = {
  id: number;
  name: string;
  total: number;
  icon: Icon;
  topics?: Topic[];
};
