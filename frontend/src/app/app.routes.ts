import { Route } from "@angular/router";
import { authGuard } from "./core/auth/auth-guard";

export const appRoutes: Route[] = [
  {
    path: "login",
    loadChildren: () => import("./features/login/login.routes"),
  },
  {
    path: "",
    loadChildren: () => import("./features/dashboard/dashboard.routes"),
    canMatch: [authGuard],
  },
  {
    path: "**",
    redirectTo: "login",
  },
];
