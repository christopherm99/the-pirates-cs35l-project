# The Pirates' CS35L Project

This is the repository for our Fall 2022 CS35L project. The code for the
frontend is located in `client/` and the code for the backend is located in
`server/`.

## Setup

### Dependencies

Running `npm i` or `npm install` in the top level directory will install
dependencies for both the server and client.

### Server setup

See `server/README.md`.

## Building and Running

To run the application, first the code for the frontend must be built. To do so,
run `npm start` in the top level directory. This will build the React.js project
in `client/` and copy the result into the required folder in `server`, and then
start the server.

To start the server without first building the client, from the `server`
directory run `NODE_ENV=production npm start`.

## Development Server

To run the application in development mode, where the server and client will
autorefresh when files are changed, run `npm run dev` from the top level
directory.

**NB** Ensure that your browser is pointed at `http://localhost:8080` and not
`http://localhost:3000`, which is automatically opened by `CRA` when you start
the development server.

If issues arise with this system, you can always fallback to building the code
for production, using either `npm start` or `npm run build` in the root
directory.

<details>
<summary>How does this work?</summary>

### What the script does

When you run `npm run dev`, the script launches both the React.js Webpack
development server, and simultaneously launches the Express server to host
the API. Both of these servers are setup to autorefresh whenever the
underlying code is changed. However, the Express server is modified
somewhat from the production version

### Modifications to Express server

The `npm run dev` script in the `server` directory does not launch the server
with `NODE_ENV=production` set, which causes the server to run in development
mode. Everything in the Express server is identical between modes, besides
how the React.js client is served. In the production version, the React.js
code is served staticly from the compiled version in `server/static`. However,
in the development version, `http-proxy-middleware` is used to forward
requests that would be for the static, compiled React code to the React.js
dev server, running on port 3000.

### Why is this neccesary?

Our options for running in development mode are as follows:

- Rebuilding React.js code on every change:
  - Slow
  - And React dev tools don't work
- Running React.js dev server and Express server, with no proxy:
  - Fast
  - React dev tools work
  - But the client cannot communicate with the server, without complicated
    setup (ie. disabling CORS and some extra frontend logic)
- Running both servers, with React's built in proxy
  - Fast, and React dev tools work
  - Client can communicate with the server's API endpoints
  - However, some features are still broken (ie. login)
  - Also, this setup seems to be pretty glitchy
- Running both servers, with proxy in Express server
  - Fast, React dev tools work, and all features are natively reachable
  - Everything is unified under one URL
  - Forwarding a websocket seems prone to failure?
Thus it seems that the last option, the one in use, is solution with least
issues.
</details>
