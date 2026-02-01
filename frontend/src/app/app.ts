import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Notification } from "./core/notification/notification";

@Component({
  imports: [RouterModule, Notification],
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  protected title = "N2F";
}
