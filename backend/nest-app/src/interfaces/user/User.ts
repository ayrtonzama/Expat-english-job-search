import { UserRole } from "src/users/schemas/user.schema";

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  companyName?: string;
}