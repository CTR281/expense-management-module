import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "notEmpty",
})
export class NotEmptyPipe implements PipeTransform {
  transform(a: Array<unknown> | undefined): unknown {
    return a && a.length > 0;
  }
}
