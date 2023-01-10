# Traffic Lights

This example application is used to learn about [xstate](https://xstate.js.org)

## Installation of dependencies

This application uses a number of external modules and even TypeScript, so they need to be installed. Luckily for us, Node.js has a package manager, that can do the heavy lifting for us:

```
$ npm ci
```

That will install all the required dependencies.

## Usage

After installing the dependencies use the following command to start the application:

```
./index.ts
```

## Development

There are tests for the state machine. That's how I learn. Tests can be executed with or without a watcher.

To start the tests without watcher run the following command:

```
$ npm test
```

To start the tests with a watcher, as a convenience method of continuously running them in the background, then run this command:

```
$npm run test:watch
```

## Footnote

If you know how to do the things I've done here better, please create a PR. That's how you can help me learn more :star: :star2: :boom:


