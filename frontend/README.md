# Happy Hacker Habits Frontend 👩‍💻
Happy Hacker Habits uses a React app as its presentation tier. It calls RESTFul APIs exposed by the backend
to display various features of the application. It uses Redux to manage application state needed by many 
different components. 

## Table of Contents 🗃️
- [Directory Structure](#directory-structure)
- [Running the Project Locally](#running-the-project-locally)
- [Deploying the Project on Render](#deploying-the-project-on-render)


## Directory Structure 📁
``` BASH
.
├── node_modules            # the packages and dependencies that the project requires
├── public                  # static files that should not be processed by webpack
├── src                     # the logic of the application (processed by webpack)
│   ├── components          # reusable prices of the application, or pieces that are displayed on all pages
│   ├── features            # the redux slice, redux action, and fetching api logic for each app feature 
│   ├── icons               # the icon SVGs used by components and pages
│   ├── pages               # the pages that display on the editor component depending on the current route/path
│   ├── styles              # the css files that style the application
│   ├── App.jsx             # manages the application's routes and main layout
│   ├── index.js            # entry point of the application 
│   └── store.js            # holds the redux state and reducers of the application
├── .env                    # manages environment-specific configuration settings
├── .gitignore              # tells git which files (or patterns) it should ignore
├── package-lock.json       # ensures same dependencies are installed consistently across different environments
├── package.json            # manages a project's metadata and dependencies
└── README.md               # project documentation
```


## Running the project locally ⌨️
This section describes the steps to run and develop the project locally. 

### Installing Project Dependencies
To run the frontend locally you need to [install node.js](https://nodejs.org/en/download). 
Once you have node installed, you can install the project dependencies by running

``` BASH
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

``` BASH
npm start
```

## Deploying the Project on Render 🖥️
To deploy Happy Hacker's presentation tier (or a different React app) on Render:
- [Create a Render account](https://dashboard.render.com/register/).
- Fork this repository, or create a GitHub repository with the react app you want to deploy.
- [Create a **static Site** on Render](https://docs.render.com/deploy-create-react-app) 
  and choose the repository/directory you want to deploy.
- For **Build Command** enter **"npm run build"** and for **publish directory** enter **"build"**
- Add a **REACT_APP_BACKEND_API_BASE_URL** environment variable, 
  with a value pointing to your deployed backend's base url. (If you are deploying the backend on Render 
  it will look similar to: https://happy-hacker-habits-application-tier.onrender.com/api/)

