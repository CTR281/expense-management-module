import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PageTitleService {
  private readonly _pageTitle = signal<string>("N/A");
  readonly pageTitle = this._pageTitle.asReadonly();

  setPageTitle(pageTitle: string) {
    this._pageTitle.set(pageTitle);
  }
}
