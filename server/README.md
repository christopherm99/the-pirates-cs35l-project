# CS35L Project (Server)

This is the code for the backend half of our CS35L project.

## Installation and Setup

Install dependencies with `npm i`.
Create `.env` file with the format as follows:

```
GOOGLE_CLIENT_ID="<client id>"
GOOGLE_CLIENT_SECRET="<client secret>"
```

## Development

To run the server with `nodemon` for active development use `npm run dev`.
Otherwise, use `npm start`.

## Linting and Formatting

Use `npm run format:check` or `npm run format:fix` to run prettier to format
code. Use `npm run lint:check` or `npm run lint:fix` to run eslint to lint.
