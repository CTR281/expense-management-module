import { Component } from "@angular/core";

@Component({
  selector: "app-icon-burger-menu",
  template: `
    <svg
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 18L20 18"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M4 12L20 12"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M4 6L20 6"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  `,
})
export class IconBurgerMenu {}
