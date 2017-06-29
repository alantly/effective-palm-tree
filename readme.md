# Effective Palm Tree

[Postman](https://www.getpostman.com/collections/5e17fef838683470e176)

The application implements the trigger and action methods for ifttt. The Trigger implements Valve's DOTA API and stores the current live games in a mongo db. The Action uses the Twilio service to send a text message.

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


## Development
Running the typescript compiler and dist in watch mode proves hot reloading to the server.
* `yarn run build` - run tsc to build src into dist
* `yarn run bw` - watch for changes in src and run tsc on new changes
* `yarn run watch` - watch for changes in dist and restart the running node instance
* `yarn start` - start the server using node.

> Note: A Mongo instance should be running in the background to run the tests or the server if the db URL is using localhost
