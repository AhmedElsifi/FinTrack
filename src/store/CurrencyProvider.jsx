import { useReducer } from "react";
import { CurrencyContext } from "./CurrencyContext";
import { currencyReducer } from "./currencyReducer";

const initialState = {
  send: { value: 0, currency: "USD" },
  receive: { value: 0, currency: "EUR" },
  favorites: [],
  log: [],
};

export function CurrencyProvider({ children }) {
  const [state, dispatch] = useReducer(currencyReducer, initialState);

  return (
    <CurrencyContext.Provider value={{ state, dispatch }}>
      {children}
    </CurrencyContext.Provider>
  );
}
