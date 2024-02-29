
# Primary Project TODOs
here are the things we hope to get done before the project is "due"

- comment out more of the code, so it would be more easily reused and understood later 
- integrate goals into frontend 
- add details to the welcome page 
- add pictures of the end app to readme?
- make it mobile friendly?
- add sidebar? 


# Project TODOs
This section contains ideas and thoughts about how to improve the project.
Mostly just a brain dump so that I can try to stop thinking about it constantly.

## Backend-Heavy Tasks
- save user token securely, so that it doesn't get removed during a refresh? 
- allow sub goals? might need to restructure the db on that one 
- more extensions: Flash card extension, mood log extension, notes extension 
- work on the AI Chat bot idea
- update API code to be more modularized within a feature 
- add a bunch more API's and API queries
- re-evaluate URL space... should habit/tasks be under goals in the url space? 
- modularize the goals and tasks/habits to be separate features 
- make sure that the quotes are working fine on render, looks like some time 
  difference stuff might be happening? this would effect other time things too


## Frontend-Heavy Tasks
- integrate tasks and habits to the frontend
- have a sidebar for files, extensions, and other stuff? 
- allow users to resize component elements
- make it so the tabbar keeps track of the pages you have been on and allows you to go back to them? 
- add more icons all over the place to make it look more like vs code
- make the happy hacker icon a jsx react component? 
- move all redux logic to helper functions in a user.js and goals.js file so it is not in the display logic
  and the pages/components don't even know redux is a thing
- move the app layout into its own file so that app is only responsible for routing? should routing be done elsewhere?


## Documentation / "Production Ready" Tasks
- deploy on AWS (AWS RDB, Amplify, containerizing...?)
- add tests!
- update the frontend public folder to have icons and stuff for mobile browsers and stuff (make it cool)
- make sure the package.json files are as cool as they can be
- make sure the .gitignore and .env files are also as cool as they can be
- add github pages support and bug reports? 



# Misc TODO/Notes
This section contains any TODO notes that are too large to just go in the code.
But are still small ideas. Thoughts about how to fix or work on stuff. 
Maybe with some pseudocode.


## Notes on Query Params for GET Goals
```javascript
const GoalStatus = req.query.status; // DEPLOYED or UNDEPLOYED or ALL (if not provided, show all goals)
const queryHabits = req.query.habits; // NONE or COMMITTED or UNCOMMITTED or ALL (if not provided, show all habits)
const queryTasks = req.query.tasks; // NONE or COMMITTED or UNCOMMITTED or ALL (if not provided, show all tasks)
const queryDate = req.query.date; // YYYY-MM-DD (if not provided, show all days)
// how the query might look:

const goals2 = await prisma.goal.findMany({
      where: {
        user_id: req.userId,
        deployed_at: queryGoals === "DEPLOYED" ? { not: null } : queryGoals === "UNDEPLOYED" ? null : undefined,
      },
      select: {
        goal_id: true,
        goal_name: true,
        goal_description: true,
        created_at: true,
        deployed_at: true,
        habits: {
          where: {

          },
        },
        tasks: {
          where: {
            scheduled_at: queryDate ? { gte: new Date(queryDate), lt: new Date(queryDate + "T23:59:59") } : undefined,
            committed_at: (queryTasks === "COMMITTED" && queryDate) ? { gte: new Date(queryDate), lt: new Date(queryDate + "T23:59:59") } :  queryTasks === "COMMITTED" ? {not: null} : queryTasks === "UNCOMMITTED" ? null : undefined,
          },
        },
      },
    });
```