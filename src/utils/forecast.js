const request = require("request");

const forecast = (latitude, longitude, callback, unit = "m") => {
  const url = `http://api.weatherstack.com/current?access_key=356c93e856f26d12c80a324c997a540f&query=${latitude},${longitude}&units=${unit}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the weather services.", undefined);
    } else if (response.body.error) {
      callback("Unable to retrieve weather infos. Try again later.", undefined);
    } else {
      callback(undefined, response.body);
    }
  });
};

module.exports = forecast;
