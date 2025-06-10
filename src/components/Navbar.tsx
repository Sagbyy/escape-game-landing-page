import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-zinc-950 flex justify-between items-center p-4 text-white">
      <div className="flex items-center gap-2">
        <Icon icon="token:ghost" className="text-2xl text-red-600" />
        <h1 className="text-2xl font-bold">La Maison Horifique</h1>
      </div>

      {/* Menu desktop */}
      <div className="hidden md:flex items-center gap-4">
        <ol className="flex items-center gap-4">
          <li>Sessions</li>
          <li>Contact</li>
          <li className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300">
            Book Now
          </li>
        </ol>
      </div>

      {/* Bouton hamburger pour mobile */}
      <button
        className="md:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Icon
          icon={isMenuOpen ? "mdi:close" : "mdi:menu"}
          className="text-2xl"
        />
      </button>
    </div>
  );
}
