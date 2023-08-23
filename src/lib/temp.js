const axios = require("axios");

function TempApi() {
  return axios
    .get("https://eo9aws7qgeqs68l.m.pipedream.net/")
}

module.exports = TempApi;
