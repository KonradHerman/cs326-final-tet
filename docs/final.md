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
`https://tet326.herokuapp.com/api/games/create`

| Parameter | Description                      | Example              |
| --------- | -------------------------------- | -------------------- |
| name      | (required) The name of the game. | `name:Monopoly`      |

#### Responses

The Games API returns response data in a JSON object. Details below.

| Key    | Value Type | Description                                                                         |
| ------ | ---------- | ----------------------------------------------------------------------------------- |
| result | string     | The type of operation status: one of "created" or "game already in list" or "error" |
| name   | string     | The name of the game created.                                                       |

### Read Game
This function reads a game from the games database and sends a response to the client
#### Endpoint URI and Parameters
`https://tet326.herokuapp.com/api/games/read`

| Parameter | Description                      | Example          |
| --------- | -------------------------------- | ---------------- |
| name      | (required) The name of the game. | name: "Monopoly" |

#### Responses

The Games API returns response data in a JSON object. Details below.

| Key    | Value Type | Description                                            |
| ------ | ---------- | ------------------------------------------------------ |
| result | string     | The type of operation status: one of "read" or "error" |
| id     | number     | The id of the game.                                    |
| name   | string     | The name of the game.                                  |
| own    | array      | Array of users who own the game.                       |
| want   | array      | Array of users who want to play the game.              |

### Read All Games
This gives us an array of all the games collection.
#### Endpoint URI and Parameters
`https://tet326.herokuapp.com/api/games/readall`

No parameters.

#### Responses

The Games API returns response data in a JSON object. Details below.

| Key    | Value Type | Description                                                  |
| ------ | ---------- | ------------------------------------------------------------ |
| result | string     | The type of operation status: one of "read" or "error"       |
| games  | array      | An array of objects containing all the games and their data. |

### Update Game and User
This lets us update the games to add users to either the own or want array.
#### Endpoint URI and Parameters
`https://tet326.herokuapp.com/api/games/update`

All parameters are required.

| Parameter | Description                                                               | Example        |
| --------- | ------------------------------------------------------------------------- | -------------- |
| game      | The name of the game to update.                                           | id : 12345     |
| user      | The username to add/remove from the games collection.                     | user_id : 5678 |
| own       | Boolean value to determine whether we are updating the own or want array. | own : true     |
| add       | Boolean value to determine whether we are adding or removing the user.    | add : true     |

####Responses

| Key    | Value Type | Description                                               |
| ------ | ---------- | --------------------------------------------------------- |
| result | string     | The type of operation status: one of "updated" or "error" |
| id     | number     | The name of updated game.                                 |

### Create User
This is called when a user creates an account.

#### Endpoint URI and Parameters
`https://tet326.herokuapp.com/api/users/create`

| Parameter  | Description                                      | Example              |
| ---------- | ------------------------------------------------ | -------------------- |
| name       | (required)The user's desired username.           | username : ChessWhiz |
| password   | (required)A users desired password.              | password : Pword123  |
| img        | User's profile picture.                          | img : rook.jpg       |
| zip        | (required)User's zip code.                       | zip : 01002          |
| sesssionId | User's session ID (used for auth)(default is -1) | sessionId: -1        |

#### Responses

| Key    | Value Type | Description                                                            |
|--------|------------|------------------------------------------------------------------------|
| result | string | operation status: "username in use", "email in use", "created", or "error" |
| name   | string | The user's name. (only returned with result created)                       |

### Login
This is called when a user wants to login. A hashed session ID is given to the user after a successful login. This value corresponds to one that is stored in the database. After 2 hours the session ID is set to -1 and no longer valid. The user will be required to login again and will receive a new session ID.

#### Endpoint URI and Parameters
`https://tet326.herokuapp.com/api/users/login`

| Parameter  | Description                                      | Example              |
| ---------- | ------------------------------------------------ | -------------------- |
| name       | (required)The user's username.                   | username : ChessWhiz |
| password   | (required)The user's password.                   | password : Pword123  |

