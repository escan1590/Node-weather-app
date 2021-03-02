const DataGeo = require("./DataGeo");
const request = require("request");
const command = require("./command");

const geocode = (address = command(), callback) => {
  //prettier-ignore
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGFuaWVsMTU5MCIsImEiOiJja2t4dnN5bm8wNG95Mm9tc3R5aThmaHk4In0.yHGV4fSqVFhZXisjK1Lzjg&limit=1`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (!response.body.features) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      if (!response.body.features[0]) {
        callback("Invalid location. Try another one", undefined);
        return;
      }
      callback(
        undefined,
        new DataGeo(
          response.body.features[0].center[1],
          response.body.features[0].center[0],
          response.body.features[0].place_name
        )
      );
    }
  });
};

module.exports = geocode;
