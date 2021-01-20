import { Department } from "./department"

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  salary: number;
  quantity: number;
  role: string;
  department: Department
}
