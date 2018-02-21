#YAHTZEE

Based on the [classic game](https://en.wikipedia.org/wiki/Yahtzee) from Milton Bradley

Built with vanilla JavaScript using the reducer pattern

Play here: https://linsydeanna.github.io/yahtzee

## Setup

This project is using [lite-server](https://github.com/johnpapa/lite-server) to create a fast and streamlined development process. To run the project, please follow these steps:

* Make sure that  you have either `yarn` or `npm` installed.
* Install the Node packages:

```bash
yarn
```

or 

```bash
npm install
```
* Run the project:

```bash
yarn dev
```

or 

```bash
npm run dev
```

The project will be run in port `8000` by default. You may modify this by opening the `bs-config.json` file and changing the `port` property to any number of your liking. 

`lite-server` uses BrowserSync to provide you live browser reloading when there are any changes in the HTML, JavaScript and CSS files in the `src` folder.
