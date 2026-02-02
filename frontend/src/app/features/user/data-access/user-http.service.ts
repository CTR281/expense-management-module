import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserDto } from "./user.dto";

@Injectable({
  providedIn: "root",
})
export class UserHttpService {
  private readonly httpClient = inject(HttpClient);

  /**
   * Retrieve all users from API
   */
  getUsers(): Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>("/users");
  }
}
