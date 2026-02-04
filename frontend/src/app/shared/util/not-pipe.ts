import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "not",
})
export class NotPipe implements PipeTransform {
  transform(a: unknown, b: unknown): unknown {
    return a !== b;
  }
}
