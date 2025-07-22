import { http, HttpResponse } from "msw";

const testUser = {
  email: "test@example.com",
  password: "password123",
};

interface LoginRequest {
  email: string;
  password: string;
}

export const handlers = [
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
];
