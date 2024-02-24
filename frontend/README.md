# Happy Hacker Habits Frontend
Happy Hacker Habits uses a React app as its presentation tier. It calls RESTFul APIs exposed by the backend
to display various features of the application. It uses Redux to manage application state needed by many 
different components. 

## Running the project locally
This section describes the steps to run and develop the project locally. 

### Installing Project Dependencies
To run the frontend locally you need to [install node.js](https://nodejs.org/en/download). 
Once you have node installed, you can install the project dependencies by running

```
npm install
```

### Creating Environment Variables  
The presentation tier needs access to certain variables in order to connect to the application tier. 
To create these environment variables, create a `.env` file like the following. Note that all 
environment variables need to start with REACT_APP_ for the react app to use them.
Fill in the Presentation Tier environment variables to reference the server that you would like to test with. 
This file SHOULD NOT be uploaded to github.

```
#.env
# presentation-tier environment variables
REACT_APP_BACKEND_API_BASE_URL="add_server_url_here"
```

### Running the Frontend
After setting up the prerequisites you can start the react app by running the following command:

```
npm start
```