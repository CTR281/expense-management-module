import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Sidenav } from "./sidenav/sidenav";
import { ResolverLoadingService } from "../../core/http/resolver-loading.service";

@Component({
  selector: "app-dashboard",
  imports: [RouterOutlet, Sidenav],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class Dashboard {
  protected readonly loading = inject(ResolverLoadingService).loading;
}
