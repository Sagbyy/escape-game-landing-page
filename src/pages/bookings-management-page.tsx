import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import type { Booking } from "@/types/booking";
import type { EscapeGameSession } from "@/types/session";

export default function BookingsManagementPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<
    (Booking & { session: EscapeGameSession })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchBookings();
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/bookings/all", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!response.ok)
        throw new Error("Erreur lors du chargement des réservations");

      const bookingsData = await response.json();

      // Récupérer les détails des sessions pour chaque réservation
      const bookingsWithSessions = await Promise.all(
        bookingsData.map(async (booking: Booking) => {
          const sessionResponse = await fetch(
            `/api/sessions/${booking.sessionId}`
          );
          const session = await sessionResponse.json();
          return { ...booking, session };
        })
      );

      setBookings(bookingsWithSessions);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Impossible de charger les réservations");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    try {
      const response = await fetch(
        `/api/bookings/${selectedBooking.id}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Erreur lors de l'annulation");

      toast.success("Réservation annulée avec succès");
      setShowCancelDialog(false);
      setSelectedBooking(null);
      fetchBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Impossible d'annuler la réservation");
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmée";
      case "cancelled":
        return "Annulée";
      case "pending":
        return "En attente";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-red-600 mb-8">
          Gestion des Réservations
        </h1>

        <div className="grid gap-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="p-6 bg-gray-800 text-white">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-red-500">
                    {booking.session.theme}
                  </h2>
                  <div className="space-y-1 text-gray-300">
                    <p>
                      <span className="font-medium">Client :</span>{" "}
                      {booking.customerEmail}
                    </p>
                    <p>
                      <span className="font-medium">Participants :</span>{" "}
                      {booking.numberOfParticipants} personnes
                    </p>
                    <p>
                      <span className="font-medium">Date :</span>{" "}
                      {new Date(
                        booking.session.timeSlots.find(
                          (slot) => slot.id === booking.timeSlotId
                        )?.startTime || ""
                      ).toLocaleDateString("fr-FR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p>
                      <span className="font-medium">Horaire :</span>{" "}
                      {new Date(
                        booking.session.timeSlots.find(
                          (slot) => slot.id === booking.timeSlotId
                        )?.startTime || ""
                      ).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {" - "}
                      {new Date(
                        booking.session.timeSlots.find(
                          (slot) => slot.id === booking.timeSlotId
                        )?.endTime || ""
                      ).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p>
                      <span className="font-medium">Réservé le :</span>{" "}
                      {new Date(booking.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(
                      booking.status
                    )}`}
                  >
                    {formatStatus(booking.status)}
                  </span>

                  {booking.status === "confirmed" && (
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowCancelDialog(true);
                      }}
                    >
                      Annuler la réservation
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {bookings.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              <p className="text-xl">Aucune réservation trouvée</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>Confirmer l'annulation</DialogTitle>
            <DialogDescription className="text-gray-400">
              Êtes-vous sûr de vouloir annuler cette réservation ? Cette action
              est irréversible.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
            >
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleCancelBooking}>
              Confirmer l'annulation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
