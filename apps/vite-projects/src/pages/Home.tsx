import Header from "../components/common/Header.tsx";
import { formatNumber } from "../utils/format.ts";

const COUNT = 10000;

const Home = () => {
  return (
    <>
      <Header />
      <div>devops-platform</div>
      <div>count: {formatNumber(COUNT)}</div>
    </>
  );
};

export default Home;
