# CS35L Project (Server)

This is the code for the backend half of our CS35L project.

## First Time Setup

Install dependecies as suggested in `../README.md`.

### Pre-requisites

In order for this code to work, one first needs to register the app with Google,
and also setup a MySQL server.

#### Registering with Google

1. Navigate to the [GCP console](https://console.cloud.google.com/).
2. Select your project, or create a new one.
3. Navigate to "APIs & Services" and select "Credentials".
4. Configure the OAuth consent screen.
5. Select "Create Credentials" and select "OAuth client ID".
6. Configure this, and add URI `http://hostname:port/oauth2/redirect/google`
   under "Authorized Redirect URIs".

#### MySQL

This code has been tested work with MySQL Server version 8. In order for the
server to connect, you must setup a user with a username and password, and also
create a database (the tables will be automatically created on first start).

### Environment

Create `.env` file with the format as follows:

```
GOOGLE_CLIENT_ID="client id"
GOOGLE_CLIENT_SECRET="client secret"
SQL_USER="user"
SQL_PASS="password"
SQL_HOST="hostname"
SQL_DB="database name"
```

## Development (and running in production)

See `../README.md`.

## Linting and Formatting

Use `npm run format:check` or `npm run format:fix` to run prettier to format
code. Use `npm run lint:check` or `npm run lint:fix` to run eslint to lint.
