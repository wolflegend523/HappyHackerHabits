# Happy Hacker Habits Backend
Happy Hacker Habits uses an express node.js server as its application tier and a 
PostgreSQL database managed using Prisma ORM as its data tier. It exposes RESTFul endpoints
for the various features of the application.   

## Running the project locally
This section describes the steps to run and develop the project locally. 

### Installing Project Dependencies
To run the backend locally you need to [install node.js](https://nodejs.org/en/download). 
Once you have node installed, you can install the project dependencies by running

```
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
  or [AWS RDS](https://aws.amazon.com/rds/)


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

```
npx prisma migrate dev --name enter_a_migration_name_here
```

### Running the Server  
After setting up the prerequisites you can start the server by running the following command:

```
npm start
```