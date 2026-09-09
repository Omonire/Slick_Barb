import { onRequestPost as __api_bookings_ts_onRequestPost } from "C:\\Users\\THIS PC\\OneDrive\\Desktop\\Projects\\Slick\\functions\\api\\bookings.ts"

export const routes = [
    {
      routePath: "/api/bookings",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_bookings_ts_onRequestPost],
    },
  ]