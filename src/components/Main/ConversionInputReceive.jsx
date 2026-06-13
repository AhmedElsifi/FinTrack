import { useContext, useEffect, useState } from "react";
import { getCurrenciesBySend, getRate } from "../../api/FinanceAPI";
import { CurrencyContext } from "../../store/CurrencyContext";

function ConversionInputReceive() {
  const { state, dispatch } = useContext(CurrencyContext);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allcurrencies = await getCurrenciesBySend(state.send.currency);

      setCurrencies(allcurrencies);
    };

    fetchData();
  }, [state.send.currency]);

  async function handleSelect(e) {
    const currency = e.target.value;

    const rate = await getRate(state.send.currency, currency);

    dispatch({
      type: "UPDATE_RECEIVE_CURRENCY",
      payload: {
        value: state.send.value,
        currency: currency,
        rate,
      },
    });
  }

  return (
    <div className="relative w-fit">
      <label
        htmlFor="recieve"
        className="uppercase absolute text-neutral-100 left-5 top-5"
      >
        recieve
      </label>
      <input
        type="number"
        name="recieve"
        disabled
        value={state.receive.value}
        className="w-[450px] max-lg:w-full max-sm:w-full h-[118px] rounded-2xl bg-neutral-600 border-neutral-500 border-[1px] pt-14 px-5 text-3xl text-lime-500"
      />

      <div className="absolute right-5 bottom-5">
        <div className="relative">
          <select
            name="currency"
            className="w-24 h-10 bg-neutral-500 rounded-lg appearance-none px-2 text-white border-[1px] border-neutral-400 focus:outline-none"
            value={state.receive?.currency || "EUR"}
            onChange={handleSelect}
          >
            {currencies.map((currency) => {
              return (
                <option value={currency} title={currency} key={currency}>
                  {currency}
                </option>
              );
            })}
          </select>

          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white">
            ▼
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversionInputReceive;
