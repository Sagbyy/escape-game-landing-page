import MainFooter from "./components/footer/main-footer";
import Navbar from "./components/navbar";
import { ThemeProvider } from "./components/utils/theme-provider";
import { Route, Routes } from "react-router-dom";
import MainContent from "./pages/main-content";
import ContactPage from "./pages/contact-page";
import LoginPage from "./pages/login-page";
import TestPage from "./pages/TestPage";
import EmployeesPage from "./pages/employees-page";
import ProtectedRoute from "./components/utils/protected-route";
import { AuthProvider } from "./context/auth-context";
import CreateSessionPage from "./pages/create-session-page";
import SessionsPage from "./pages/sessions-page";
import BookingsManagementPage from "./pages/bookings-management-page";

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
          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute>
                <BookingsManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createSession"
            element={
              <ProtectedRoute>
                <CreateSessionPage />
              </ProtectedRoute>
            }
          />
          <Route path="/sessions" element={<SessionsPage />} />
        </Routes>
        <MainFooter />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
