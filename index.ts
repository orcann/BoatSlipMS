import http from "http";

// import our boatslip controller
import { getBoatSlips, useBoatslip, vacate } from "./controller";

// create http server
const server = http.createServer((req, res) => {

   //GET request
   if (req.method == "GET" && req.url == "/boat-slips") {
     return getBoatSlips(req, res);
   }

   //POST request
   if (req.method == "POST" && req.url == "/boat-slips") {
      return useBoatslip(req, res);
    }

    //PUT requests since typescript/javascript doesnt have built in parameter readers we will just use or for now but switch when we use the express libraries
    if (req.method == "PUT" && (req.url == "/boat-slips/1/vacate" || req.url == "/boat-slips/2/vacate" || req.url == "/boat-slips/3/vacate") ) {
      return vacate(req, res);
    }

});

// set up the server at port 8080
server.listen(8080, () => {
   console.log("Marina Boat Slip Server is running on port 8080 to access, to get started go to http://localhost:8080/boat-slips");
});