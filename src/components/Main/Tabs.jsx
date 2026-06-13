import { useState } from "react";
import History from "./History";
import Compare from "./Compare";
import Favorites from "./Favorites";
import Log from "./Log";

const tabs = ["history", "compare", "favorites", "log"];

function Tabs() {
  const [selectedTap, setSelectedTap] = useState("history");

  function handleTapSelect(tab) {
    setSelectedTap(tab);
  }

  return (
    <>
      <menu className="w-full mt-8 flex flex-row gap-2 mb-5 max-sm:gap-0">
        {tabs.map((tab) => {
          return (
            <li
              className={`w-fit ${selectedTap === tab ? " border-lime-500 border-b-[1px]" : ""}`}
            >
              <button
                className="px-4 py-[10.5px] uppercase text-base"
                onClick={() => {
                  handleTapSelect(tab);
                }}
              >
                {tab}
              </button>
            </li>
          );
        })}
      </menu>
      {selectedTap === "history" && <History />}
      {selectedTap === "compare" && <Compare />}
      {selectedTap === "favorites" && <Favorites />}
      {selectedTap === "log" && <Log />}
    </>
  );
}

export default Tabs;
