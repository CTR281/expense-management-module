import { Login } from "./login";
import { Routes } from "@angular/router";
import { loginGuard } from "./login-guard";

export default [
  {
    path: "",
    component: Login,
    canActivate: [loginGuard],
  },
] satisfies Routes;
