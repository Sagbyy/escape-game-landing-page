export type Booking = {
  id: string;
  sessionId: string;
  timeSlotId: string;
  customerEmail: string;
  numberOfParticipants: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  updatedAt: string;
};

export type CreateBookingDto = {
  sessionId: string;
  timeSlotId: string;
  customerEmail: string;
  numberOfParticipants: number;
};
