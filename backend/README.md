# Happy Hacker Habits Backend
Happy Hacker Habits uses an express node.js server as its application tier and a 
PostgreSQL database managed using Prisma ORM as its data tier. It exposes RESTFul endpoints
for the various features of the application.   


## Table of Contents
- [Directory Structure](#directory-structure)
- [Running the Project Locally](#running-the-project-locally)
- [Deploying the Project on Render](#deploying-the-project-on-render)


## Directory Structure
``` BASH
.
├── api                     # the routes, handlers, and application logic for each feature
├── middleware              # middleware required by multiple features, like authenticating users
├── models                  # prisma files for defining database models and recording past migrations
├── node_modules            # the packages and dependencies that the project requires
├── .env                    # manages environment-specific configuration settings
├── .gitignore              # tells git which files (or patterns) it should ignore
├── package-lock.json       # ensures same dependencies are installed consistently across different environments
├── package.json            # manages a project's metadata and dependencies
├── README.md               # project documentation 
├── router.js               # manages the API routes into each feature 
└── server.js               # creates server instance applies middleware required by entire app
```


## Running the project locally
This section describes the steps to run and develop the project locally. 

### Installing Project Dependencies
To run the backend locally you need to [install node.js](https://nodejs.org/en/download). 
Once you have node installed, you can install the project dependencies by running

``` BASH
npm install
```

### Creating a Database
Happy Hacker Habits uses [Prisma ORM](https://www.prisma.io/docs) to manage it's data tier. 
It is currently configured to run using PostgreSQL, but could be modified to work with other SQL databases. 

To run the backend locally you need to create a PostgreSQL database to connect the backend too.
There are many options for creating a PostgreSQL database:
- [install PostgreSQL locally](https://www.postgresql.org/download/) 
  and [create a database](https://www.postgresql.org/docs/current/manage-ag-createdb.html) 
  on you local machine.
- use a database cloud service like [Render PostgreSQL](https://docs.render.com/databases) 
  or [AWS RDS](https://aws.amazon.com/rds/).


### Creating Environment Variables  
The application tier needs access to certain secret variables in order to connect to the database. 
It also needs variables regarding token creation for user authentication. This is done via the use of environment variables.
To create these environment variables, create a `.env` file like the following. Fill in the Data-tier variables
using the database you created. Set the PORT and JWT_SECRET to whatever values you would like. 
This file SHOULD NOT be uploaded to github as it contains secretes you don't want others to have access to.

```
#.env
# data-tier environment variables
DATABASE_URL="add_databaseURL_here"
DATABASE_PORT=add_db_port_here
DATABASE_USER="add_db_user_here"
DATABASE_PASSWORD="add_password_here"

# application-tier environment variables
PORT=set_port_here
JWT_SECRET="set_secrete_here"
```

### Migrating Database via Prisma
In order to configure the database you created to use the application schema, you need to 
[use prisma to migrate the database](https://www.prisma.io/docs/orm/prisma-migrate/getting-started). 
The following command migrates and synchronizes the prisma client with 
your development database. 

``` BASH
npx prisma migrate dev --name enter_a_migration_name_here
```

### Running the Server  
After setting up the prerequisites you can start the server by running the following command:

``` BASH
npm start
```

## Deploying the Project on Render
To deploy Happy Hacker's data tier (or a different PostgreSQL Database) on Render:
- [Create a Render account](https://dashboard.render.com/register/).
- [Create a **PostgreSQL Database** on Render](https://docs.render.com/databases) 
- Define the name, region, and version of PostgreSQL you would like to use, then click **Create Database**
- Use the password, and URL information under **"Connections"** in the "Info" menu to connect to the database 
- Use [Prisma migrate](https://www.prisma.io/docs/orm/prisma-migrate/getting-started) to synchronize the database with your application schema 

To deploy Happy Hacker's application tier (or a different express server) on Render:
- [Create a Render account](https://dashboard.render.com/register/).
- Fork this repository, or create a GitHub repository with the express server you want to deploy.
- [Create a **Web Service** on Render](https://docs.render.com/deploy-node-express-app) 
  and choose the repository/directory you want to deploy.
- For **Build Command** enter **"yarn"** and for **Start Command** enter **"node server.js"**
- Add **DATABASE_PASSWORD**, **DATABASE_PORT**, **DATABASE_URL**, and **DATABASE_USER** environment variables, 
  with values that point to your deployed PostgreSQL database
- Add a **JWT_SECRET** environment variable, set to some secret for the application to 
  use to authenticate users. (can be anything)
