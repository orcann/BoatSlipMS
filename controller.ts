// access the data boatslips.json file
import fs from "fs";
import path from "path";
// handle requests and reponses
import { ServerResponse, IncomingMessage } from "http";
import { BoatSlips } from "./boatSlips";

//GET method requests -> fetches and displays data from the boatslips.json file
const getBoatSlips = (req: IncomingMessage, res: ServerResponse) => {
    return fs.readFile(
      path.join(__dirname, "boatSlips.json"),
      "utf8",
      (err, data) => {
        //Read the data json file
        //Error handling
        if (err) {
          //display 500 error message
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: false,
              error: err,
            })
          );
        } else {
          // if call has no error send data
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: true,
              message: JSON.parse(data),
            })
          );
        }
      }
    );
 };

//POST method request -> reads new vessel name from arguement and writes it to boatslips.json data file and sets vacant to false
 const useBoatslip = (req: IncomingMessage, res: ServerResponse) => {
    //read in the data from the request
    var data = "";
    req.on("data", (chunk) => {
      data += chunk.toString();
    });
    req.on("end", () => {
      let newBoatslip: BoatSlips = JSON.parse(data);
      //read the json data file
      fs.readFile(path.join(__dirname, "boatSlips.json"), "utf8", (err, data) => {
        //error handling
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: false,
              error: err,
            })
          );
        } else {
          //boolean value to be used to displayed no vacant boat slips
          let isVacant = true;
          //get the list of boatslips from data file
          let boatSlips: [BoatSlips] = JSON.parse(data);
          //find index that is false
          let index = boatSlips.findIndex((b) => b.vacant == true);
          //if findIndex finds a vacant value
          if (index!= -1) {
            //set the new vessel name to the file and set vacant to false
            boatSlips[index].vesselName = newBoatslip.vesselName;
            boatSlips[index].vacant = false;
          } else {
            isVacant = false;
          }
          
          // write the new boatslip array to the boatSlip.json file
          fs.writeFile(
            path.join(__dirname, "boatSlips.json"),
            JSON.stringify(boatSlips),
            (err) => {
              // Check out any errors
              if (err) {
                // error, send an error message
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({
                    success: false,
                    error: err,
                  })
                );
              }
              else if (!isVacant) {
                //no v
                res.writeHead(409, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({
                    statusCode: 409,
                    message: "There are no available boat slips.",
                  })
                  );
              }
               else {
                // no error, send the data
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({
                    "slipNumber": boatSlips[index].slipNumber,
                  })
                );
              }
            }
          );
        }
      });
    });
 };


//PUT method requests -> takes in param of slipno in url and "vacates" the targeted boatslip
 const vacate = (req: IncomingMessage, res: ServerResponse) => {
  //read in the slipno from the url by splicing the string and parsing the value
  let url = req?.url;
  let slipNo = parseInt(url!.slice(12, 13));
  //console.log(slipNo);
  var data = "";
    req.on("data", (chunk) => {
      data += chunk.toString();
    });

  req.on("end", () => {
    //read the json data file
    fs.readFile(path.join(__dirname, "boatSlips.json"), "utf8", (err, data) => {
      //error handling
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: false,
            error: err,
          })
        );
      } else {
        //boolean value to be used to display message if boat is already vacant
        let isVacant = false;
        //get the list of boatslips from data file
        let boatSlips: [BoatSlips] = JSON.parse(data);
        //find index of the slip if it exists
        let index = boatSlips.findIndex((b) => b.slipNumber === slipNo);
        //if findIndex finds input slipno and checks if that slip no is vacant
        if (index!= -1 && !boatSlips[index].vacant) {
          //set the new vessel name to empty and vacant to true
          boatSlips[index].vesselName = "";
          boatSlips[index].vacant = true;
        }
        else {
          isVacant = true;
        }
        //update the boatslip file
        fs.writeFile(
          path.join(__dirname, "boatSlips.json"),
          JSON.stringify(boatSlips),
          (err) => {
            // Check out any errors
            if (err) {
              // error, send an error message
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  success: false,
                  error: err,
                })
              );
            }
            else if (isVacant) {
              //display message if slipno is already vacant
              res.writeHead(409, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  statusCode: 409,
                  message: "Boat slip " + slipNo + " is currently vacant",
                })
                );
            }
             else {
              // no error
              res.writeHead(204, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  statusCode: 204,
                })
              );
            }
          }
        );
      }
    });
  });
};

 export { getBoatSlips, useBoatslip, vacate };