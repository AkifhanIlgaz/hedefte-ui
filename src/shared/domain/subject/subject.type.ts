import { Topic } from "../topic/topic.type";

export type Subject = {
  id: number;
  name: string;
  total: number;
  topics?: Topic[];
};
