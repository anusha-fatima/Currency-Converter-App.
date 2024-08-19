const Base_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";  //This Api isn't updated so it will not show you updated exchange rate.
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".From select");
const toCurr = document.querySelector(".To select");
const msg = document.querySelector(".msg");

const updatedRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  let finalAmt = amtVal * rate;
  msg.innerHTML = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
};

for (let select of dropdowns) {
  for (currCode in countryList) {
    let AllCountry = document.createElement("option");
    AllCountry.innerText = currCode;
    AllCountry.value = currCode;
    if (select.name === "From" && currCode === "USD") {
      AllCountry.selected = "selected";
    } else if (select.name === "to" && currCode === "PKR") {
      AllCountry.selected = "selected";
    }
    select.append(AllCountry);
  }
  select.addEventListener("change", (evt) => {
    updatedFlag(evt.target);
  });
}

let updatedFlag = (element) => {
  let currCode = element.value;
  let AllCountry = countryList[currCode];
  let newSrc = `https://flagsapi.com/${AllCountry}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updatedRate();
});

window.addEventListener("load", () => {
  updatedRate();
});
