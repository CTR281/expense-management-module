import { inject, Injectable } from "@angular/core";
import { UserHttpService } from "../../data-access/user/user-http.service";
import { User } from "./user.model";
import { map, Observable, throwError } from "rxjs";
import { toUser } from "../../data-access/user/user.mapper";
import { UserDto } from "../../data-access/user/user.dto";

@Injectable({
  providedIn: "root",
})
export class UserRepository {
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
