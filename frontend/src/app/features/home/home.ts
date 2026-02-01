import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Sidenav } from "./sidenav/sidenav";

@Component({
  selector: "app-home",
  imports: [RouterOutlet, Sidenav],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class Home {}
