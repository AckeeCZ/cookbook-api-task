# Ackee Backend Task: The Problematic API

Howdy, partner! 👋

Wanna join [Ackee](https://ackee.cz)? Or you just don't know what to do on a lazy sunday afternoon? Here is a task for you!

Your goal is to design and implement a simple REST API for our mobile and web clients. Because users like fun, we will create an API for jolly problems they can administrate and solve.


## The task ahead

### Requirements
1. Use [Our project template](https://github.com/AckeeCZ/node-template) to get started. Template's readme should give you more information on how to use it.
2. Create an endpoint to create a new Problem. A Problem can be either riddle or math expression - more on that below.
3. Create endpoints for update, delete, read and list Problems.
4. Create an endpoint to answer a Problem. Only correct answers are accepted.
5. Modify Problems List to support filtering by Problem type and by answered / unasnwered for current user.
6. Modify update, delete endpoints so that only users who created those Problems can perform this action.
7. (_Optional_) Modify update/create Problem endpoints to validate input data. Reject requests for empty problems and respond accordingly.
8. (_Optional_) Authenticate users using Basic access authentication. No need to verify against any database - assume password is always correct. Use username from BA credentials to identify the User.
10. When completed, send us as link to your git repository or any other share services like GDrive etc.


A Problem can either be a _riddle_ (e.g. `If two is a company and three is a crowd. What is four and five?`) or an _arithmetic expression_ (e.g. `1- (10/5)* 2 +7`, where the expression is a simple string).

Each problem has only one answer. For all riddles (yes, all riddles have the same answer, no matter the problem), assume it is a constant string (e.g. `"It is 42"`) and for expression it is the result number (`4` in example).

For starters, the expression can include
* positive numbers,
* whitespaces,
* brackets `()`,
* binary operators `+-`.

### You must
 - Design API (routes, data model, etc.) and implement accordignly to meet all requirements
 - Use JS / TS
 - Use the provided template
 - Use JSON as transport format
 - Use git as VCS
 - Make sure `npm start` and `npm test` still work

### You can
 - Modify the template to your liking and change dependencies
 - Use any storage or database you like, you can even use a custom non-persistent storage, however it must provide an asynchronous API for read and write operations. We suggest [SQLite :memory:](https://www.sqlite.org/inmemorydb.html), as it is close to the real thing.

### You should
 - Test your code
 - Use the REST architecture to your best abilities
 - Use git as if you were collaborating on a project
 - Document your REST API
 - Use appropriate status codes and meaningful responses
 - Make the answer to riddles (constant string) configurable through static application config. Application restart is required to apply new configuration.
 - Ignore existing solutions for the expression solver or built in JS functions (like `eval`). We will be impressed by your algorithm. If you can't make it, don't worry, an existing solver is better than none. The solver is also a single non-trivial business logic in the task.
     - (Bonus) Enhance your solver with binary operators `*/`, unary operators `-+` and operator precedence.


<div align="center">
<br/>
🙘.🙚
<br/>
<br/>
See you when it's done!<br/>
👨‍💻
</div>