import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Notification } from "./core/notification/notification";
import { Loading } from "./core/http/loading";

@Component({
  imports: [RouterModule, Notification, Loading],
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  protected title = "Frontend";
}
