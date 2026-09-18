import { ErrorBoundary } from "./providers/ErrorBoundary";
import { ThemeProvider } from "./providers/ThemeProvider";
import Router from "./Router";

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
