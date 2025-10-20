import { analysisRoutes } from "@/src/features/analysis/analysis.routes";
import { authRoutes } from "@/src/features/auth/auth.routes";
import { scheduleRoutes } from "@/src/features/schedule/schedule.routes";
import { studyRoutes } from "@/src/features/study/study.routes";
import { profileRoutes } from "../features/profile/profile.routes";

export const routes = {
  auth: authRoutes,
  dashboard: {
    home: "/dashboard",
    study: studyRoutes,
    analysis: analysisRoutes,
    schedule: scheduleRoutes,
    profile: profileRoutes,
  },
};
