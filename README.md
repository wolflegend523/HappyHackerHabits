![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=redux)
![Nodejs](https://img.shields.io/badge/-Nodejs-339933?style=flat-square&logo=Node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express%20js-000000?style=flat-square&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=whit)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=white)


# Happy Hacker Habits
Happy Hacker Habits is a programming themed habit-tracker/self-care app. Taking inspiration from an IDE, Happy Hacker uses the idea of committing tasks and deploying goals to motivate programmers to take care of their mental health. Happy Hacker comes with other 'extensions' and 'terminal' features like a daily quote and an AI chat bot. 


## Table of Contents
- [Project Origin](#project-origin)
- [Directory Structure](#directory-structure)
- [Running the Application](#running-the-application)
- [License](#license)
- [Acknowledgements](#acknowledgements)


## Project Origin
This project was started as a final project for a web development course. 
[View our project proposal here.](https://docs.google.com/document/d/1OYjdzDZvDSURJe2Cz1CSXcOTVdVYTclTWXIsI5yY7no/edit?usp=sharing)


## Directory Structure
``` BASH
. 
├── backend      # a node.js express application tier and a PostgreSQL data tier managed by Prisma ORM
└── frontend     # react app presentation tier
```


## Running the Application
The Back and Front end of the application are decoupled, and message each other using RESTful APIs.
Both need to be running for the app to function. 
- look at the `README.md` in the `backend` directory for steps on building the backend
- look at the `README.md` in the `frontend` directory for steps on building the frontend


## License
This project is licensed under the MIT License - see the LICENSE.md file for details


## Acknowledgements  
- The project architecture was inspired by 
  [Taha's Code Camp's Habit Tracker](https://www.youtube.com/playlist?list=PLBrfwm2BeKHy7P8WINburW_2tdek9yCTx)
- The front end design was inspired by [itsnitinr's vscode portfolio](https://github.com/itsnitinr/vscode-portfolio)


