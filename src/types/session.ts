export type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};

export type EscapeGameSession = {
  id: string;
  theme: string;
  durationMinutes: number;
  priceEuros: number;
  minParticipants: number;
  maxParticipants: number;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  timeSlots: TimeSlot[];
};

export type CreateEscapeGameSessionDto = Omit<
  EscapeGameSession,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateEscapeGameSessionDto = Partial<
  Omit<CreateEscapeGameSessionDto, "createdBy">
>;

export type CreateTimeSlotDto = Omit<TimeSlot, "id" | "isBooked">;
export type UpdateTimeSlotDto = Partial<CreateTimeSlotDto>;
