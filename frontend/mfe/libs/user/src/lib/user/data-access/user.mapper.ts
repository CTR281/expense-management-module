import { UserDto } from "./user.dto";
import { User } from "../domain/user.model";

export const toUser = (user: UserDto): User => ({
  id: user.id,
  fullName: user.name,
});
