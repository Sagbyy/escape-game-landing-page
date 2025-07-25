import { http, HttpResponse } from "msw";
import type {
  Employee,
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from "../types/employee";
import type {
  EscapeGameSession,
  CreateEscapeGameSessionDto,
  UpdateEscapeGameSessionDto,
} from "../types/session";
import type { Booking, CreateBookingDto } from "@/types/booking";

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

let sessions: EscapeGameSession[] = [
  {
    id: "1",
    theme: "Le Mystère de Paris",
    durationMinutes: 60,
    priceEuros: 25,
    minParticipants: 2,
    maxParticipants: 6,
    description: "Explorez les secrets des catacombes parisiennes",
    imageUrl: "/escape-paris.jpg",
    isActive: true,
    createdBy: "John Doe",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z",
    timeSlots: [
      {
        id: "1",
        startTime: "2024-03-20T14:00:00Z",
        endTime: "2024-03-20T15:00:00Z",
        isBooked: false,
      },
      {
        id: "2",
        startTime: "2024-03-20T16:00:00Z",
        endTime: "2024-03-20T17:00:00Z",
        isBooked: true,
      },
    ],
  },
];

const bookings: Booking[] = [];

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

  // Get all sessions
  http.get("/api/sessions", () => {
    return HttpResponse.json(sessions);
  }),

  // Get session by ID
  http.get("/api/sessions/:id", ({ params }) => {
    const session = sessions.find((s) => s.id === params.id);
    if (!session) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(session);
  }),

  // Create session
  http.post("/api/sessions", async ({ request }) => {
    const newSession = (await request.json()) as CreateEscapeGameSessionDto;

    const session: EscapeGameSession = {
      ...newSession,
      id: String(sessions.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeSlots: newSession.timeSlots.map((slot, index) => ({
        ...slot,
        id: `new-${index}`,
        isBooked: false,
      })),
    };

    sessions.push(session);
    return HttpResponse.json(session, { status: 201 });
  }),

  // Update session
  http.put("/api/sessions/:id", async ({ params, request }) => {
    const updates = (await request.json()) as UpdateEscapeGameSessionDto;
    const index = sessions.findIndex((s) => s.id === params.id);

    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    // Preserve existing timeSlots that are booked
    const existingBookedSlots = sessions[index].timeSlots.filter(
      (slot) => slot.isBooked
    );

    // Add new timeSlots
    const newTimeSlots = updates.timeSlots
      ? updates.timeSlots.map((slot, idx) => ({
          ...slot,
          id: `update-${idx}`,
          isBooked: false,
        }))
      : [];

    sessions[index] = {
      ...sessions[index],
      ...updates,
      updatedAt: new Date().toISOString(),
      timeSlots: [...existingBookedSlots, ...newTimeSlots],
    };

    return HttpResponse.json(sessions[index]);
  }),

  // Delete session
  http.delete("/api/sessions/:id", ({ params }) => {
    const index = sessions.findIndex((s) => s.id === params.id);

    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    sessions = sessions.filter((s) => s.id !== params.id);
    return new HttpResponse(null, { status: 204 });
  }),

  // Create booking
  http.post("/api/bookings", async ({ request }) => {
    const newBooking = (await request.json()) as CreateBookingDto;

    // Find the session and time slot
    const session = sessions.find((s) => s.id === newBooking.sessionId);
    if (!session) {
      return new HttpResponse(
        JSON.stringify({ message: "Session non trouvée" }),
        { status: 404 }
      );
    }

    const timeSlot = session.timeSlots.find(
      (slot) => slot.id === newBooking.timeSlotId
    );
    if (!timeSlot) {
      return new HttpResponse(
        JSON.stringify({ message: "Créneau non trouvé" }),
        { status: 404 }
      );
    }

    if (timeSlot.isBooked) {
      return new HttpResponse(
        JSON.stringify({ message: "Ce créneau est déjà réservé" }),
        { status: 400 }
      );
    }

    if (
      newBooking.numberOfParticipants < session.minParticipants ||
      newBooking.numberOfParticipants > session.maxParticipants
    ) {
      return new HttpResponse(
        JSON.stringify({
          message: `Le nombre de participants doit être entre ${session.minParticipants} et ${session.maxParticipants}`,
        }),
        { status: 400 }
      );
    }

    // Create the booking
    const booking: Booking = {
      id: crypto.randomUUID(),
      ...newBooking,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Mark the time slot as booked
    timeSlot.isBooked = true;

    bookings.push(booking);

    return HttpResponse.json(booking, { status: 201 });
  }),

  // Get bookings for a customer
  http.get("/api/bookings", ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return new HttpResponse(JSON.stringify({ message: "Email requis" }), {
        status: 400,
      });
    }

    const customerBookings = bookings.filter(
      (booking) => booking.customerEmail === email
    );

    return HttpResponse.json(customerBookings);
  }),

  // Get all bookings (for employees)
  http.get("/api/bookings/all", async ({ request }) => {
    // Vérifier le token d'authentification (simulation)
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new HttpResponse(JSON.stringify({ message: "Non autorisé" }), {
        status: 401,
      });
    }

    return HttpResponse.json(bookings);
  }),

  // Cancel booking
  http.put("/api/bookings/:id/cancel", async ({ params, request }) => {
    // Vérifier le token d'authentification (simulation)
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new HttpResponse(JSON.stringify({ message: "Non autorisé" }), {
        status: 401,
      });
    }

    const bookingIndex = bookings.findIndex((b) => b.id === params.id);
    if (bookingIndex === -1) {
      return new HttpResponse(
        JSON.stringify({ message: "Réservation non trouvée" }),
        { status: 404 }
      );
    }

    const booking = bookings[bookingIndex];

    // Trouver la session et le créneau
    const session = sessions.find((s) => s.id === booking.sessionId);
    if (!session) {
      return new HttpResponse(
        JSON.stringify({ message: "Session non trouvée" }),
        { status: 404 }
      );
    }

    const timeSlot = session.timeSlots.find(
      (slot) => slot.id === booking.timeSlotId
    );
    if (!timeSlot) {
      return new HttpResponse(
        JSON.stringify({ message: "Créneau non trouvé" }),
        { status: 404 }
      );
    }

    // Mettre à jour le statut de la réservation
    bookings[bookingIndex] = {
      ...booking,
      status: "cancelled",
      updatedAt: new Date().toISOString(),
    };

    // Libérer le créneau
    timeSlot.isBooked = false;

    return HttpResponse.json(bookings[bookingIndex]);
  }),
];
