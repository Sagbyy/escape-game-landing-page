import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error('Tous les champs sont requis.');
      return;
    }

    toast.success('Message envoyé avec succès !');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black text-white p-6 rounded-md shadow-md space-y-4 max-w-md mx-auto border border-red-600">
      <h2 className="text-2xl font-bold text-red-500">Contactez-nous</h2>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nom"
        className="w-full p-2 rounded bg-gray-900 text-white border border-red-500"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 rounded bg-gray-900 text-white border border-red-500"
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Message"
        className="w-full p-2 rounded bg-gray-900 text-white border border-red-500"
        rows={5}
      />
      <button type="submit" className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
        Envoyer
      </button>
    </form>
  );
}

export default ContactForm;
