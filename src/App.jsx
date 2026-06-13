import Header from "./components/Header";
import LiveMarketsBar from "./components/LiveMarketsBar";
import Main from "./components/Main/Main";
import { CurrencyProvider } from "./store/CurrencyProvider";

function App() {
  return (
    <CurrencyProvider>
      <Header />
      <LiveMarketsBar />
      <Main />
    </CurrencyProvider>
  );
}

export default App;
