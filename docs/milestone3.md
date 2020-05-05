#Tet Milestone 3
Konrad Herman, Kash Somani, Doug Silverman

##Database Documents

```
user document
{
    _id: string
    name: string
    email: string
    password: string
    zip: string
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

##Division of Labor

- Konrad worked on configuring the db and adding and removing entries from arrays in the database.
- Kash worked on integrating the new database calls with the client and server.
- Doug created our authentication protocol end to end.