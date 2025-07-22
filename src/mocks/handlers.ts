import { http, HttpResponse } from "msw";
import type {
  Employee,
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from "../types/employee";

const testUser = {
  email: "test@example.com",
  password: "password123",
};

interface LoginRequest {
  email: string;
  password: string;
}

let employees: Employee[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@escapegame.com",
    role: "ADMIN",
    hireDate: "2023-01-01",
    isActive: true,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@escapegame.com",
    role: "GAME_MASTER",
    phoneNumber: "+33612345678",
    hireDate: "2023-02-15",
    isActive: true,
  },
];

export const handlers = [
  // Login handler
  http.post("/api/login", async ({ request }) => {
    const body = (await request.json()) as LoginRequest;

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!body.email || !body.password) {
      return HttpResponse.json(
        { message: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    if (body.email === testUser.email && body.password === testUser.password) {
      return HttpResponse.json({
        user: "Test User",
        token: "fake-jwt-token-" + Date.now(),
      });
    }

    return HttpResponse.json(
      { message: "Identifiants incorrects" },
      { status: 401 }
    );
  }),

  // Get all employees
  http.get("/api/employees", () => {
    return HttpResponse.json(employees);
  }),

  // Get employee by ID
  http.get("/api/employees/:id", ({ params }) => {
    const employee = employees.find((emp) => emp.id === params.id);
    if (!employee) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(employee);
  }),

  // Create employee
  http.post("/api/employees", async ({ request }) => {
    const newEmployee = (await request.json()) as CreateEmployeeDto;
    const employee: Employee = {
      ...newEmployee,
      id: String(employees.length + 1),
    };
    employees.push(employee);
    return HttpResponse.json(employee, { status: 201 });
  }),

  // Update employee
  http.put("/api/employees/:id", async ({ params, request }) => {
    const updates = (await request.json()) as UpdateEmployeeDto;
    const index = employees.findIndex((emp) => emp.id === params.id);

    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    employees[index] = {
      ...employees[index],
      ...updates,
    };

    return HttpResponse.json(employees[index]);
  }),

  // Delete employee
  http.delete("/api/employees/:id", ({ params }) => {
    const index = employees.findIndex((emp) => emp.id === params.id);

    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    employees = employees.filter((emp) => emp.id !== params.id);
    return new HttpResponse(null, { status: 204 });
  }),
];
