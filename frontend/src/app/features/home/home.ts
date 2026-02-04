import { Component, inject } from "@angular/core";
import { PageTitleService } from "../../core/page-title.service";

@Component({
  selector: "app-home",
  imports: [],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
  host: {
    class: "min-h-full flex justify-center items-center",
  },
})
export class Home {
  constructor() {
    inject(PageTitleService).setPageTitle("Home");
  }
}
