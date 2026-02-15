import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { GetCategoriesQueryDto } from "./models/get-categories/get-categories-query.dto";
import { GetCategoriesResultDto } from "./models/get-categories/get-categories-result.dto";
import { toHttpParams } from "@mfe/http";

@Injectable()
export class CategoriesHttpService {
  private readonly http = inject(HttpClient);

  getCategories(
    query?: GetCategoriesQueryDto
  ): Observable<GetCategoriesResultDto> {
    const params = toHttpParams(query);
    return this.http.get<GetCategoriesResultDto>(`/categories`, { params });
  }
}
