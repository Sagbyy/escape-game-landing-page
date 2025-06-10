import About from "./components/about/about";
import MainFooter from "./components/footer/main-footer";
import Introduction from "./components/introduction";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/utils/theme-provider";
import SessionsPreview from "./components/sessions-preview";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <Introduction />
      <MainFooter />
    </ThemeProvider>
  );
}

export default App;
