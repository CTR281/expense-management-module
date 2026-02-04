import { inject, Injectable } from "@angular/core";
import { UserHttpService } from "../data-access/user-http.service";
import { User } from "./user.model";
import { map, Observable } from "rxjs";
import { toUser } from "../data-access/user.mapper";
import { UserDto } from "../data-access/user.dto";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly userHttpService = inject(UserHttpService);

  /**
   * Fetch all users from API and map to domain model
   */
  getUsers(): Observable<User[]> {
    return this.userHttpService
      .getUsers()
      .pipe(map((users: UserDto[]) => users.map(toUser)));
  }
}
