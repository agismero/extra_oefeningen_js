//  -- 1 --

const BASE_URL1 = "http://api.zippopotam.us/";
const root = document.querySelector("#root");

root.insertAdjacentHTML(
  "beforeend",
  `    <form id="oef1" action="">
          <div>
            <label for="postCode">Postcode: </label>
            <input type="text" name="postcode" id="postCode" />
          </div>
          <div>
            <label for="landCode">Landcode: </label>
            <input type="text" name="landcode" id="landCode" />
          </div>
          <div> <input type="submit" value="Geef info"></div>
        </form>
        <div id="result"><div>
        <div id="openSea" ></div>`
);

const form1 = document.querySelector("#oef1");
form1.onsubmit = async (e) => {
  e.preventDefault();

  const landCode = document.querySelector("#landCode").value;
  const postCode = document.querySelector("#postCode").value;
  const results = document.querySelector("#result");

  const URL1 = BASE_URL1 + landCode + "/" + postCode;

  console.log(landCode);
  console.log(postCode);
  console.log(URL1);

  try {
    const response = await axios.get(URL1);
    const basicInfo = response.data;
    const places = response.data.places;
    results.insertAdjacentHTML(
      "beforeend",
      `    
        <h2>Land: ${basicInfo.country}</h2>
        <p>Postcode: ${postCode}</p>
        </div>`
    );
    places.forEach((data) => {
      results.insertAdjacentHTML(
        "beforeend",
        `          <p>Stad: ${data["place name"]}</p>
              <p>Lengtegraad: ${data["longitude"]}</p>
              <p>Breedtegraad: ${data["latitude"]}</p>`
      );
    });
    /*     fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        results.insertAdjacentHTML(
          "beforeend",
          `    
          <h2>Land: ${data.country}</h2>
          <p>Postcode: ${postCode}</p>
          </div>`
        );
        data.places.forEach((data) => {
          results.insertAdjacentHTML(
            "beforeend",
            `          <p>Stad: ${data["place name"]}</p>
                <p>Lengtegraad: ${data["longitude"]}</p>
                <p>Breedtegraad: ${data["latitude"]}</p>`
          );
        });
      }); */
  } catch (errors) {
    console.error(errors);
  }
};

//  -- 2 --

const result = document.querySelector("#result");

result.insertAdjacentHTML(
  "afterend",
  `<div id="weather">
<form id="oef2" action="">
<div>
  <label for="stadNaam">Stadnaam: </label>
  <input type="text" name="stadNaam" id="stadNaam" />
</div>
<div> <input type="submit" value="Geef info"></div>
</form></div>`
);

const BASE_URL2 = "https://weatherdbi.herokuapp.com/data/weather/";
const form2 = document.querySelector("#oef2");

form2.onsubmit = async (e) => {
  e.preventDefault();

  const stadNaam = document.querySelector("#stadNaam").value;

  const URL2 = BASE_URL2 + stadNaam;
  const results = document.querySelector("#weather");

  try {
    const response = await axios.get(URL2);
    const data = response.data;
    const dataCurrent = data.currentConditions;
    const dataDays = data.next_days;
    console.log(data);
    console.log(dataDays);
    results.insertAdjacentHTML(
      "beforeend",
      `
        <h2>${data.region}</h2>
        `
    );
    results.insertAdjacentHTML(
      "beforeend",
      `
              <p>${dataCurrent.dayhour}</p>
              <p>${dataCurrent.temp.c}</p>
              <p>${dataCurrent.precip}</p>
              <p>${dataCurrent.humidity}</p>
              <p>${dataCurrent.wind.km}</p>
              `
    );
    dataDays.forEach((day) => {
      results.insertAdjacentHTML(
        "beforeend",
        `
        <div>
            <p>${day.day}</p>
            <p>${day.comment}</p>
            <p>${day.max_temp.c}</p>
            <p>${day.min_temp.c}</p>
            <img src="${day.iconURL}" alt"icon today's weather /">
        </div>
            `
      );
    });
  } catch (errors) {
    console.error(errors);
  }
};

//  -- 3 --

const openSea = document.querySelector("#openSea");
root.insertAdjacentHTML("beforeend", `<button id="apiCall">Klik 5x</button>`);

const BASE_URL3 = " https://api.opensea.io/api/v1/assets/";
const button = document.querySelector("#apiCall");
let counter = 0;
button.onclick = async function () {
  console.log("click");
  counter++;
  console.log(counter);
  if (counter === 5) {
    console.log(BASE_URL3);
    try {
      const response = await axios.get(BASE_URL3);
      const data = response.data;
      console.log(data);
    } catch (errors) {
      console.error(errors);
      data.assets.forEach((asset) => {
        openSea.insertAdjacentHTML(
          "beforeend",
          `
          <div>
          <img src="${asset.image_url}" />
          </div>
        `
        );
      });
    }
  }
};
