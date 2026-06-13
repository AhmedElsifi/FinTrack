import ConversionCard from "./ConversionCard";
import Tabs from "./Tabs";

function Main() {
  return (
    <div className="w-fit max-lg:w-full max-sm:w-full m-auto py-12 px-8 max-sm:px-2 max-sm:py-4 text-neutral-50">
      <ConversionCard />
      <Tabs />
    </div>
  );
}

export default Main;
