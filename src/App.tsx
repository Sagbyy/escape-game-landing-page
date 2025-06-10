import MainFooter from "./components/footer/main-footer";
import Navbar from "@/components/navbar";
import Introduction from "./components/introduction";
import { ThemeProvider } from "./components/utils/theme-provider";

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
