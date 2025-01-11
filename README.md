# indigo-api-express

Backend Express.js app with TypeScript and JWT authentication, hosting a Swagger UI.

## Installation
Run in a terminal at the root directory:
```
npm install
```

## Scripts
Running the project will host the server at `http://localhost:3000`.

To run the server in development mode with nodemon (auto refresh when there are changes):
```
npm run dev
```

To run the server normally without refreshing:
```
npm run start
```

To build the project using the `/dist` folder as output:
```
npm run build
```

## Data
The data accessed by the server must be provided by a file named `measurements.txt` located in a directory called `/data` at the root of the project.

The `measurements.txt` file should be formatted so that each line contains `{city};{temperature}` where `{city}` is a string and `{temperature}` is a number.

When the server has started, or when the `measurements.txt` file has been changed, the server will begin loading the cache and calculating the required values from the content of the file.

While this is happening, the console will display `Loading cache...`. During this time the results of the API endpoints will be empty or come from the previous cache. Once the console displays `Cache loaded` the results will be updated.

The cache gets saved to `/data/measurements_cache.json` and is loaded when the server restarts while the actual data is updated asynchronously.

## API Endpoints

[http://localhost:3000/api-docs/](http://localhost:3000/api-docs) hosts the swagger UI.

[http://localhost:3000/api/login/](http://localhost:3000/api/login/) returns a JWT token to access the API . 

[http://localhost:3000/api/temperatures/](http://localhost:3000/api/temperatures/) returns a JSON array of every city containing name, min, max and average temperatures.

[http://localhost:3000/api/temperatures/{city}](http://localhost:3000/api/temperatures/New%20Delhi/) returns JSON object containing name, min, max and average temperatures for the specified city (in this example "New Delhi").

[http://localhost:3000/api/temperatures/larger/{temp}](http://localhost:3000/api/temperatures/larger/0) returns a JSON array of every city with an average temperature larger than or equal to the specified value.

[http://localhost:3000/api/temperatures/smaller/{temp}](http://localhost:3000/api/temperatures/smaller/0) returns a JSON array of every city with an average temperature smaller than or equal to the specified value.

## Authentication

To authorize API requests, first send a `POST` request to `http://localhost:3000/api/login/` that contains a body with the format `{ username: 'USERNAME', password: 'PASSWORD' }` (the password is hard-coded `PASSWORD`).

This will return a JWT token which needs to be sent in the Authorization Header of each new request in the format `Bearer {JWT}`.

To use this in the Swagger UI, open the `Authorize` popup in the top right and copy the token into `Value` and click `Authorize`. This will authorize all requests until the token expires (default is 1h).