# HTTP Signature Component

## Quickly Getting Started

To get started you will Node 16, 18 or 20 installed and then clone the repo. After this run:

```bash
# Install dependencies and build the server
npm i

# Start the server with an example account seeded
npm run start:seeded
```

If you make any changes that you want to test then you will need to do the following

```bash
# Build the server (without re-installing dependencies)
npm run build

# Start the server with an example account seeded
npm run start:seeded
```

## Structure

This template is based on the [Hello World Component](https://github.com/CommunitySolidServer/hello-world-component);
refer to the readme over there for any other questions about the structure of this repository. The following parts of this section define additions to that template.

### Scripts

 - `npm run start:seeded`: Start the server with a seeded account; the WebId of this account is http://localhost:3000/example/profile/card#me.
 - `npm run test:401`: Do a get request on a resource in the example account that is Unauthorized for Public Access.
