import { useContext } from "react";
import { CurrencyContext } from "../../store/CurrencyContext";

import filledStar from "../../assets/images/icon-star-filled.svg";

function Favorites() {
  const { state, dispatch } = useContext(CurrencyContext);

  function handleSelect(send, receive) {
    dispatch({
      type: "TOGGLE_FAVORITE",
      payload: {
        send: { currency: send },
        receive: { currency: receive },
      },
    });
  }

  return (
    <div className="p-5 bg-neutral-700 border-neutral-600 border-[1px] rounded-2xl w-full flex flex-col gap-5">
      <div className="flex flex-row justify-between items-center">
        <p className="uppercase text-neutral-50 text-base">Pinned Pairs</p>
        <p className="uppercase text-neutral-200 text-sm">
          {state.favorites.length} favorites
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {state.favorites.map((conversion) => {
          return (
            <div
              key={`${conversion.send.currency}-${conversion.receive.currency}`}
              className="flex flex-row justify-between h-16 w-full rounded-[10px] py-3 px-4 bg-neutral-600 border-neutral-500 border-[1px]"
            >
              <div className="flex flex-row gap-2 items-center">
                <p className="text-sm text-left">{conversion.send.currency}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  fill="none"
                  viewBox="0 0 11 11"
                >
                  <path
                    fill="#9D9D9D"
                    d="M5.11.088c.093-.117.28-.117.398 0l4.898 4.898a.27.27 0 0 1 0 .399l-4.898 4.898c-.117.117-.305.117-.399 0l-.468-.445c-.118-.117-.118-.305 0-.399l3.632-3.656H.281A.27.27 0 0 1 0 5.502v-.656c0-.14.117-.282.281-.282h7.992L4.641.932c-.118-.094-.118-.282 0-.399z"
                  />
                </svg>
                <p className="text-sm text-left">
                  {conversion.receive.currency}
                </p>
              </div>
              <div className="flex flex-row gap-5 items-center">
                <button
                  className="border-lime-500 border-[1px] rounded-lg w-8 h-8 flex justify-center items-center hover:bg-neutral-500 duration-500"
                  onClick={() => {
                    handleSelect(
                      conversion.send.currency,
                      conversion.receive.currency,
                    );
                  }}
                >
                  <img src={filledStar} alt="an image showing a filled star" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Favorites;
