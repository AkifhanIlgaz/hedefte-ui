export const routes = {
  login: "auth/login",
  register: "auth/register",
  forgotPassword: "auth/forgot-password",
  dashboard: {
    home: "/dashboard",
    study: {
      tyt: "/dashboard/study/tyt",
      ayt: "/dashboard/study/ayt",
    },
    analysis: {
      tyt: "/dashboard/analiz/tyt",
      ayt: "/dashboard/analiz/ayt",
    },
    schedule: "/dashboard/schedule",
  },
};