#### Responses

The User API returns response data in a JSON object. Details below.

| Key         | Value Type | Description                                                            |
|-------------|------------|------------------------------------------------------------------------|
| result      | string     | operation status: "redirect", "Incorrect Password", "caught error"     |
| name        | string     | The user's name. (only returned with result: redirect)                 |
| sessionId   | string     | The hashed sessionId of the user (only returned with result: redirect) |

### Session
This is called whenever a webpage is routed to. The purpose of this function is to make sure a user is signed in before routing to pages that require user information. This function checks the hashed session idea that is locally stored by the user against the valid session id that is stored on the server. If they are a match, the user will be able to continue to use the website. If they are not a match, the user is routed to the login page. After 2 hours the session ID is set to -1 and no longer valid. The user will be required to login again and will receive a new session ID.

#### Endpoint URI and Parameters
`https://tet326.herokuapp.com/api/users/session`

| Parameter  | Description                             | Example                                                                    |
| ---------- | --------------------------------------- | -------------------------------------------------------------------------- |
| name       | (required)The user's username.          | username : ChessWhiz                                                       |
| sessionId  | (required)The user's current session ID | sessionId : "$2b$10$GemtZfLuXJmaS0Dk3/.RFutF2yekXJMCp1t3jS.7K4l1d1SNSUe6y" |

#### Responses

The User API returns response data in a JSON object.

| Key         | Value Type | Description                                                   |
|-------------|------------|---------------------------------------------------------------|
| result      | string     | operation status: "session invalid", "session valid", "error" |

### Read User
This will generally be called when viewing a user profile.

#### Endpoint URI and Parameters
`https://tet326.herokuapp.com/api/users/read`

| Parameter | Description                      | Example                            |
| --------- | -------------------------------- | ---------------------------------- |
| id        | (required)The desired user's id. | `https://tet326.herokuapp.com/api/users/read?id=1234` |

#### Responses
| Key | Value Type | Description |
|---------|--------|-----------------------------------------------------------|
| result  | string | The type of operation status: one of "read" or "error".   |
| id      | number | The user id.                                              |
| name    | string | The user's name.                                          |
| zip     | string | The user's zip code.                                      |
| picture | file   | The users profile picture.                                |
| own     | array  | Array containing the IDs of games owned by the user.      |
| want    | array  | Array containing the IDs of games the user wants to play. |

### Update User
This is used to update a user's picture, location, or games.

#### Endpoint URI and Parameters
`https://tet326.herokuapp.com/api/users/update`

| Parameter | Description                                                          | Example        |
| --------- | -------------------------------------------------------------------- | -------------- |
| name      | (required)The user's name.                                           | id : 1234      |
| img       | A new profile picture for the user.                                  | img: panda.png |
| zip       | A new location for the user.                                         | zip: 11215     |
| add       | Whether user is adding or removing a game from the list.             | add: false     |
| own       | Is the game being added/removed from the owned or want to play list. | own: true      |
| game      | The id of the game being added or removed.                           | game: 69392    |

#### Responses
| Key    | Value Type | Description                                               |
|--------|------------|-----------------------------------------------------------|
| result | string     | The type of operation status: one of "updated" or "error" |

### Delete User
This is used when a user wants to delete their account.

#### Endpoint URI and Parameters
`https://tet326.herokuapp.com/api/users/delete`

| Parameter | Description               | Example      |
| --------- | ------------------------- | ------------ |
| name        | (required)The username. | name : Emery |

#### Responses
| Key    | Value Type | Description                                           |
|--------|------------|-------------------------------------------------------|
| result | string     | The type of operation status: one of "deleted" or "error" |

## Database

```
user document
{
    _id: string
    name: string
    email: string
    password: string
    zip: string
    sessionId: string
    own: Array
    want: Array
}

games document
{
    _id: string
    name: string
    own: Array
    want: Array
}
```

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
