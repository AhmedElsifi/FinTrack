import { createContext } from "react";

const initialState = {
  send: { value: 0, currency: "USD" },
  receive: { value: 0, currency: "EUR" },
  favorites: [],
  log: [],
};

export const CurrencyContext = createContext({
  state: initialState,
  dispatch: () => {},
});
