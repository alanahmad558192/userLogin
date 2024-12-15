export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  password: string; // Add password field
  repeatPassword?: string; // Add repeat password field
}
