import { useContext } from "react";
import { CurrencyContext } from "../../store/CurrencyContext";

import trash from "../../assets/images/icon-delete.svg";

function Log() {
  const { state, dispatch } = useContext(CurrencyContext);

  function handleDeleteLog(timestamp) {
    dispatch({
      type: "DELETE_LOG",
      payload: timestamp,
    });
  }

  return (
    <div className="p-5 bg-neutral-700 border-neutral-600 border-[1px] rounded-2xl w-full flex flex-col gap-5">
      <div className="flex flex-row justify-between items-center">
        <p className="uppercase text-neutral-50 text-base">Conversion Log</p>
        <p className="uppercase text-neutral-200 text-sm">
          {state.log.length} logged
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {state.log.map((entry) => {
          const formattedDate = new Date(entry.timestamp)
            .toISOString()
            .split("T")[0];
          return (
            <div
              key={`${entry.send.currency}-${entry.receive.currency}-${entry.send.value}-${entry.receive.value}`}
              className="flex flex-row justify-between h-16 w-full rounded-[10px] py-3 px-4 bg-neutral-600 border-neutral-500 border-[1px] max-sm:gap-2"
            >
              <div className="flex flex-row gap-2 items-center">
                <p>{formattedDate}</p>
                <p className="text-sm text-left">{entry.send.currency}</p>
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
                <p className="text-sm text-left">{entry.receive.currency}</p>
              </div>
              <div className="flex flex-row gap-5 items-center max-sm:gap-1">
                <p>{entry.send.value}</p>
                <p className="text-lime-500">{entry.receive.value}</p>
                <button
                  className="border-neutral-500 border-[1px] rounded-lg w-8 h-8 flex justify-center items-center hover:bg-neutral-500 duration-500"
                  onClick={() => {
                    handleDeleteLog(entry.timestamp);
                  }}
                >
                  <img src={trash} alt="an image showing a filled star" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Log;
