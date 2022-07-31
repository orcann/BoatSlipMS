# BoatSlipMS
API application that models a marina’s boat slip monitoring system for a group of three boat slips.

Steps to run ensure you have a directory created to store the project

Once you are in the project directory run the following commands to ensure you have all the dependencies installed 
##to initialize the project
{

npm install

npm init -y

npm install -D typescript 

##if you dont already have ts installed globably on your computer

npm install -g typescript

npm install @types/node

npm install mocha

npm i -D @types/jest

}

once you have all the dependcies installed or already initialize the project you can start it using 
the "npm start" Command 
the local gateway url will be "http://localhost:8080/boat-slips"

To make POSTS/PUT/GET requests use postman testing services and ensure your environment is set to localhost with the correct url


Current API's Available with this current backend system users can make API requests 

with the following guidelines 

GET requests url "http://localhost:8080/boat-slips" you can view the list array of all current Boat-Slips { SlipNumber, Vacant(true/false), VesselName }

POSTS requests url "http://localhost:8080/boat-slips" method you pass in a json formated arguement such as 
{
    "vesselName": "The Kraken"
}
if the call is sucessful will return a status code 200 and a json message with the next available slipnumber
such as
{
    "slipNumber": 1
}

PUT requests "http://localhost:8080/boat-slips/1/vacate" vacate method you pass in any number between 1-3 in the parameter between "boat-slips/  /vacate"

if the call is succesful will return a 204 success code and no return messages

If the boat slip is NOT currently occupied, The response
should be returned with a 409 status code with a payload in JSON
format:
{
"statusCode": number,
"Message": ”Boat slip ‘{slip-number}’ is currently vacant”,
}




