# YAHTZEE

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

## Build for Production

To prepare the site for Github Pages hosting, run the following command: 

```bash
yarn build
```

or 

```bash
npm run build
```

This will run a script that will copy the contents of the `src` folder into the `docs` folder. Please set up your Github repository to use the `master/docs` folder for hosting. 

You also need to update the base url in the `docs/index.html` file to the full base URL of your repository hosted site:

```bash
https://<github-username>.github.io/yahtzee/
```

You would change:

```html
<base href="http://localhost:8000/">
```

to

```html
<base href="https://<github-username>.github.io/yahtzee/">
```

