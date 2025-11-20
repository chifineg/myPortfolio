// Simple currency converter demo using exchangerate.host
const from = document.getElementById('fromCurr');
const to = document.getElementById('toCurr');
const amount = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');

const API_KEY = "ed0eb48796238f93e5ee33bc";

// Full currency list, including USD and NGN
const currencies = [
  { code: "USD", name: "United States Dollar" },
  { code: "NGN", name: "Nigerian Naira" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "ZAR", name: "South African Rand" },
  { code: "KES", name: "Kenyan Shilling" },
  { code: "GHS", name: "Ghanaian Cedi" },
  { code: "EGP", name: "Egyptian Pound" },
  { code: "MAD", name: "Moroccan Dirham" },
  { code: "TZS", name: "Tanzanian Shilling" },
  { code: "UGX", name: "Ugandan Shilling" }
];

// Populate dropdowns
function loadSymbols() {
  currencies.forEach(c => {
    const opt1 = document.createElement("option");
    const opt2 = document.createElement("option");

    opt1.value = c.code;
    opt1.textContent = `${c.name} (${c.code})`;

    opt2.value = c.code;
    opt2.textContent = `${c.name} (${c.code})`;

    from.appendChild(opt1);
    to.appendChild(opt2);
  });

  from.value = "USD"; // default
  to.value = "NGN";   // default
}

// Convert currency
async function convert() {
  const a = parseFloat(amount.value) || 1;
  const f = from.value;
  const t = to.value;

  result.textContent = "Converting…";

  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${f}`);
    const data = await res.json();

    if (!data || !data.conversion_rates) throw new Error("API error");

    const rate = data.conversion_rates[t];
    const converted = (a * rate).toFixed(4);

    result.textContent = `${a} ${f} = ${converted} ${t} (rate: ${rate.toFixed(6)})`;
  } catch (err) {
    result.textContent = "Error fetching conversion rate.";
  }
}

// Event listener
convertBtn.addEventListener("click", convert);
loadSymbols();
