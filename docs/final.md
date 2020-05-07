# Tet: BoredGames (Spring 2020)
- Konrad Herman (KonradHerman)
- Kash Somani (kashsomani)
- Doug Silverman (Douglas-Silverman)
## Overview
Overview: A brief overview of your application. This will be based on what you are submitting as your final web application artifact. You should also mention why your application is innovative.

User Interface: A final up-to-date list/table describing your application’s user interface. This should include the name of the UI view and its purpose. You should include a screenshot of each of your UI views.

## API

Users will be able to create and read games from the database.
### Create Game
This will allow us to create new games. The user will put in the games name and a new game will be created with that name.
#### Endpoint URI and Parameters
`{server:port}/games/create`

| Parameter | Description                      | Example              |
| --------- | -------------------------------- | -------------------- |
| name      | (required) The name of the game. | `name:Secret Hitler` |

#### Responses

The Games API returns response data in a JSON object. Details below.

| Key    | Value Type | Description                                               |
| ------ | ---------- | --------------------------------------------------------- |
| result | string     | The type of operation status: one of "created" or "error" |
| name   | string     | The name of the game created.                             |

### Read Game
This will allow us to create new games. The user will put in the games name and a new game will be created with that name.
#### Endpoint URI and Parameters
`{server:port}/games/read`

| Parameter | Description                    | Example     |
| --------- | ------------------------------ | ----------- |
| game      | (required) The id of the game. | game: 19484 |

#### Responses

The Games API returns response data in a JSON object. Details below.

| Key    | Value Type | Description                                            |
| ------ | ---------- | ------------------------------------------------------ |
| result | string     | The type of operation status: one of "read" or "error" |
| name   | string     | The name of the game.                                  |
| id     | number     | The id of the game.                                    |
| own    | array      | Array of users who own the game.                       |
| want   | array      | Array of users who want to play the game.              |

### Read All Games
This gives us an array of all the games collection.
#### Endpoint URI and Parameters
`{server:port}/games/readall`

No parameters.

#### Responses

The Games API returns response data in a JSON object. Details below.

| Key    | Value Type | Description                                                  |
| ------ | ---------- | ------------------------------------------------------------ |
| result | string     | The type of operation status: one of "read" or "error"       |
| games  | array      | An array of objects containing all the games and their data. |

### Update
This lets us update the games to add users to either the own or want array using a POST request.
#### Endpoint URI and Parameters
`{server:port}/games/update`

All parameters are required.

| Parameter | Description                                                               | Example        |
| --------- | ------------------------------------------------------------------------- | -------------- |
| game      | The id of the game to update.                                             | id : 12345     |
| user      | The user id to add/remove from the games collection.                      | user_id : 5678 |
| own       | Boolean value to determine whether we are updating the own or want array. | own : true     |
| add       | Boolean value to determine whether we are adding or removing the user.    | add : true     |

####Responses

| Key    | Value Type | Description                                               |
| ------ | ---------- | --------------------------------------------------------- |
| result | string     | The type of operation status: one of "updated" or "error" |
| id     | number     | The id of updated game.                                   |

## Users API Documentation

### Create
This is called when a user creates an account.

#### Endpoint URI and Parameters
`{server:port}/users/create`

| Parameter | Description                            | Example              |
| --------- | -------------------------------------- | -------------------- |
| name      | (required)The user's desired username. | username : ChessWhiz |
| password  | (required)A users desired password.    | password : Pword123  |
| img       | User's profile picture.                | img : rook.jpg       |
| zip       | (required)Users zip code.              | zip : 01002          |

#### Responses
| Key | Value Type | Description |
|--------|------------|-----------------------------------------------------------|
| result | string | The type of operation status: one of "created" or "error" |
| name | string | The user's name. |
| id | number | The id of created user. |

### Read
This will generally be called when viewing a user profile.

#### Endpoint URI and Parameters
`{server:port}/users/read`

