import { useEffect, useState } from "react";
import logo from "../assets/images/logo.svg";

function Header() {
  const [noCurrencies, setNoCurrencies] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const res = await fetch("https://api.frankfurter.dev/v2/currencies");
      const data = await res.json();

      const count = Object.keys(data).length;
      setNoCurrencies(count);
    };

    fetchCount();
  }, []);

  return (
    <nav className="px-[24px] py-[20px] flex justify-between items-center">
      <img src={logo} alt="an image showing our logo" />
      <p className="max-sm:text-[10px]">
        {noCurrencies} CURRENCIES · EOD · ECB DATA
      </p>
    </nav>
  );
}

export default Header;
