import { Icon } from "@iconify/react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-zinc-950 flex justify-between items-center p-4 text-white h-16">
      <div className="md:flex hidden w-full justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="token:ghost" className="text-2xl text-red-600" />
          <h1 className="text-2xl font-bold">La Maison Horifique</h1>
        </div>

        {/* Menu desktop */}
        <div className="md:flex items-center gap-4">
          <ol className="flex items-center gap-4">
            <li>
              <a href="#sessions">Sessions</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a
                className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
                href="#book-now"
              >
                Réserver Maintenant
              </a>
            </li>
          </ol>
        </div>
      </div>

      {/* Bouton hamburger pour mobile */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Icon
            icon={isMenuOpen ? "mdi:close" : "mdi:menu"}
            className="text-2xl"
          />
        </SheetTrigger>
        <SheetContent side="left" className="bg-zinc-950 !text-white">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Icon icon="token:ghost" className="text-2xl text-red-600" />
              <h1 className="text-2xl font-bold">La Maison Horifique</h1>
            </SheetTitle>
          </SheetHeader>
          <SheetDescription>
            <ol className="flex px-4 flex-col gap-4 text-md text-white">
              <li>
                <a href="#sessions">Sessions</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li className="flex justify-center text-center">
                <a
                  className="bg-red-600 mt-2 px-4 w-full py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
                  href="#book-now"
                >
                  Réserver Maintenant
                </a>
              </li>
            </ol>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
