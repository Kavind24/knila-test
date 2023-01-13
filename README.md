# knila-test

Prerequisites for TestAPP to run:

API:
 1. Install the required nuget packages by Right click on Project (TestApp.Api) --> Manage Nuget packages
      Required packages:
	1. Microsoft.EntityFrameworkCore.SqlServer
	2. Microsoft.EntityFrameworkCore.Tools
 2. Change the database connection string in "appsettings.Development.json" file with your db server name in place of "YOURSERVERNAME" in below block
	Eg: "ConnectionStrings": {
    		"TestAppDB": "Server=YOURSERVERNAME;Database=TestApp;Integrated Security=True;Encrypt=false;TrustServerCertificate=true"
  	      },
 3. If you not running the application in local, Please replace the content of "appsettings.json" file with content of "appsettings.Development.json" file.

DATABASE:
 1. Create the required Database, Tables and Insert data into tables by executing the scripts given in Setup folder in repos. 
    [Filename: DB-Scripts.sql]
 2. If found any issues in Step 1, I have Aaso added Backup (TestApp.bak) of the database in Setup forlder. Please use it to restore the database. 

WEB:
 1. Try "npm install" command. IF fails please try "npm install --force".
 2. npm start to run the application.

GoogleMAP:
 1. I have integrated Google Map API, So Please use a valid API KEY in REACT_GOOGLE_MAP_API_KEY env.local file.
 2. Steps to take API KEY and enabling Javascript Map API is given in the below url. Please have a look.
    https://developers.google.com/maps/documentation/javascript/get-api-key#console_1

NOTE: Make sure you run both API and Database are built and executed before running WEB application.
