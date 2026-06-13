import { useContext, useEffect, useState } from "react";
import { getHistoryData } from "../../api/FinanceAPI";
import { CurrencyContext } from "../../store/CurrencyContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const getStartDateFromRange = (range) => {
  const today = new Date();
  switch (range) {
    case "3M":
      return new Date(today.setMonth(today.getMonth() - 3));
    case "6M":
      return new Date(today.setMonth(today.getMonth() - 6));
    case "1Y":
      return new Date(today.setFullYear(today.getFullYear() - 1));
    case "5Y":
      return new Date(today.setFullYear(today.getFullYear() - 5));
    case "10Y":
      return new Date(today.setFullYear(today.getFullYear() - 10));
    case "20Y":
      return new Date(today.setFullYear(today.getFullYear() - 20));
    case "30Y":
      return new Date(today.setFullYear(today.getFullYear() - 30));
    default:
      return new Date(today.setMonth(today.getMonth() - 3));
  }
};

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRange, setSelectedRange] = useState("3M");
  const { state } = useContext(CurrencyContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Calculate start date based on selected range
      const startDateObj = getStartDateFromRange(selectedRange);
      const formattedStartDate = startDateObj.toISOString().split("T")[0];

      const data = await getHistoryData(
        state.send.currency,
        state.receive.currency,
        formattedStartDate,
      );

      setHistory(data);
      setLoading(false);
    };

    fetchData();
  }, [state.send.currency, state.receive.currency, selectedRange]);

  const formattedData = history.map((item) => ({
    ...item,
    date: new Date(item.date)
      .toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .replace(",", ""),
  }));

  const step = Math.ceil(formattedData.length / 5);
  const ticks = formattedData
    .filter((_, i) => (formattedData.length - 1 - i) % step === 0)
    .map((item) => item.date);

  // Updated range buttons configuration
  const ranges = [
    { label: "3M", value: "3M" },
    { label: "6M", value: "6M" },
    { label: "1Y", value: "1Y" },
    { label: "5Y", value: "5Y" },
    { label: "10Y", value: "10Y" },
    { label: "20Y", value: "20Y" },
    { label: "30Y", value: "30Y" },
  ];

  const open = history?.[0]?.rate;
  const last = history?.[history.length - 1]?.rate;

  const change = open && last ? last - open : null;
  const percentage = open && last ? ((last - open) / open) * 100 : null;

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between my-5 items-center max-sm:flex-col max-sm:gap-5 max-lg:flex-col max-lg:gap-5">
        <div className="flex flex-row gap-4 max-sm:grid max-sm:grid-cols-2">
          <div className="bg-neutral-700 border-neutral-600 border-[1px] px-5 py-3 w-36 max-sm:w-40 rounded-2xl h-24 flex flex-col gap-4">
            <p className="text-sm text-neutral-100 uppercase">open</p>
            <p className="text-xl text-neutral-50">
              {open?.toFixed(4) ?? "Loading..."}
            </p>
          </div>

          <div className="bg-neutral-700 border-neutral-600 border-[1px] px-5 py-3 w-36 max-sm:w-40 rounded-2xl h-24 flex flex-col gap-4">
            <p className="text-sm text-neutral-100 uppercase">last</p>
            <p className="text-xl text-neutral-50">
              {last?.toFixed(4) ?? "Loading..."}
            </p>
          </div>

          <div className="bg-neutral-700 border-neutral-600 border-[1px] px-5 py-3 w-40 rounded-2xl h-24 flex flex-col gap-4 whitespace-nowrap font-mono tabular-nums">
            <p className="text-sm text-neutral-100 uppercase">change</p>

            <p
              className={`text-xl ${
                change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {change !== null ? (
                <>
                  {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(4)}
                </>
              ) : (
                "Loading..."
              )}
            </p>
          </div>

          <div className="bg-neutral-700 border-neutral-600 border-[1px] px-5 py-3 w-40 rounded-2xl h-24 flex flex-col gap-4 whitespace-nowrap font-mono tabular-nums">
            <p className="text-sm text-neutral-100 uppercase">% change</p>

            <p
              className={`text-xl ${
                percentage >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {percentage !== null ? (
                <>
                  {percentage >= 0 ? "▲" : "▼"}{" "}
                  {Math.abs(percentage).toFixed(2)}%
                </>
              ) : (
                "Loading..."
              )}
            </p>
          </div>
        </div>
        <div className="h-fit bg-neutral-700 rounded-lg flex flex-row w-fit p-[2px]">
          {ranges.map((range) => (
            <button
              key={range.value}
              onClick={() => setSelectedRange(range.value)}
              className={`px-4 py-3 text-[12px] rounded-lg
              ${
                selectedRange === range.value
                  ? "bg-neutral-500 text-neutral-50"
                  : "bg-neutral-700 text-neutral-200 hover:bg-neutral-600"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        {loading ? (
          <div className="h-[300px] flex items-center justify-center bg-neutral-700 border border-neutral-600 rounded-2xl">
            <span className="text-neutral-400">Loading...</span>
          </div>
        ) : (
          <div className="bg-neutral-700 border-[1px] border-neutral-600 rounded-2xl p-5 w-full flex gap-5 flex-col">
            <p>
              {state.send.currency}/{state.receive.currency}
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={formattedData}>
                <XAxis dataKey="date" ticks={ticks} tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171717",
                    border: "1px solid #404040",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#ffffff" }}
                  itemStyle={{ color: "#cef739" }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#cef739"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
