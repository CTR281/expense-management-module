import { Login } from "./login";
import { Routes } from "@angular/router";
import { loginGuard } from "./login-guard";
import { LoginService } from "./login-service";

export default [
  {
    path: "",
    component: Login,
    providers: [LoginService],
    canActivate: [loginGuard],
  },
] satisfies Routes;
