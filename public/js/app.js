console.log("Client side javascript file is loaded!");
const search = document.querySelector(".input__search");
const form = document.querySelector(".search__form");
const img = document.querySelector(".weather__img");
const text = document.querySelector(".answer");
const locationUI = document.querySelector(".location");
const weatherLocation = async function (address) {
  try {
    text.textContent = "loading...";
    img.setAttribute("src", "");
    const res = await fetch(`/weather?address=${address}`);
    const data = await res.json();

    if (data.error) {
      text.textContent = data.error;
      throw new error("invalid location");
    }
    img.setAttribute("src", data.weatherIcons);
    locationUI.textContent = data.location;
    text.textContent = data.forecast;
  } catch (error) {
    console.error(error);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  weatherLocation(search.value);
});
//weatherLocation("!");
