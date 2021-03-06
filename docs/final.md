# Tet: BoredGames (Spring 2020)

- Konrad Herman (KonradHerman)
- Kash Somani (kashsomani)
- Doug Silverman (Douglas-Silverman)

## Overview

Overview:BoredGames is a web-app developed to help board game enthusiasts connect with each other. Functionalities of our website include: user specific games (sorted by owned and wanted), contact information of users who play a specific game (also sorted by owned or wanted), and their zip code.
Uniqueness: Our application provides a medium of connection for people who own / want to play board games which is unique in itself. This also implies that the functionality of our application is unique.
User Interface: A final up-to-date list/table describing your application’s user interface. This should include the name of the UI view and its purpose. You should include a screenshot of each of your UI views.
![Login](imgs/loginf.png)
Login - this page provides the user with an interface to enter their username / passwords (both of which have form inputs) so that the user can securely log into the website
![Register](imgs/register.png)
Create Account - this page provides us with a way to create a new account (in case you don't have one already!). There are input fields for username, password, email and zip code so that we can use this information for pages to come.
![home](imgs/homef.png)
Home - the Home page provides users where they can see the games they own, as well as the games they want to play
![search](imgs/searchf.png)
Search - This is the key webpage on the site. It enables the user to add a game to their owned / want to play list

## API

Users will be able to create and read games from the database.

### Create Game

This will allow us to create new games. The user will put in the games name and a new game will be created with that name.

#### Endpoint URI and Parameters

`https://tet326.herokuapp.com/api/games/create`

| Parameter | Description                      | Example         |
| --------- | -------------------------------- | --------------- |
| name      | (required) The name of the game. | `name:Monopoly` |

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

| Key    | Value Type | Description                                                                |
| ------ | ---------- | -------------------------------------------------------------------------- |
| result | string     | operation status: "username in use", "email in use", "created", or "error" |
| name   | string     | The user's name. (only returned with result created)                       |

### Login

This is called when a user wants to login. A hashed session ID is given to the user after a successful login. This value corresponds to one that is stored in the database. After 2 hours the session ID is set to -1 and no longer valid. The user will be required to login again and will receive a new session ID.

#### Endpoint URI and Parameters

`https://tet326.herokuapp.com/api/users/login`

| Parameter | Description                    | Example              |
| --------- | ------------------------------ | -------------------- |
| name      | (required)The user's username. | username : ChessWhiz |
| password  | (required)The user's password. | password : Pword123  |

#### Responses

The User API returns response data in a JSON object. Details below.

| Key       | Value Type | Description                                                            |
| --------- | ---------- | ---------------------------------------------------------------------- |
| result    | string     | operation status: "redirect", "Incorrect Password", "caught error"     |
| name      | string     | The user's name. (only returned with result: redirect)                 |
| sessionId | string     | The hashed sessionId of the user (only returned with result: redirect) |

### Session

This is called whenever a webpage is routed to. The purpose of this function is to make sure a user is signed in before routing to pages that require user information. This function checks the hashed session idea that is locally stored by the user against the valid session id that is stored on the server. If they are a match, the user will be able to continue to use the website. If they are not a match, the user is routed to the login page. After 2 hours the session ID is set to -1 and no longer valid. The user will be required to login again and will receive a new session ID.

#### Endpoint URI and Parameters

`https://tet326.herokuapp.com/api/users/session`

| Parameter | Description                             | Example                                                                     |
| --------- | --------------------------------------- | --------------------------------------------------------------------------- |
| name      | (required)The user's username.          | username : ChessWhiz                                                        |
| sessionId | (required)The user's current session ID | sessionId : "$2b$10\$GemtZfLuXJmaS0Dk3/.RFutF2yekXJMCp1t3jS.7K4l1d1SNSUe6y" |

#### Responses

The User API returns response data in a JSON object.

| Key    | Value Type | Description                                                   |
| ------ | ---------- | ------------------------------------------------------------- |
| result | string     | operation status: "session invalid", "session valid", "error" |

### Read User

This will generally be called when viewing a user profile.

#### Endpoint URI and Parameters

`https://tet326.herokuapp.com/api/users/read`

| Parameter | Description                      | Example                                               |
| --------- | -------------------------------- | ----------------------------------------------------- |
| id        | (required)The desired user's id. | `https://tet326.herokuapp.com/api/users/read?id=1234` |

#### Responses

| Key     | Value Type | Description                                               |
| ------- | ---------- | --------------------------------------------------------- |
| result  | string     | The type of operation status: one of "read" or "error".   |
| id      | number     | The user id.                                              |
| name    | string     | The user's name.                                          |
| zip     | string     | The user's zip code.                                      |
| picture | file       | The users profile picture.                                |
| own     | array      | Array containing the IDs of games owned by the user.      |
| want    | array      | Array containing the IDs of games the user wants to play. |

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
| ------ | ---------- | --------------------------------------------------------- |
| result | string     | The type of operation status: one of "updated" or "error" |

### Delete User

This is used when a user wants to delete their account.

#### Endpoint URI and Parameters

`https://tet326.herokuapp.com/api/users/delete`

| Parameter | Description             | Example      |
| --------- | ----------------------- | ------------ |
| name      | (required)The username. | name : Emery |

#### Responses

| Key    | Value Type | Description                                               |
| ------ | ---------- | --------------------------------------------------------- |
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

| URL                                              | Permission            | Description                                           |
|--------------------------------------------------|-----------------------|-------------------------------------------------------|
| https://tet326.herokuapp.com/                    | any                   | Login page                                            |
| https://tet326.herokuapp.com/create-account.html | any                   | Register an account                                   |
| https://tet326.herokuapp.com/home.html           | must be authenticated | Home page displaying the users games.                 |
| https://tet326.herokuapp.com/search.html         | must be authenticated | Search page where users can find new games and users. |

## Authentication

In order to access the website, users must login first. If a user does not currently have an account they can create one from the create-account.html page.

Create Account:

When creating a new account, each user is required to input a unique username that currently is not in use and a unique email that currently is not in use. The user then puts in a password (multiple users can have the same password). The user information is then sent to the server and the password is hashed in order to protect users.

Login:

The user must input their username and password to login. The user inputted username and password are sent to the server for authentication. The server obtains the user's information from the primary key of their username. If the username is not found, then a "incorrect username or password" message is sent to the client which displays the message to the user. If the usename is found, then the inputted password is compared with the hashed password. If the inputted password is not a match then the server sends a "incorrect username or password" message to the client which displays it to the user.

Sessions:

Every user has a session ID. When an account is first created this value is sent to -1. Whenever a user logs in to their account, the server sets their session ID to a random value which is stored in the server database. The server then hashes the session id and responds to the client with the session ID. The username and session ID are stored locally using sessionStorage. Hashing the session ID makes it more difficult to access the website without a valid account. After 2 hours, the user's session ID is set to -1 and their session has expired. The user must login again in order to refresh their session. Since the session ID is stored using sessionStorage, after a user closes their browser, they will have to login again.

## Division of Labor

1. All the labor was divided as equally as possible.
    - That being said, Konrad specialized most in backend database configuration.
    - Doug put a good amount of time in getting authentication and sessions to work.
    - and Kash was very influential in the design language and front end design.
2. Most methods have multiple contributors.
3. All 3 members have been involved in writing CSS, Client side JS, Backend TS, and Deployment on Heroku.
4. There was no "splitting of work" for any of the components. A group effort was prioritized even for the smallest components.
5. For components not involving collaboration, github provides an extensive documentation for each method.

## Conclusion

This project started off with us developing the front-end and then working towards the back end. This seemed counterintuitive to us as a team and would have preferred to start with the back-end and database operations.
We also wished that we could have a better understanding of SQL or any relational database earlier, as we realized too late that MongoDB wasn't the ideal choice for developing our back-end.
Overall, this project was a great learning experience for us as a team, as well as for our individual development as future software engineers.
A bunch of technical hurdles we have faced included: local heroku bugs, issues with using a non-relational database, CSS and HTML being annoying, among other things.
At first we believe we were expected to implement a messaging service, however, given that Authentication proved do be rather difficult and was later made non mandatory,
we decided to put more effort into getting that to work since it would be necessary for messaging.
