import Home from "./pages/Home.tsx";
import Layout from "./components/layout/Layout.tsx";
import "sanitize.css";
import { GlobalStyle } from "./style/global.ts";
import { ThemeProvider } from "styled-components";
import { getTheme, ThemeName } from "./style/theme.ts";
import ThemeSwitcher from "./components/header/ThemeSwitcher.tsx";
import { useState } from "react";

function App() {
  const [themeName, setThemeName] = useState<ThemeName>("light");

  return (
    <ThemeProvider theme={getTheme(themeName)}>
      <GlobalStyle themeName={themeName} />
      <ThemeSwitcher themeName={themeName} setThemeName={setThemeName} />
      <Layout>
        <Home />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
