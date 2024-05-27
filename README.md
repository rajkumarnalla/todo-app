1. Install nodeV18.20.2 - https://nodejs.org/en/download/prebuilt-installer
2. Goto app-client folder and install npm dependencies using - `npm install`
3. Next, goto app-server folder and install npm dependencies using - `npm install`
4. If mysql is not installed, install mysql8 - https://dev.mysql.com/downloads/mysql/ and start mysql server
5. Next, goto to app-server and update .env file with database details - database, db user, db password and db host
6. Once database details are updated, next we need to run sequelize migration script to create the database with the requried tables - `tasks` and `users`
7. Before running the migration script, install sequelize-cli using - `npm install -g sequelize-cli`
8. Once it's installed, now run the migration script using - `sequelize db:migrate --migrations-path .\src\migrations\ --config .\src\config\config.js`
9. Next, open terminal with two different tabs
10. In one tab, goto app-client and run - `npm run start`
11. In the second tab, goto app-server and run - `npm run dev`
12. Once, commands from previous two steps are running, access the todo app at - http://localhost:3000 and the server runs at - http://localhost:4000

#### Note: Step 7 & 8 are supposed to be executed from app-server folder from terminal
