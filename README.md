# CSC 317 Course Project

## Purpose

The purpose of this repository is to store all the code for your web application. This also includes the history of all commits made and who made them. Only code submitted on the master branch will be graded.

Please follow the instructions below and fill in the information requested when prompted.

## Student Information

|               | Information   |
|:-------------:|:-------------:|
| Student Name  | Vignesh Guruswami     
| Student ID    | 922379195       
| Student Email | vguruswami@sfsu.edu    



# Build/Run Instructions

## Build Instructions
1. After cloning the repository, create a file called ".env" in the application folder. The env file will store environment variables for accessing a database
DB_HOST = "localhost"
DB_NAME = "csc317db"
DB_USER= "root"
DB_PASSWORD="123"
PORT=3000

2. while in the application folder run the command "npm install." This will stall the dependencies for the express app

3. Finally run "npm run builddb" to set up the database connection

## Run Instructions
1. Move to the application folder and run the command "npm start"
2. This will launch the web app. Type the correct port into the url tab of the search browser "localhost:3000/"
