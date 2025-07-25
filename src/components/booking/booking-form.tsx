import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import type { CreateBookingDto } from "@/types/booking";
import type { EscapeGameSession, TimeSlot } from "@/types/session";

interface BookingFormProps {
  session: EscapeGameSession;
  selectedTimeSlot: TimeSlot;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function BookingForm({
  session,
  selectedTimeSlot,
  onSuccess,
  onCancel,
}: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<
    Omit<CreateBookingDto, "sessionId" | "timeSlotId">
  >({
    customerEmail: "",
    numberOfParticipants: session.minParticipants,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.customerEmail) {
      toast.error("Veuillez saisir votre adresse email");
      return;
    }

    if (
      form.numberOfParticipants < session.minParticipants ||
      form.numberOfParticipants > session.maxParticipants
    ) {
      toast.error(
        `Le nombre de participants doit être entre ${session.minParticipants} et ${session.maxParticipants}`
      );
      return;
    }

    try {
      setLoading(true);

      const booking: CreateBookingDto = {
        ...form,
        sessionId: session.id,
        timeSlotId: selectedTimeSlot.id,
      };

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de la réservation");
      }

      toast.success("Réservation effectuée avec succès !");
      onSuccess();
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error(
        `Erreur: ${error instanceof Error ? error.message : "Erreur inconnue"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Détails de la session</h3>
        <div className="bg-gray-800 p-4 rounded-lg space-y-2">
          <p className="text-gray-300">
            <span className="font-medium">Session :</span> {session.theme}
          </p>
          <p className="text-gray-300">
            <span className="font-medium">Date :</span>{" "}
            {new Date(selectedTimeSlot.startTime).toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="text-gray-300">
            <span className="font-medium">Horaire :</span>{" "}
            {new Date(selectedTimeSlot.startTime).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {" - "}
            {new Date(selectedTimeSlot.endTime).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-gray-300">
            <span className="font-medium">Prix :</span>{" "}
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "EUR",
            }).format(session.priceEuros)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={form.customerEmail}
            onChange={(e) =>
              setForm({ ...form, customerEmail: e.target.value })
            }
            placeholder="votre@email.com"
            required
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="participants">Nombre de participants *</Label>
          <div className="flex items-center gap-2">
            <Input
              id="participants"
              type="number"
              value={form.numberOfParticipants}
              onChange={(e) =>
                setForm({
                  ...form,
                  numberOfParticipants:
                    parseInt(e.target.value) || session.minParticipants,
                })
              }
              min={session.minParticipants}
              max={session.maxParticipants}
              required
              className="bg-gray-800 border-gray-700 text-white"
            />
            <span className="text-sm text-gray-400">
              (min: {session.minParticipants}, max: {session.maxParticipants})
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={loading}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-red-600 hover:bg-red-700"
          disabled={loading}
        >
          {loading ? "Réservation en cours..." : "Confirmer la réservation"}
        </Button>
      </div>
    </form>
  );
}
