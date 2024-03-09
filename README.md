# Task Management App

## Routes `🚀`

### User

> /user/register - post

- **Request**
```json
{
    "name": "Ali",
    "email": "aliabd@gmail.com",
    "password": "12345678"
}
```

- **Response - success**

**status** - 200

**body** 👇
```json
{
    "id": "65ec328c782178286812fd9f",
    "email": "aliabd12345@gmail.com",
    "name": "Ali"
}

```

- **Response - error**

**status** - 422

**body** 👇
```json
{
    "err": "Такой пользователь уже существует"
}
```

> /user/login - post

- **Request**
```json
{
    "email": "aliabd@gmail.com",
    "password": "12345678"
}
```

- **Response - success**

**status** - 200

**body** 👇
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6aWtyZWVkQGdtYWlsLmNvbSIsImlhdCI6MTcwOTk3ODQ4OH0.ocQAkza3cLGSwzceBLDkrfDHBEcYDL5v_F_OB2GrQ4s"
}
```

- **Response - error**

**status** - 401

**body** 👇
```json
{
    "err": "ошибка авторизации"
}
```

> /user/info - get

- **Request**

**body** 👇

*nothing*

**headers 👇**

*Authorization* = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6aWtyZWVkQGdtYWlsLmNvbSIsImlhdCI6MTcwOTk3ODQ4OH0.ocQAkza3cLGSwzceBLDkrfDHBEcYDL5v_F_OB2GrQ4s

- **Response - success**

**status** - 200

**body** 👇
```json
{
    "id": "65e465fb730266c9ca63d5a0",
    "email": "azikreed@gmail.com",
    "name": "Ali"
}
```

- **Response - error**

**status** - 401

**body** 👇
```json
{
    "error": "Вы не авторизованы"
}
```

### Task

> /task/create - post

- **Request**

**body** 👇

```json
{
    "title": "any title",
    "description": "Anything else to do at the time and etc.",
    "deadline": "2019-04-28T14:45:15"
}
```

**headers 👇**

*Authorization* = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6aWtyZWVkQGdtYWlsLmNvbSIsImlhdCI6MTcwOTk3ODQ4OH0.ocQAkza3cLGSwzceBLDkrfDHBEcYDL5v_F_OB2GrQ4s

- **Response - success**

**status** - 200

**body** 👇
```json
{
    "id": "65ec378168aea0ffca3a81d4",
    "title": "any title",
    "description": "Anything else to do at the time and etc.",
    "deadline": "2019-04-28T11:45:15.000Z",
    "user": "65e465fb730266c9ca63d5a0"
}
```

- **Response - error with auth**

**status** - 401

**body** 👇
```
{
    "error": "Вы не авторизованы"
}
```

- **Response - error with request body**

**status** - 422

**body** 👇
```
[
    {
        "constraints": "Неверно указан дедлайн"
    }
]
```

> /task/get - get

- **Request**

**body** 👇

*nothing*

**headers 👇**

*Authorization* = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6aWtyZWVkQGdtYWlsLmNvbSIsImlhdCI6MTcwOTk3ODQ4OH0.ocQAkza3cLGSwzceBLDkrfDHBEcYDL5v_F_OB2GrQ4s

- **Response - success**

**status** - 200

**body** 👇
```json
[
    {
        "_id": "65e4691401730a4a114d5a82",
        "title": "not any title not not",
        "description": "Anything else to do at the time and etc.",
        "deadline": "2019-04-28T11:45:15.000Z",
        "user": "65e465fb730266c9ca63d5a0",
        "createdAt": "2024-03-03T12:12:04.315Z",
        "updatedAt": "2024-03-04T12:35:56.475Z",
        "__v": 0
    },
    {
        "_id": "65e46e0255bc56e0a9700e29",
        "title": "any title",
        "description": "Anything else to do at the time and etc.",
        "deadline": "2019-04-28T11:45:15.000Z",
        "user": "65e465fb730266c9ca63d5a0",
        "createdAt": "2024-03-03T12:33:06.540Z",
        "updatedAt": "2024-03-03T12:33:06.540Z",
        "__v": 0
    }
]
```

- **Response - error with auth**

**status** - 401

**body** 👇
```
{
    "error": "Вы не авторизованы"
}
```

> /task/update/65e4691401730a4a114d5a82 - patch

- **Request**

**body** 👇

```json
{
    "title": "any title any",
}
```

**headers 👇**

*Authorization* = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6aWtyZWVkQGdtYWlsLmNvbSIsImlhdCI6MTcwOTk3ODQ4OH0.ocQAkza3cLGSwzceBLDkrfDHBEcYDL5v_F_OB2GrQ4s

- **Response - success**

**status** - 200

**body** 👇
```json
{
    "_id": "65e4691401730a4a114d5a82",
    "title": "not any title not not",
    "description": "Anything else to do at the time and etc.",
    "deadline": "2019-04-28T11:45:15.000Z",
    "user": "65e465fb730266c9ca63d5a0",
    "createdAt": "2024-03-03T12:12:04.315Z",
    "updatedAt": "2024-03-09T10:49:45.483Z",
    "__v": 0
}
```

- **Response - error with auth**

**status** - 401

**body** 👇
```
{
    "error": "Вы не авторизованы"
}
```

- **Response - error with request body**

**status** - 422

**body** 👇
```
[
    {
        "constraints": "Неверно указан дедлайн"
    }
]
```

> /task/get/65e4691401730a4a114d5a82 - get

- **Request**

**body** 👇

*nothing*

**headers 👇**

*Authorization* = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6aWtyZWVkQGdtYWlsLmNvbSIsImlhdCI6MTcwOTk3ODQ4OH0.ocQAkza3cLGSwzceBLDkrfDHBEcYDL5v_F_OB2GrQ4s

- **Response - success**

**status** - 200

**body** 👇
```json
{
    "_id": "65e4691401730a4a114d5a82",
    "title": "not any title not not",
    "description": "Anything else to do at the time and etc.",
    "deadline": "2019-04-28T11:45:15.000Z",
    "user": "65e465fb730266c9ca63d5a0",
    "createdAt": "2024-03-03T12:12:04.315Z",
    "updatedAt": "2024-03-09T10:49:45.483Z",
    "__v": 0
}
```

- **Response - error with auth**

**status** - 401

**body** 👇
```
{
    "error": "Вы не авторизованы"
}
```

> /task/delete/65e4691401730a4a114d5a82 - delete

- **Request**

**body** 👇

*nothing*

**headers 👇**

*Authorization* = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6aWtyZWVkQGdtYWlsLmNvbSIsImlhdCI6MTcwOTk3ODQ4OH0.ocQAkza3cLGSwzceBLDkrfDHBEcYDL5v_F_OB2GrQ4s

- **Response - success**

**status** - 200

**body** 👇
```json
true
```

- **Response - error with auth**

**status** - 401

**body** 👇
```
{
    "error": "Вы не авторизованы"
}
```