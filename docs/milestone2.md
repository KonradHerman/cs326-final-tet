#Tet Milestone 2
by Konrad, Kash, and Doug
##Games API Documentation
game = {
    name: Azul
    id  : 1234
    own : array of user ids
    want: array of user ids
}

user = {
    username    : konrad
    password    : passw0rd
    picture     : penis.jpg
    location    : google map location
    own         : [{game name, id}, {game name, id}]
    want        : [{game name, id}, {game name, id}]
<!--
we need an api for get/update game description, and get/update user profile
i think we should skip delete functionality for now
for example:
-->
Users will be able to create and read games from the database.
###Create
This will allow us to create new games using the information on boardgamegeek.com. The user will put in the games url and using BGG's API will we fetch relevant data about the game so the user does not have to do it themselves.
####Endpoint URI and Parameters
`localhost:8080/games/create?<Parameter>=<Value>`

| Parameter | Description                       | Example                                 |
|-----------|-----------------------------------|-----------------------------------------|
| id        | (required) The BGG id of the game | `localhost:8080/games/create?id=230802` |
#### Responses
The Games API returns response data in a JSON object. Details below.

| Key    | Value Type | Description                                               |
|--------|------------|-----------------------------------------------------------|
| result | string     | The type of operation status: one of "created" or "error" |
| id     | number     | The boardgamegeek id used to fetch the information.       |
| name   | string     | The name of the game created.                             |

###Read
This will allow us to create new games using the information on boardgamegeek.com. The user will put in the games url and using BGG's API will we fetch relevant data about the game so the user does not have to do it themselves.
####Endpoint URI and Parameters
`localhost:8080/games/read?<Parameter>=<Value>`

| Parameter | Description                       | Example                                 |
|-----------|-----------------------------------|-----------------------------------------|
| id        | (required) The BGG id of the game | `localhost:8080/games/read?id=230802` |
#### Responses
The Games API returns response data in a JSON object. Details below.

| Key    | Value Type | Description                                               |
|--------|------------|-----------------------------------------------------------|
| result | string     | The type of operation status: one of "created" or "error" |
| id     | number     | The boardgamegeek id used to fetch the information.       |
| name   | string     | The name of the game created.                             |

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