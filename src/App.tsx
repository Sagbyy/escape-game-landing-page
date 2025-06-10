import { ThemeProvider } from "./components/utils/theme-provider";
import Navbar from "./components/navbar";
import Introduction from "./components/introduction";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <Introduction />
    </ThemeProvider>
  );
}

export default App;
