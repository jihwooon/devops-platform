import Home from "./pages/Home.tsx";
import Layout from "./components/layout/Layout.tsx";
import "sanitize.css";

function App() {
  return (
    <>
      <Layout children={<Home/> }/>
    </>
  );
}

export default App;
