#Tet Milestone 2
by Konrad, Kash, and Doug
##Games API Documentation
<!--
we need an api for get/update game description, and get/update user profile
i think we should skip delete functionality for now
for example:
-->
Users will be able to create and read games from the database.
###Create
This will allow us to create new games using the information on boardgamegeek.com. The user will put in the games url and using BGG's API will we fetch relevant data about the game so the user does not have to do it themselves.
####Endpoint URI and Parameters
`/games/create?<Parameter>=<Value>`


#### Responses
##Users API Documentation
<!--
do this for each API ( read, update, delete, etc.)
-->
##Front-end Typescript
Your team created a polished web interface with HTML and CSS code in the last milestone. Now, you will need to glue them together. In this part, your team will need to implement all functions using TypeScript which the client side uses to perform CRUD operations on the server side, and render it on the HTML page with the fetched data. Once you are done, please take four screenshots with a brief description for your user interface to illustrate each of the Create, Read, Update, and Delete operations and include them in your docs/milestone2.md.
##Deployment
<!--
compile ts into js(obviously) and deploy on heroku 
-->