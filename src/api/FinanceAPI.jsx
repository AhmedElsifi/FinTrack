export async function getConversionsByDateAndCountry(date, country) {
  const res = await fetch(
    `https://api.frankfurter.dev/v2/rates?date=${date}&base=${country}`,
  );
  const data = await res.json();
  return data;
}

export async function getConversionsByCurrency(currency) {
  const res = await fetch(
    `https://api.frankfurter.dev/v2/rates?base=${currency}`,
  );
  const data = await res.json();
  return data;
}

export async function getCurrencies() {
  const res = await fetch(`https://api.frankfurter.dev/v2/currencies`);
  const data = await res.json();
  return data;
}

export async function getCurrenciesBySend(base) {
  const res = await fetch(`https://api.frankfurter.dev/v2/rates?base=${base}`);
  const data = await res.json();
  const quoteList = data.map((item) => item.quote);
  return quoteList;
}

export async function getRate(base, quote) {
  const res = await fetch(
    `https://api.frankfurter.dev/v2/rates?base=${base}&quotes=${quote}`,
  );
  const data = await res.json();
  return data[0].rate;
}

export async function getHistoryData(base, quote, date) {
  const res = await fetch(
    `https://api.frankfurter.dev/v2/rates?from=${date}&base=${base}&quotes=${quote}&group=month`,
  );

  const data = await res.json();

  return data.map((item) => ({
    date: item.date,
    rate: item.rate,
  }));
}
