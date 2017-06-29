# Effective Palm Tree

[Postman](https://www.getpostman.com/collections/5e17fef838683470e176)

The application implements the trigger and action methods for ifttt. The Trigger implements at Valve's DOTA API and stores the current live games in a mongo db. The Action uses the Twilio service to send a text message.

## Setting up the application
We need to install the dependencies and setup the env variables. A dev_template.env file is provided to know which keys are required.
```
yarn
source dev.env
```

## Remove build files
This will remove the dist folder and node_modules.
```
yarn run clean
```

> Note: A Mongo instance should be running in the background to run the tests or the server if the db URL is using localhost

## Development
Running the typescript compiler and dist in watch mode proves hot reloading to the server.
`yarn run bw` will watch for changes in src and run tsc on new changes.
`yarn run watch` will run nodemon to watch for changes in dist

### Running the server
To run the server, we build our typescript then start the node application.
```
yarn run build
yarn start
```

### Run tests
To run the tests, we build our typescript then use mocha to run our spec files.
```
yarn run build
yarn test
```
