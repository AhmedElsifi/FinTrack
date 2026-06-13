import ConversionInputSend from "./ConversionInputSend";
import ConversionInputReceive from "./ConversionInputReceive";
import { useContext, useEffect, useState } from "react";
import { CurrencyContext } from "../../store/CurrencyContext";
import { getRate } from "../../api/FinanceAPI";

import exchange from "../../assets/images/icon-exchange.svg";
import emptyStar from "../../assets/images/icon-star.svg";

function ConversionCard() {
  const { state, dispatch } = useContext(CurrencyContext);
  const [rate, setRate] = useState(null);

  function handleSwap() {
    dispatch({ type: "SWAP" });
  }

  useEffect(() => {
    async function fetchRate() {
      const result = await getRate(state.send.currency, state.receive.currency);
      setRate(result);
    }

    fetchRate();
  }, [state.send.currency, state.receive.currency]);

  function handleFavorite() {
    dispatch({
      type: "TOGGLE_FAVORITE",
      payload: {
        send: state.send,
        receive: state.receive,
      },
    });
  }

  function handleLog() {
    dispatch({
      type: "ADD_LOG",
      payload: {
        send: state.send,
        receive: state.receive,
        rate: rate,
      },
    });
  }

  const favorited = state.favorites.some(
    (item) =>
      item.send.currency === state.send.currency &&
      item.receive.currency === state.receive.currency,
  );
  return (
    <>
      <h1 className="uppercase jetbrains-mono-regular text-xl">
        Check the rate
      </h1>

      <div className="rounded-[20px] bg-neutral-700 h-fit mt-4 px-5 py-5">
        <div className="border-b-[1px] border-neutral-500 border-dashed flex justify-between items-center pb-5 gap-5 max-sm:flex-col">
          <ConversionInputSend />

          <button
            className="w-12 h-12 rounded-lg bg-neutral-600 border-neutral-500 border-[1px] flex justify-center items-center hover:bg-neutral-500 duration-500"
            onClick={handleSwap}
          >
            <img src={exchange} alt="exchange icon" className="w-5 h-5" />
          </button>

          <ConversionInputReceive />
        </div>

        <div className="flex justify-between pt-5 items-center max-sm:flex-col max-sm:gap-4">
          <p>
            1 {state.send.currency} = {rate ?? "..."} {state.receive.currency}
          </p>
          <div className="flex flex-row justify-between gap-3">
            {favorited ? (
              <button
                className="uppercase border-[1px] bg-lime-500 text-neutral-900 border-lime-500 rounded-lg flex flex-row justify-between items-center gap-2 py-2 px-3"
                onClick={handleFavorite}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="#0A0A0A"
                    d="M7.332 2.41c.281-.562 1.078-.538 1.336 0l1.547 3.118 3.422.492c.61.094.843.844.398 1.29l-2.46 2.413.585 3.399c.094.61-.562 1.078-1.101.797l-3.047-1.617-3.07 1.617c-.54.28-1.196-.188-1.102-.797l.586-3.399L1.965 7.31c-.446-.445-.211-1.195.398-1.289l3.446-.492z"
                  />
                </svg>
                Favorited
              </button>
            ) : (
              <button
                className="uppercase border-[1px] border-lime-500 rounded-lg flex flex-row justify-between items-center gap-2 py-2 px-3"
                onClick={handleFavorite}
              >
                <img src={emptyStar} alt="an image showing a star" />
                Favorite
              </button>
            )}
            <button
              className="uppercase border-[1px] border-lime-500 rounded-lg flex flex-row justify-between items-center gap-2 py-2 px-3"
              onClick={handleLog}
            >
              log conversion
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConversionCard;
