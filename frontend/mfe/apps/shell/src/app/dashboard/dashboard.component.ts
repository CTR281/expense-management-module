import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Sidenav } from "./sidenav/sidenav";

@Component({
  selector: "mfe-dashboard",
  imports: [RouterOutlet, Sidenav],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
  host: {
    class: "min-h-screen flex bg-gray-100",
  },
})
export class Dashboard {}
