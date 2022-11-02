# The Pirates' CS35L Project

This is the repository for our Fall 2022 CS35L project. The code for the
frontend is located in `client/` and the code for the backend is located in
`server/`. 

## Setup

Running `npm i` or `npm install` in the top level directory will install
dependencies for both the server and client. 

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
directory. This script launches the React.js Webpack development server, with
rapid development features like HMR on port 3000, and concurrently launches a
development version of the server, using `nodemon`, running on port 8080, which
includes a proxy that allows your browser to communicate with both the the
Webpack server and the express API endpoints from one URL:
`http://localhost:8080`.

**NB** Ensure that your browser is pointed at `http://localhost:8080` and not
`http://localhost:3000`, which is automatically opened by `CRA` when you start
the development server.

### Troubleshooting
If issues arise with this system, you can always fallback to building the code
for production, using either `npm start` or `npm run build` in the root
directory.
