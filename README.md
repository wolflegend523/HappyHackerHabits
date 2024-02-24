# Happy Hacker Habits
Happy Hacker Habits is a programming themed habit-tracker/self-care app. Taking inspiration from an IDE, Happy Hacker uses the idea of committing tasks and deploying goals to motivate programmers to take care of their mental health. Happy Hacker comes with other 'extensions' and 'terminal' features like a daily quote and an AI chat bot. 

## Project Origin
This project was started as a final project for a web development course. 
[View our project proposal here.](https://docs.google.com/document/d/1OYjdzDZvDSURJe2Cz1CSXcOTVdVYTclTWXIsI5yY7no/edit?usp=sharing)

## Directory Structure
- `backend` directory -> a node.js express server, with a PostgreSQL database managed by Prisma ORM
- `frontend` directory -> react app presentation tier

## Steps on running the Application 
The Back and Front end of the application are decoupled, and message each other using RESTful APIs.
Both need to be running for the app to function. 
- look at the `README` in the `backend` directory for steps on building the backend
- look at the `README` in the `frontend` directory for steps on building the frontend

## Primary Project TODOs
- integrate goals and tasks to the frontend 
- integrate quotes to the frontend
- add details to the welcome page 
- add directory structure and table of content details to READMEs?

## One Day Project TODOs
- save user state in a cookie? so that it doesn't get removed during a refresh? 
- update API code to be more modularized 
- more extensions: Flash card extension, mood log extension, notes extension 
- have a sidebar for files, extensions, and other stuff? 

## Credits
- our project architecture was inspired by 
  [Taha's Code Camp's Habit Tracker](https://www.youtube.com/playlist?list=PLBrfwm2BeKHy7P8WINburW_2tdek9yCTx)
- our front end design was inspired by [itsnitinr's vscode portfolio](https://github.com/itsnitinr/vscode-portfolio)


