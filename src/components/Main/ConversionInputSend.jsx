import { useContext, useEffect, useState } from "react";
import { getCurrencies, getRate } from "../../api/FinanceAPI";
import { CurrencyContext } from "../../store/CurrencyContext";

function ConversionInputSend() {
  const { state, dispatch } = useContext(CurrencyContext);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allCurrencies = await getCurrencies();
      setCurrencies(allCurrencies);
    };

    fetchData();
  }, []);

  async function handleSelect(e) {
    const currency = e.target.value;

    const rate = await getRate(currency, state.receive.currency);

    dispatch({
      type: "UPDATE_SEND",
      payload: {
        value: state.send.value,
        currency: currency,
        rate,
      },
    });
  }

  async function handleChange(e) {
    const value = Number(e.target.value);

    const rate = await getRate(state.send.currency, state.receive.currency);

    dispatch({
      type: "UPDATE_SEND",
      payload: {
        value,
        currency: state.send.currency,
        rate,
      },
    });
  }

  return (
    <div className="relative w-fit">
      <label
        htmlFor="send"
        className="uppercase absolute text-neutral-100 left-5 top-5"
      >
        send
      </label>
      <input
        type="number"
        name="send"
        className="w-[450px] max-lg:w-full max-sm:w-full h-[118px] rounded-2xl bg-neutral-600 border-neutral-500 border-[1px] pt-14 px-5 text-3xl"
        value={state.send.value}
        onChange={handleChange}
        min={0}
        max={10000000000000000}
      />

      <div className="absolute right-5 bottom-5">
        <div className="relative">
          <select
            name="currency"
            className="w-24 h-10 bg-neutral-500 rounded-lg appearance-none px-2 text-white border-[1px] border-neutral-400 focus:outline-none"
            value={state.send?.currency || "USD"}
            onChange={handleSelect}
          >
            {currencies.map((currency) => {
              return (
                <option
                  value={currency.iso_code}
                  title={currency.name}
                  key={currency.iso_code}
                >
                  {currency.iso_code}
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

export default ConversionInputSend;
