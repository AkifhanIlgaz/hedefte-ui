import { analysisRoutes } from "@/src/features/analysis/routes";
import { authRoutes } from "@/src/features/auth/auth.routes";
import { scheduleRoutes } from "@/src/features/schedule/routes";
import { studyRoutes } from "@/src/features/study/routes";

export const routes = {
  auth: authRoutes,
  dashboard: {
    home: "/dashboard",
    study: studyRoutes,
    analysis: analysisRoutes,
    schedule: scheduleRoutes,
  },
};
