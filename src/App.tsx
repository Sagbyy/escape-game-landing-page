import MainFooter from "./components/footer/main-footer";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/utils/theme-provider";
import { Route, Routes } from "react-router";
import MainContent from "./pages/MainContent";
import ContactForm from "./components/contact/contactForm";
import LoginForm from "./components/login/loginForm";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <MainFooter />
    </ThemeProvider>
  );
}

export default App;
