import MainFooter from "./components/footer/main-footer";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/utils/theme-provider";
import { Route, Routes } from "react-router-dom";
import MainContent from "./pages/MainContent";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import TestPage from "./pages/TestPage";
import EmployeesPage from "./pages/EmployeesPage";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/testPage" element={<TestPage />} />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <EmployeesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <MainFooter />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
