import { Component, inject } from "@angular/core";
import { ResolverLoadingService } from "./resolver-loading.service";

@Component({
  selector: "app-loading",
  template: `@if(loading()) {
    <div
      class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/30"
    >
      <p class="rounded-md bg-white px-6 py-4 text-gray-800 shadow-xl">
        Loading...
      </p>
    </div>
    }`,
})
export class Loading {
  private readonly resolverLoadingService = inject(ResolverLoadingService);
  readonly loading = this.resolverLoadingService.loading;
}
