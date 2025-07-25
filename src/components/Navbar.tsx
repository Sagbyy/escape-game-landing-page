import { Link } from "react-router-dom";
import { ModeToggle } from "./utils/theme-provider";
import { useAuth } from "../context/auth-context";
import { Button } from "./ui/button";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-background border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/la-maison-horifique-logo.png"
            className="h-8"
            alt="La Maison Horifique Logo"
          />
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
          {user && (
            <span className="mr-4 text-foreground">Bienvenue, {user.name}</span>
          )}
          <ModeToggle />
          {user ? (
            <Button variant="destructive" className="ml-4" onClick={logout}>
              Déconnexion
            </Button>
          ) : (
            <Link to="/login" className="ml-4">
              <Button>Connexion</Button>
            </Link>
          )}
        </div>
        <div className="items-center justify-between w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-foreground rounded hover:bg-accent md:hover:bg-transparent md:hover:text-accent md:p-0"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-foreground rounded hover:bg-accent md:hover:bg-transparent md:hover:text-accent md:p-0"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/sessions"
                className="block py-2 px-3 text-foreground rounded hover:bg-accent md:hover:bg-transparent md:hover:text-accent md:p-0"
              >
                Sessions
              </Link>
            </li>
            <li>
              <Link
                to="/admin/bookings"
                className="block py-2 px-3 text-foreground rounded hover:bg-accent md:hover:bg-transparent md:hover:text-accent md:p-0"
              >
                Réservations
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link
                    to="/employees"
                    className="block py-2 px-3 text-foreground rounded hover:bg-accent md:hover:bg-transparent md:hover:text-accent md:p-0"
                  >
                    Employés
                  </Link>
                </li>
                <li>
                  <Link
                    to="/createSession"
                    className="block py-2 px-3 text-foreground rounded hover:bg-accent md:hover:bg-transparent md:hover:text-accent md:p-0"
                  >
                    Créer une session
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
