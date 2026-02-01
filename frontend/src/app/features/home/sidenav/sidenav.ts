import { Component, inject, OnDestroy, OnInit, signal } from "@angular/core";
import { AuthService } from "../../../core/auth/auth.service";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "nav[app-sidenav]", // this allows the browser to recognize the component as a native nav
  imports: [],
  templateUrl: "./sidenav.html",
  styleUrl: "./sidenav.css",
  host: {
    class: "flex flex-col bg-white p-6 shadow-sm transition-all duration-300",
    "[class.w-24]": "isCollapsed()",
    "[class.w-64]": "!isCollapsed()",
  },
})
export class Sidenav implements OnInit, OnDestroy {
  protected readonly authService = inject(AuthService);
  protected readonly isCollapsed = signal<boolean>(false);

  private mediaQuery = window.matchMedia("(max-width: 767px)"); // Tailwind's md breakpoint
  private listener = (e: MediaQueryListEvent) => {
    this.isCollapsed.set(e.matches);
  };

  ngOnInit() {
    this.isCollapsed.set(this.mediaQuery.matches);
    this.mediaQuery.addEventListener("change", this.listener);
  }

  ngOnDestroy() {
    this.mediaQuery.removeEventListener("change", this.listener);
  }

  toggle(): void {
    this.isCollapsed.update((isCollapsed) => !isCollapsed);
  }
}
