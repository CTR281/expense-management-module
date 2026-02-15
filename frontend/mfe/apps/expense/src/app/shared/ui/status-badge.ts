import { Component, input } from "@angular/core";

@Component({
  selector: "mfe-status-badge",
  imports: [],
  templateUrl: "./status-badge.html",
  styleUrl: "./status-badge.css",
})
export class StatusBadge {
  readonly isSubmitted = input.required<boolean>();
}
