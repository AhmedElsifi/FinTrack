import { useContext, useEffect, useRef, useState } from "react";
import { getConversionsByDateAndCountry } from "../api/FinanceAPI";
import { formatDate } from "../utils/date";
import { CurrencyContext } from "../store/CurrencyContext";

function LiveMarketsBar() {
  // to access the CurrencyContext which holds the currency value
  const { state } = useContext(CurrencyContext);

  // market data are fetched here and stored until the user changes the send currency
  const [marketData, setMarketData] = useState({
    currentData: [],
    aWeekAgoData: [],
  });

  // used in the scrolling effect block to access the list of market data
  const listRef = useRef(null);

  // fetching the current market Data for the selected currency
  useEffect(() => {
    const fetchData = async () => {
      const today = formatDate(new Date());

      const oneWeekAgoDate = new Date();
      oneWeekAgoDate.setDate(oneWeekAgoDate.getDate() - 7);

      const oneWeekAgo = formatDate(oneWeekAgoDate);

      const currentData = await getConversionsByDateAndCountry(
        today,
        state.send.currency,
      );
      const aWeekAgoData = await getConversionsByDateAndCountry(
        oneWeekAgo,
        state.send.currency,
      );

      setMarketData({
        currentData,
        aWeekAgoData,
      });
    };

    fetchData();
  }, [state.send.currency]);

  // the auto scroll effect (made with javascript)
  useEffect(() => {
    const element = listRef.current;
    if (!element) return;
    let direction = 1;
    let animationFrame;
    const animate = () => {
      element.scrollLeft += direction * 0.5;

      if (element.scrollLeft + element.clientWidth >= element.scrollWidth) {
        direction = -1;
      }

      if (element.scrollLeft <= 0) {
        direction = 1;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <header className="h-10 bg-neutral-500 w-full uppercase flex">
      <p className="px-4 py-3 jetbrains-mono-medium text-xs bg-lime-500 w-fit text-neutral-900 whitespace-nowrap">
        Live Markets
      </p>
      <ul ref={listRef} className="flex gap-[1px] w-full overflow-hidden">
        {marketData.currentData.map((conversion) => {
          const aWeekAgoConversion = marketData.aWeekAgoData.find(
            (oldConversion) => oldConversion.quote === conversion.quote,
          );

          const oldRate = aWeekAgoConversion?.rate;
          const percentage = (
            ((conversion.rate - oldRate) / oldRate) *
            100
          ).toFixed(4);
          return (
            <li
              className="px-4 py-3 jetbrains-mono-medium text-xs bg-neutral-700 w-fit flex flex-row gap-[10px] text-neutral-200 whitespace-nowrap"
              key={conversion.quote}
            >
              {conversion.base}/{conversion.quote}{" "}
              <span className="text-neutral-50">{conversion.rate}</span>
              {percentage >= 0 ? (
                <span className="text-green-500">▲ +{percentage}%</span>
              ) : (
                <span className="text-red-500">▼ -{percentage}%</span>
              )}
            </li>
          );
        })}
      </ul>
    </header>
  );
}

export default LiveMarketsBar;
