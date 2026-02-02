import { Routes } from "@angular/router";
import { Dashboard } from "./dashboard.component";
import { Home } from "../home/home";
import {
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from "@angular/core";
import { PageTitleService } from "../../core/page-title.service";

export default [
  {
    path: "",
    component: Dashboard,
    children: [
      {
        path: "",
        component: Home,
        providers: [
          provideEnvironmentInitializer(() =>
            inject(PageTitleService).setPageTitle("Home")
          ),
        ],
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
