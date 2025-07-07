import React, { useState } from "react";
import { toast } from "react-toastify";

interface Session {
  theme: string;
  duree: string;
  prix: number;
  nb_participant: number;
  crenaux_dispo: string;
}

export default function CreateSessionForm() {
  const [form, setForm] = useState<Session>({
    theme: "",
    duree: "",
    prix: 0,
    nb_participant: 0,
    crenaux_dispo: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newValue = (name === "prix" || name === "nb_participant") ? parseFloat(value) : value;
    setForm({
      ...form,
      [name]: newValue
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation simple
    if (!form.theme || !form.duree || !form.prix || !form.nb_participant || !form.crenaux_dispo) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    try {
      // Simuler appel API (mock via MSW)
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!response.ok) throw new Error("Erreur lors de la création");

      toast.success("Votre session a été créée avec succès !");
      setForm({
        theme: "",
        duree: "",
        prix: 0,
        nb_participant: 0,
        crenaux_dispo: ""
      });

    } catch (error) {
      toast.error(`Erreur: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-black text-white p-6 rounded-md border border-red-600 max-w-md mx-auto">
      <h2 className="text-2xl text-red-500">Créer une session</h2>

      <input
        type="text"
        name="theme"
        value={form.theme}
        onChange={handleChange}
        placeholder="Thème"
        className="w-full p-2 rounded bg-gray-900 text-white border border-red-500"
      />

      <input
        type="text"
        name="duree"
        value={form.duree}
        onChange={handleChange}
        placeholder="Durée (ex: 60 min)"
        className="w-full p-2 rounded bg-gray-900 text-white border border-red-500"
      />

      <input
        type="number"
        name="prix"
        value={form.prix}
        onChange={handleChange}
        placeholder="Prix en €"
        className="w-full p-2 rounded bg-gray-900 text-white border border-red-500"
      />

      <input
        type="number"
        name="nb_participant"
        value={form.nb_participant}
        onChange={handleChange}
        placeholder="Nombre de participants"
        className="w-full p-2 rounded bg-gray-900 text-white border border-red-500"
      />

      <input
        type="text"
        name="crenaux_dispo"
        value={form.crenaux_dispo}
        onChange={handleChange}
        placeholder="Créneaux (ex: 14h, 16h)"
        className="w-full p-2 rounded bg-gray-900 text-white border border-red-500"
      />

      <button type="submit" className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
        Créer la session
      </button>
    </form>
  );
}
