import About from "./components/about/about";
import MainFooter from "./components/footer/main-footer";
import Introduction from "./components/introduction";
import Navbar from "./components/Navbar";
import SessionsPreview from "./components/sessions-preview";
import { ThemeProvider } from "./components/utils/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <Introduction />
      <About />
      <SessionsPreview />
      <MainFooter />
    </ThemeProvider>
  );
}

export default App;
