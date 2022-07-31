@Author: Christopher Lee
@Date: 7/31/22

# BoatSlipMS
API application that models a marina’s boat slip monitoring system for a group of three boat slips.

For this Project I created a rest API service using native typescript and Node.js only, without Express

I decided upon this design to familiarize myself with writing code for typescript backend since I am more familiar with using typescript in front applications such as angular

The designs are pretty straightforward the get request will just return the json array of 3 boat-slip objects the initial file should have all the vessel names empty and vacant set to true

post requests was simple when you make a request you pass in a json arguement with a vesselname and the function will parse that arguement and search for the first index of an available boat-slip where the vacancy is true then it will set that boatslip vessel name to the inputed value and return the slipnumber in the output success message

put requests will parse the url string for the slipnumber parameter and search through the list of boat-slip objects for the matching case and will change the value of that boat-slips vacancy to true and set the vessel name to false
for the url string I hardcoded each of the different options since my original plan of using a regax match case to parse the slip-number for url params was return incorrect values due to time constraints I could not get a quick fix in time. 

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

##testing modules

npm install mocha

npm install chai

npm install chai-http



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


I am having issues with the imports of my tests libraries mainly the chai libraries due to a system bug on my computer so I could not include a working version at this moment



