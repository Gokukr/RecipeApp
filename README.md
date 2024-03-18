# Cook Buddy

Description:
Cook Buddy aims to provide users with a convenient and enjoyable way to
discover, save recipes. It seeks to streamline the cooking experience by offering a
user-friendly platform for accessing a wide range of recipes, from everyday meals
to special occasions.Also helps users to show their talents by allowing them to
share their recipes too to the community.

Installing and running the project:
In client:
before running the app you need to install the npm packages, run "npm i" to install packages for client side.
command to run fromtend: npm start.

In server:
before running the server you need to install the npm packages for server , run "npm i" to install packages for server side.
command to run the backend node server.js

In dbconfig.js file:
const pool = new Pool({
user: "postgres",
host: "host_name",
database: "your_database_name",
password: "your_password",
port: 5432,
});

create .env file and assign value to jwtSecret
jwtSecret=ur_secret_key