import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import type { Session } from "./createSessionForm";

export default function EditSessionForm() {

    const { id } = useParams();
    const [form, setForm] = useState<Session | null>(null)

    useEffect(() => {
        fetch(`/api/session/${id}`)
            .then((res) => res.json())
            .then((data) => setForm(data))
            .catch(() => toast.error("Erreur lors de la mise à jour de la session"));
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!form) return;

        const value =
            e.target.name === "prix" || e.target.name === "nb_participant"
                ? parseFloat(e.target.value)
                : e.target.value;
        setForm({ ...form, [e.target.name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form) return;

        try {

            const res = await fetch(`/api/sessions/${form.id}`, {
                method: 'PUT',
                body: JSON.stringify(form)
            });

            if (!res.ok) throw new Error("Erreur de la mise à jour");
            toast.success("Session mise à jour avec succées!");

        } catch (error) {
            toast.error(`Erreur: ${error}`)
        }
    };

    if (!form) return <p className="text-white">Chargement...</p>;

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4 p-6 text-white bg-black border border-red-600 rounded max-w-md mx-auto">
                <h2 className="text-2xl text-red-500">Modifier la session</h2>

                <input name="theme" value={form.theme} onChange={handleChange} placeholder="Thème" className="w-full p-2 bg-gray-900 border border-red-500" />
                <input name="duree" value={form.duree} onChange={handleChange} placeholder="Durée" className="w-full p-2 bg-gray-900 border border-red-500" />
                <input name="prix" value={form.prix} type="number" onChange={handleChange} placeholder="Prix" className="w-full p-2 bg-gray-900 border border-red-500" />
                <input name="nb_participant" value={form.nb_participant} type="number" onChange={handleChange} placeholder="Participants" className="w-full p-2 bg-gray-900 border border-red-500" />
                <input name="crenaux_dispo" value={form.crenaux_dispo} onChange={handleChange} placeholder="Créneaux" className="w-full p-2 bg-gray-900 border border-red-500" />

                <button type="submit" className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Modifier</button>
            </form>
        </>
    )

}    