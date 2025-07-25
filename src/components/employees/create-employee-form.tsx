import { useState } from "react";
import type { CreateEmployeeDto } from "../../types/employee";
import { Button } from "../ui/button";

interface CreateEmployeeFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CreateEmployeeForm({
  onSuccess,
  onCancel,
}: CreateEmployeeFormProps) {
  const [formData, setFormData] = useState<CreateEmployeeDto>({
    firstName: "",
    lastName: "",
    email: "",
    role: "GAME_MASTER",
    phoneNumber: "",
    hireDate: new Date().toISOString().split("T")[0],
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de l'employé");
      }

      onSuccess();
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Ajouter un employé</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Prénom</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Téléphone</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            pattern="^\+?[0-9]{10,}$"
            title="Format: +33612345678 ou 0612345678"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Rôle</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="ADMIN">Administrateur</option>
            <option value="GAME_MASTER">Game Master</option>
            <option value="RECEPTIONIST">Réceptionniste</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Date d'embauche
          </label>
          <input
            type="date"
            name="hireDate"
            value={formData.hireDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="rounded"
          />
          <label className="text-sm font-medium">Actif</label>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">Créer</Button>
        </div>
      </form>
    </div>
  );
}
