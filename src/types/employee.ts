export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "GAME_MASTER" | "RECEPTIONIST";
  phoneNumber?: string;
  hireDate: string;
  isActive: boolean;
};

export type CreateEmployeeDto = Omit<Employee, "id">;
export type UpdateEmployeeDto = Partial<CreateEmployeeDto>;
