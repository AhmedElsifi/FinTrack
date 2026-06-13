import { useContext, useEffect, useState } from "react";
import { CurrencyContext } from "../../store/CurrencyContext";

import { getConversionsByCurrency, getCurrencies } from "../../api/FinanceAPI";

function Compare() {
  const { state, dispatch } = useContext(CurrencyContext);
  const [compare, setCompare] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentData = await getConversionsByCurrency(state.send.currency);
      setCompare(currentData);
    };

    fetchData();
  }, [state.send.currency]);

  useEffect(() => {
    const fetchData = async () => {
      const allCurrencies = await getCurrencies();
      setCurrencies(allCurrencies);
    };

    fetchData();
  }, []);

  const getCurrencyName = (isoCode, currencies) => {
    const currency = currencies.find((c) => c.iso_code === isoCode);

    return currency ? currency.name : "Not found";
  };

  function handleSelect(currency, rate) {
    dispatch({
      type: "UPDATE_RECEIVE_CURRENCY",
      payload: {
        currency: currency,
        rate,
      },
    });
  }

  return (
    <div className="p-5 bg-neutral-700 border-neutral-600 border-[1px] rounded-2xl w-full flex flex-col gap-5">
      <div className="flex flex-row justify-between items-center">
        <p className="uppercase text-neutral-200 text-sm">Multi-Currency</p>
        <p className="uppercase text-neutral-50 text-base">
          1 from {state.send.currency}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {compare.map((conversion, index) => {
          const currencyName = getCurrencyName(conversion.quote, currencies);

          return (
            <button
              key={index}
              className="flex flex-row justify-between h-16 w-full rounded-[10px] py-3 px-4 bg-neutral-600 border-neutral-500 border-[1px] hover:border-lime-500 duration-500 cursor-pointer max-sm:h-fit max-sm:gap-1"
              onClick={() => {
                handleSelect(conversion.quote, conversion.rate);
              }}
            >
              <div className="flex flex-col gap-[6px]">
                <p className="text-sm text-left">{conversion.quote}</p>
                <p className="text-xs text-left">{currencyName}</p>
              </div>
              <div className="flex flex-row gap-5 items-center">
                <p className="text-base">{conversion.rate}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Compare;
