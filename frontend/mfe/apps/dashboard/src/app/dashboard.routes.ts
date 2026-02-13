import { Routes } from "@angular/router";
import { Dashboard } from "./dashboard.component";
import { Home } from "../home/home";

export default [
  {
    path: "",
    component: Dashboard,
    children: [
      {
        path: "",
        component: Home,
      },
      {
        path: "expenses",
        loadChildren: () => import("../expense/expense.routes"),
      },
      {
        path: "**",
        redirectTo: "",
      },
    ],
  },
] satisfies Routes;
