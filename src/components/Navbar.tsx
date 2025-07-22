import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-black text-white p-4 border-b border-red-600">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-red-500">
          La Maison Horrifique
        </Link>

        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-red-500">
            Accueil
          </Link>
          <Link to="/sessions" className="hover:text-red-500">
            Sessions
          </Link>
          <Link to="/contact" className="hover:text-red-500">
            Contact
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-red-500">{user.name}</span>
              <button
                onClick={logout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
