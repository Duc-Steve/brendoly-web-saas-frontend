import { BrowserRouter } from "react-router-dom";
import AppRouter from "@/router/AppRouter";

/**
 * Composant racine de l'application
 * Configure le routing avec BrowserRouter
 */
function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;