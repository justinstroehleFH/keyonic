# Keyonic

## Authors

- [Ströhle Justin](mailto:justin.stroehle@students.fhv.at)
- [Tomasini Nico](mailto:nico.tomasini@students.fhv.at)

## Prerequisities

- Angular CLI (>= v12)
- Ionic CLI (v6)

## Run as Desktop Webapplication

```console
./keyonic:$ npm install
./keyonic:$ ionic build
./keyonic:$ npx cap add @capacitor-community/electron
./keyonic:$ cd electron
./keyonic/electron:$ npm run electron:start ?
```

## Run in Browser

```shell
./keyonic:$ ionic serve
```

## Testing

### Unit tests (Jasmine)

```console
./keyonic:$ npm run test
```

### E2E tests (Cypress)

The application needs to run on port 8110, as cypress is configured on the localhost:8110.

```console
./keyonic:$ ionic serve -p 8110
./keyonic:$ npx cypress open
```

Now follow these steps:

- Click "E2E Testing"
- Select a preferred browser
- Click "Start E2E Testing in ..."
- Navigate to "Specs"
- Open "cypress\e2e\labels.cy.ts"

After that, the E2E test starts. (Note: Make sure that there are at least 4 labels when starting the test, as when deleting the label the 5th element gets deleted).

Before starting the test in cypress, the entry with the key "labels" should be deleted from the IndexdDB (\_ionicstorage>\_ionickv), as the 4 label entry gets deleted during the test)

## Cryptonic

[Cryptonic](https://www.npmjs.com/package/cryptonic) is a NPM package, created and publish ourselves in order to encrypt and decrypt the passwords. We did not manage to include a C++ module in our project, nevertheless, a basic "Hello World" code using C++ and Node-Gyp is still in the NPM package.

## Information

When first starting the application, the Indexed DB is filled with some example data already.
