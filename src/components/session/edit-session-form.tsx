import {
  type CreateTimeSlotDto,
  type EscapeGameSession,
  type TimeSlot,
  type UpdateEscapeGameSessionDto,
} from "@/types/session";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function EditSessionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<EscapeGameSession | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [newTimeSlot, setNewTimeSlot] = useState<CreateTimeSlotDto>({
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/sessions/${id}`);
        if (!response.ok) throw new Error("Session non trouvée");
        const data = await response.json();
        setSession(data);
        setTimeSlots(data.timeSlots || []);
      } catch (error) {
        console.error("Error fetching session:", error);
        toast.error("Erreur lors du chargement de la session");
        navigate("/sessions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [id, navigate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (!session) return;

    const { name, value } = e.target;
    const newValue = [
      "durationMinutes",
      "priceEuros",
      "minParticipants",
      "maxParticipants",
    ].includes(name)
      ? parseInt(value)
      : value;
    setSession({ ...session, [name]: newValue });
  };

  const handleAddTimeSlot = () => {
    if (!newTimeSlot.startTime || !newTimeSlot.endTime) {
      toast.error("Veuillez remplir les horaires de début et de fin");
      return;
    }

    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      ...newTimeSlot,
      isBooked: false,
    };

    setTimeSlots([...timeSlots, newSlot]);
    setNewTimeSlot({ startTime: "", endTime: "" });
  };

  const handleRemoveTimeSlot = (index: number) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    if (
      !session.theme ||
      !session.durationMinutes ||
      !session.priceEuros ||
      !session.minParticipants
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (timeSlots.length === 0) {
      toast.error("Veuillez ajouter au moins un créneau horaire");
      return;
    }

    try {
      const sessionToUpdate: UpdateEscapeGameSessionDto = {
        theme: session.theme,
        durationMinutes: session.durationMinutes,
        priceEuros: session.priceEuros,
        minParticipants: session.minParticipants,
        maxParticipants: session.maxParticipants,
        description: session.description,
        imageUrl: session.imageUrl,
        isActive: session.isActive,
        timeSlots: timeSlots,
      };

      const response = await fetch(`/api/sessions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionToUpdate),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      toast.success("Session mise à jour avec succès !");
      navigate("/sessions");
    } catch (error) {
      toast.error(`Erreur: ${error}`);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="text-center">Chargement...</div>
      </Card>
    );
  }

  if (!session) {
    return (
      <Card className="p-6">
        <div className="text-center">Session non trouvée</div>
      </Card>
    );
  }

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">
          Modifier la session d'escape game
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Thème *</label>
            <input
              type="text"
              name="theme"
              value={session.theme}
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
              value={session.description}
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
                value={session.durationMinutes}
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
                value={session.priceEuros}
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
                value={session.minParticipants}
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
                value={session.maxParticipants}
                onChange={handleChange}
                min={session.minParticipants}
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
              value={session.imageUrl}
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
                <h4 className="text-sm font-medium">Créneaux :</h4>
                {timeSlots.map((slot, index) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div>
                      <span>
                        {new Date(slot.startTime).toLocaleString()} -{" "}
                        {new Date(slot.endTime).toLocaleString()}
                      </span>
                      {slot.isBooked && (
                        <span className="ml-2 text-sm text-red-500">
                          (Réservé)
                        </span>
                      )}
                    </div>
                    {!slot.isBooked && (
                      <Button
                        type="button"
                        onClick={() => handleRemoveTimeSlot(index)}
                        variant="destructive"
                        size="sm"
                      >
                        Supprimer
                      </Button>
                    )}
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
          >
            Annuler
          </Button>
          <Button type="submit">Enregistrer les modifications</Button>
        </div>
      </form>
    </Card>
  );
}
