## Doctor Case Label
This is the case labelling project. This project consists on a page that lets the user read a medical case and choose among a list of medical conditions which condition suits the medical case best and save this choice, called label, on the database. Each case that has been labeled has also the doctor id that labeled it.

A doctor first needs to login before start labelling cases. He/she can logout and login again at any times.

## Backend
To run the project you need docker installed and you need to install the project dependencies located on the package.jsosn file. To do so, run the command above at the root of the api folder

>> npm install

To run the project using docker run the command:
>> docker-compose up --build

or to run it locally:
>> npm start

### To import data into the database

Once you raise the docker containers you need to seed the data base. To do so, run those 3 commands to import the data in the dbData folder into the mongo db.

>> mongoimport --jsonArray --db test --collection conditions --file dbData/conditions.json
>> mongoimport --jsonArray --db test --collection cases --file dbData/cases.json
>> mongoimport --jsonArray --db test --collection auths --file dbData/users.json

### PS.:
This application uses environment variables defined in the docker-compose.yml. In case you do not wish to use docker, remember to set new ones.


### Tests

In order to run the tests for this project run the command:

>> npm run test


### Frontend

To run the frontend project you need to go to the root folder called frontend, install the project dependencies as well with the command:

>> npm install

To run the project run the command:

>> npm start
