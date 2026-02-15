import { Component, inject } from "@angular/core";
import { PageTitleService } from '@mfe/page-title';

@Component({
  selector: "mfe-home",
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
