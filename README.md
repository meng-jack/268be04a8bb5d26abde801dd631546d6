# United Aline Prebase

This folder contains both the FRONTEND and BACKEND code located in [`/client`](./client/) and [`/server`](./server/) respectively.

## Development

### Prerequisites

In order to run either, the following third parties must be installed:

1. NodeJS
2. NPM (NodeJS Package Manager)
3. PostgreSQL Server

After, it is recommended to install the individual dependencies for both the client and the server by running:

```bash
cd client && npm i # fetches all dependencies
cd server && npm i
```

### Running

To test either modules you can take a look at [`package.json`](./package.json), where you can run the following commands:

```bash
npm run full # for starting up the server and client

npm run client # for starting up only the frontend (with no backend)

npm run server # for starting up the backend with the PostgreSQL Server
```

### Testing the backend

The backend requires a certificate to run with `https`, if this is a dev build, it can be easier to generate a self-signed certificate. See [`/server/README.md`](./server/README.md) for more details.

Additionally, other test files are located under the root `./test` folder to facilitate testing HTTP requests locally and externally.

**NEVER PUBLISH THE CERTIFICATE**
