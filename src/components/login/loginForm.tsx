import { useState } from "react";
import { toast } from "react-toastify";

interface LoginFormState {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Identifiants incorrects");

      const data = await res.json();
      toast.success(`Bienvenue, ${data.user}!`);
    } catch (error) {
      toast.error(`Erreur : ${error}`);
    }
  };

  return (

    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 text-white bg-black border border-red-600 rounded max-w-md mx-auto mt-12"
      >
        <h2 className="text-2xl text-red-500">Connexion Employé</h2>

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 bg-gray-900 border border-red-500 rounded"
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          className="w-full p-2 bg-gray-900 border border-red-500 rounded"
        />

        <button type="submit" className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 w-full">
          Se connecter
        </button>
      </form>
    </>

  );
}
