import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { EscapeGameSession, TimeSlot } from "@/types/session";
import { toast } from "react-toastify";
import BookingForm from "@/components/booking/booking-form";

export default function SessionsPage() {
  const [sessions, setSessions] = useState<EscapeGameSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] =
    useState<EscapeGameSession | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const fetchSessions = async () => {
    try {
      const response = await fetch("/api/sessions");
      if (!response.ok)
        throw new Error("Erreur lors du chargement des sessions");
      const data = await response.json();
      setSessions(
        data.filter((session: EscapeGameSession) => session.isActive)
      );
    } catch (error) {
      console.error("Error fetching sessions:", error);
      toast.error("Impossible de charger les sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleOpenSession = (session: EscapeGameSession) => {
    setSelectedSession(session);
    setSelectedTimeSlot(null);
    setIsSheetOpen(true);
  };

  const handleBookingSuccess = () => {
    setSelectedTimeSlot(null);
    setIsSheetOpen(false);
    fetchSessions();
  };

  const getAvailableSlots = (session: EscapeGameSession) => {
    return session.timeSlots.filter((slot) => !slot.isBooked);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Aucune session disponible
          </h2>
          <p className="text-gray-600">
            Revenez plus tard pour découvrir nos nouvelles sessions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Nos Sessions d'Escape Game
          </h1>
          <p className="text-xl text-gray-300">
            Choisissez votre aventure parmi nos sessions terrifiantes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sessions.map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="h-full"
            >
              <Card className="h-full bg-gray-800 border-gray-700 overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={session.imageUrl || "/placeholder.jpg"}
                    alt={session.theme}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge variant="secondary">
                      {session.durationMinutes} min
                    </Badge>
                    <Badge variant="destructive">
                      {formatPrice(session.priceEuros)}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-red-500 mb-2">
                    {session.theme}
                  </h2>
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {session.description}
                  </p>
                  <div className="flex items-center gap-4 text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      <span>
                        {session.minParticipants}-{session.maxParticipants}{" "}
                        joueurs
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        {getAvailableSlots(session).length} créneaux disponibles
                      </span>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleOpenSession(session)}
                  >
                    Voir les créneaux
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:w-[540px] bg-gray-900 text-white"
        >
          <SheetHeader>
            <SheetTitle className="text-red-500">
              {selectedSession?.theme}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 p-4">
            {selectedTimeSlot ? (
              <BookingForm
                session={selectedSession!}
                selectedTimeSlot={selectedTimeSlot}
                onSuccess={handleBookingSuccess}
                onCancel={() => setSelectedTimeSlot(null)}
              />
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-4">
                  Créneaux disponibles :
                </h3>
                <div className="space-y-3">
                  {selectedSession &&
                    getAvailableSlots(selectedSession).map((slot) => (
                      <div
                        key={slot.id}
                        className="p-4 bg-gray-800 rounded-lg flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">
                            {new Date(slot.startTime).toLocaleDateString(
                              "fr-FR",
                              {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                              }
                            )}
                          </p>
                          <p className="text-gray-400">
                            {new Date(slot.startTime).toLocaleTimeString(
                              "fr-FR",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                            {" - "}
                            {new Date(slot.endTime).toLocaleTimeString(
                              "fr-FR",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                        <Button onClick={() => setSelectedTimeSlot(slot)}>
                          Réserver
                        </Button>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
