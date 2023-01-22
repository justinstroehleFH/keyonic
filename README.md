# Keyonic

## Prerequisities

- Angular CLI
- Ionic CLI

## Run as Desktop Webapplication

```bash
./keyonic:$ npm install
./keyonic:$ ionic build
./keyonic:$ npx cap add @capacitor-community/electron
./keyonic:$ cd electron
./keyonic/electron:$ npm run electron:start ?
```

## Run in Browser

```bash
./keyonic:$ ionic serve
```

## Testing

### Unit tests (Jasmine)

```bash
./keyonic:$ npm run test
```

### E2E tests (Cypress)

```bash
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
