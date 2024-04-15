import Home from "./pages/Home.tsx";
import Layout from "./components/layout/Layout.tsx";
import "sanitize.css";
import { GlobalStyle } from "./style/global.ts";
import { ThemeProvider } from "styled-components";
import { dark } from "./style/theme.ts";

function App() {
  return (
    <ThemeProvider theme={dark}>
      <GlobalStyle themeName={"dark"} />
      <Layout>
        <Home />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
