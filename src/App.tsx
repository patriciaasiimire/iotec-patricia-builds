import { AppRouter } from "./navigation/routes";

function App() {
  return <AppRouter />
}

export default App

/*
App's only job now is to render AppRouter, which reads the current path from context and renders the matching page
(LandingPage for /, BlogDetailsPage for /blog), wrapped in PublicLayout (which supplies Header + Footer, so we don't lose them).
*/