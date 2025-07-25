import {
  type CreateEscapeGameSessionDto,
  type CreateTimeSlotDto,
} from "@/types/session";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useAuth } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";

export default function CreateSessionForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [timeSlots, setTimeSlots] = useState<CreateTimeSlotDto[]>([]);
  const [newTimeSlot, setNewTimeSlot] = useState<CreateTimeSlotDto>({
    startTime: "",
    endTime: "",
  });

  const [form, setForm] = useState<
    Omit<CreateEscapeGameSessionDto, "timeSlots" | "createdBy">
  >({
    theme: "",
    durationMinutes: 60,
    priceEuros: 0,
    minParticipants: 2,
    maxParticipants: 6,
    description: "",
    imageUrl: "",
    isActive: true,
  });

  useEffect(() => {
    if (user?.name) {
      setForm((prev) => ({ ...prev, createdBy: user.name }));
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const newValue = [
      "durationMinutes",
      "priceEuros",
      "minParticipants",
      "maxParticipants",
    ].includes(name)
      ? parseInt(value)
      : value;
    setForm({
      ...form,
      [name]: newValue,
    });
  };

  const handleAddTimeSlot = () => {
    if (!newTimeSlot.startTime || !newTimeSlot.endTime) {
      toast.error("Veuillez remplir les horaires de début et de fin");
      return;
    }

    // Vérifier que l'heure de fin est après l'heure de début
    if (new Date(newTimeSlot.endTime) <= new Date(newTimeSlot.startTime)) {
      toast.error("L'heure de fin doit être après l'heure de début");
      return;
    }

    setTimeSlots([...timeSlots, newTimeSlot]);
    setNewTimeSlot({ startTime: "", endTime: "" });
  };

  const handleRemoveTimeSlot = (index: number) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Vous devez être connecté pour créer une session");
      navigate("/login");
      return;
    }

    if (
      !form.theme ||
      !form.durationMinutes ||
      !form.priceEuros ||
      !form.minParticipants
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (timeSlots.length === 0) {
      toast.error("Veuillez ajouter au moins un créneau horaire");
      return;
    }

    try {
      const sessionToCreate: CreateEscapeGameSessionDto = {
        ...form,
        createdBy: user.name,
        timeSlots: timeSlots.map((slot) => ({
          ...slot,
          id: crypto.randomUUID(),
          isBooked: false,
        })),
      };

      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(sessionToCreate),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de la création");
      }

      toast.success("Session créée avec succès !");
      navigate("/sessions"); // Redirection vers la liste des sessions
    } catch (error) {
      console.error("Error creating session:", error);
      toast.error(
        `Erreur: ${error instanceof Error ? error.message : "Erreur inconnue"}`
      );
    }
  };

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Évite le flash du formulaire pendant la redirection
  }

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">
          Créer une nouvelle session d'escape game
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Thème *</label>
            <input
              type="text"
              name="theme"
              value={form.theme}
              onChange={handleChange}
              className="w-full p-2 rounded border"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 rounded border"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Durée (minutes) *
              </label>
              <input
                type="number"
                name="durationMinutes"
                value={form.durationMinutes}
                onChange={handleChange}
                min="30"
                className="w-full p-2 rounded border"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Prix (€) *
              </label>
              <input
                type="number"
                name="priceEuros"
                value={form.priceEuros}
                onChange={handleChange}
                min="0"
                className="w-full p-2 rounded border"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Participants minimum *
              </label>
              <input
                type="number"
                name="minParticipants"
                value={form.minParticipants}
                onChange={handleChange}
                min="1"
                className="w-full p-2 rounded border"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Participants maximum *
              </label>
              <input
                type="number"
                name="maxParticipants"
                value={form.maxParticipants}
                onChange={handleChange}
                min={form.minParticipants}
                className="w-full p-2 rounded border"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full p-2 rounded border"
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Créneaux horaires *</h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Heure de début
                </label>
                <input
                  type="datetime-local"
                  value={newTimeSlot.startTime}
                  onChange={(e) =>
                    setNewTimeSlot({
                      ...newTimeSlot,
                      startTime: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Heure de fin
                </label>
                <input
                  type="datetime-local"
                  value={newTimeSlot.endTime}
                  onChange={(e) =>
                    setNewTimeSlot({ ...newTimeSlot, endTime: e.target.value })
                  }
                  className="w-full p-2 rounded border"
                />
              </div>
            </div>

            <Button
              type="button"
              onClick={handleAddTimeSlot}
              variant="outline"
              className="mb-4"
            >
              Ajouter un créneau
            </Button>

            {timeSlots.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Créneaux ajoutés :</h4>
                {timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <span>
                      {new Date(slot.startTime).toLocaleString()} -{" "}
                      {new Date(slot.endTime).toLocaleString()}
                    </span>
                    <Button
                      type="button"
                      onClick={() => handleRemoveTimeSlot(index)}
                      variant="destructive"
                      size="sm"
                    >
                      Supprimer
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/sessions")}
            className="w-1/2"
          >
            Annuler
          </Button>
          <Button type="submit" className="w-1/2">
            Créer la session
          </Button>
        </div>
      </form>
    </Card>
  );
}
