import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth-context";

interface LoginFormState {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { login } = useAuth();
  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!form.email || !form.password) {
      toast.error("Veuillez remplir tous les champs.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Identifiants incorrects");
      }

      toast.success(`Bienvenue, ${data.user}!`);

      login({
        name: data.user,
        token: data.token,
      });

      setForm({ email: "", password: "" });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Erreur : ${error.message}`);
      } else {
        toast.error("Une erreur est survenue");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 text-white bg-black border border-red-600 rounded max-w-md mx-auto mt-12"
    >
      <h2 className="text-2xl text-red-500">Connexion Employé</h2>
      <p className="text-sm text-gray-400">
        Test: email: test@example.com / password: password123
      </p>

      <div className="space-y-2">
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 bg-gray-900 border border-red-500 rounded"
          disabled={isLoading}
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          className="w-full p-2 bg-gray-900 border border-red-500 rounded"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full px-4 py-2 rounded ${
          isLoading
            ? "bg-red-800 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {isLoading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