| Parameter | Description                      | Example                            |
| --------- | -------------------------------- | ---------------------------------- |
| id        | (required)The desired user's id. | `{server:port}/users/read?id=1234` |

#### Responses
| Key | Value Type | Description |
|---------|------------|-----------------------------------------------------------|
| result | string | The type of operation status: one of "read" or "error". |
| name | string | The user's name. |
| id | number | The user id. |
| zip | string | The user's zip code. |
| picture | file | The users profile picture. |
| own | array | Array containing the IDs of games owned by the user. |
| want | array | Array containing the IDs of games the user wants to play. |

### Update
This is used to update a user's picture, location, or games.

#### Endpoint URI and Parameters
`{server:port}/users/update`

| Parameter | Description                                                          | Example        |
| --------- | -------------------------------------------------------------------- | -------------- |
| id        | (required)The user's id.                                             | id : 1234      |
| img       | A new profile picture for the user.                                  | img: panda.png |
| zip       | A new location for the user.                                         | zip: 11215     |
| add       | Whether user is adding or removing a game from the list.             | add: false     |
| own       | Is the game being added/removed from the owned or want to play list. | own: true      |
| game      | The id of the game being added or removed.                           | game: 69392    |

#### Responses
| Key | Value Type | Description |
|--------|------------|-----------------------------------------------------------|
| result | string | The type of operation status: one of "updated" or "error" |
| id | number | The id of created user. |

### Delete
This is used when a user wants to delete their account.

#### Endpoint URI and Parameters
`{server:port}/users/delete`

| Parameter | Description              | Example   |
| --------- | ------------------------ | --------- |
| id        | (required)The user's id. | id : 1234 |

#### Responses
| Key | Value Type | Description |
|--------|------------|-----------------------------------------------------------|
| result | string | The type of operation status: one of "deleted" or "error" |
| id | number | The id of created user. |

## Database
Database: A final up-to-date representation of your database including a brief description of each of the entities in your data model and their relationships if any.
## URL Routes/Mappings
URL Routes/Mappings: A final up-to-date table of all the URL routes that your application supports and a short description of what those routes are used for. You should also indicate any authentication and permissions on those routes.
## Authentication
Authentication/Authorization: A final up-to-date description of how users are authenticated and any permissions for specific users (if any) that you used in your application. You should mention how they relate to which UI views are accessible.

In order to access the website, users must login first. If a user does not currently have an account they can create one from the create-account.html page. 

Create Account:

When creating a new account, each user is required to input a unique username that currently is not in use and a unique email that currently is not in use. The user then puts in a password (multiple users can have the same password). The user information is then sent to the server and the password is hashed in order to protect users.

Login: 

The user must input their username and password to login. The user inputted username and password are sent to the server for authentication. The server obtains the user's information from the primary key of their username. If the username is not found, then a "incorrect username or password" message is sent to the client which displays the message to the user. If the usename is found, then the inputted password is compared with the hashed password. If the inputted password is not a match then the server sends a "incorrect username or password" message to the client which displays it to the user.

Sessions:

Every user has a session ID. When an account is first created this value is sent to -1. Whenever a user logs in to their account, the server sets their session ID to a random value which is stored in the server database. The server then hashes the session id and responds to the client with the session ID. The username and session ID are stored locally using sessionStorage. Hashing the session ID makes it more difficult to access the website without a valid account. After 2 hours, the user's session ID is set to -1 and their session has expired. The user must login again in order to refresh their session. Since the session ID is stored using sessionStorage, after a user closes their browser, they will have to login again. 

## Division of Labor
Division of Labor: A breakdown of the division of labor for each team member — that is, saying who did what, for the entire project. Remember that everyone is expected to contribute roughly equally to each phase of the project. We expect to see similar numbers and kinds of GitHub commits by each student.

## Conclusion
Conclusion: A conclusion describing your team’s experience in working on this project. This should include what you learned through the design and implementation process, the difficulties you encountered, what your team would have liked to know before starting the project that would have helped you later, and any other technical hurdles that your team encountered.
