import { useEffect, useState } from "react";
import type { Employee } from "../types/employee";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Sheet } from "../components/ui/sheet";
import CreateEmployeeForm from "../components/employees/createEmployeeForm";
import EditEmployeeForm from "../components/employees/editEmployeeForm";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des employés:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) return;

    try {
      await fetch(`/api/employees/${id}`, { method: "DELETE" });
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const getRoleBadgeColor = (role: Employee["role"]) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-500";
      case "GAME_MASTER":
        return "bg-blue-500";
      case "RECEPTIONIST":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Employés</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Ajouter un employé
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((employee) => (
          <Card key={employee.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">
                  {employee.firstName} {employee.lastName}
                </h3>
                <p className="text-sm text-gray-500">{employee.email}</p>
                {employee.phoneNumber && (
                  <p className="text-sm text-gray-500">
                    {employee.phoneNumber}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  Embauché le:{" "}
                  {new Date(employee.hireDate).toLocaleDateString()}
                </p>
              </div>
              <Badge className={getRoleBadgeColor(employee.role)}>
                {employee.role}
              </Badge>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedEmployee(employee);
                  setIsEditModalOpen(true);
                }}
              >
                Modifier
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(employee.id)}
              >
                Supprimer
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Sheet open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <CreateEmployeeForm
          onSuccess={() => {
            setIsCreateModalOpen(false);
            fetchEmployees();
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Sheet>

      <Sheet open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        {selectedEmployee && (
          <EditEmployeeForm
            employee={selectedEmployee}
            onSuccess={() => {
              setIsEditModalOpen(false);
              fetchEmployees();
            }}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Sheet>
    </div>
  );
}
