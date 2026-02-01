import { Routes } from "@angular/router";
import { Home } from "./home";

export default [
  {
    path: "",
    component: Home,
    children: [
      {
        path: "",
        loadChildren: () => import("../expenses/expenses.routes"),
      },
    ],
  },
] satisfies Routes;
