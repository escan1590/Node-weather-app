const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

//Define path for express config
const publicPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//Setup view engine to handlebars and views path to templates forlder location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory path to serve
//public contains css, js and static html
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Daniel Paul",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about page",
    name: "Daniel Paul",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must enter a search tem",
    });
  }
  console.log(req.query.search);
  res.send({ products: [] });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    name: "Daniel Paul",
    helpMessage: "I want to eat chocolate",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You have to provide a valid address",
    });
  }
  const address = req.query.address;
  geocode(address, (error, data) => {
    if (error) {
      return res.send({ error });
    }

    const { latitude, longitude, location } = data;

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      const weather = {
        location,
        latitude,
        longitude,
        precip: forecastData.current.precip,
        localTime: new Date(forecastData.location.localtime),
        temperature: forecastData.current.temperature,
        windSpeed: forecastData.current.wind_speed,
        observationTime: forecastData.current.observation_time,
        weatherIcons: forecastData.current.weather_icons,
        isDay: forecastData.current.is_day,
        windDegree: forecastData.current.wind_degree,
        cloudCover: forecastData.current.cloudcover,
      };

      weather.forecast = `${
        weather.cloudcover !== 0
          ? "The time is clear throught the day."
          : "The time is covered."
      } It is currently ${weather.temperature} degress out. There is ${
        weather.precip
      }% chance of rain.`;

      res.send(weather);
    });
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Daniel Paul",
    message: "Help page not found",
  });
});
app.get("/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Daniel Paul",
    message: "Page not found",
  });
});

// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
