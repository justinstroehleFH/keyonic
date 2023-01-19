# Keyonic

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
./keyonic:$ ionic serve -p 8100
./keyonic:$ npx cypress open
```
