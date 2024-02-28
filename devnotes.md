
## Primary Project TODOs
- integrate goals and tasks to the frontend 
- clear all the goals when the user logs out 
- add details to the welcome page 
- add pictures of the end app to readme. and deployment info 
- comment out more of the code, so it would be more easily reused and understood later 
- make it mobile friendly 
- add sidebar? 


## One Day Project TODOs
- save user state in a cookie? so that it doesn't get removed during a refresh? 
- update API code to be more modularized 
- more extensions: Flash card extension, mood log extension, notes extension 
- have a sidebar for files, extensions, and other stuff? 
- allow sub goals? might need to restructure the db on that one 
- deploy on AWS


## Notes on Query Params for GET Goals
- const GoalStatus = req.query.status; // DEPLOYED or UNDEPLOYED or ALL (if not provided, show all goals)
- const queryHabits = req.query.habits; // NONE or COMMITTED or UNCOMMITTED or ALL (if not provided, show all habits)
- const queryTasks = req.query.tasks; // NONE or COMMITTED or UNCOMMITTED or ALL (if not provided, show all tasks)
- const queryDate = req.query.date; // YYYY-MM-DD (if not provided, show all days)
- how that might look:

```
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