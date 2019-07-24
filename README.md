# Runner Assist Frontend
This project was tasked to us by the University of Twente as a final project for the first year. We were working alongside TRIMM, who had developed sensors for runners to wear which would track their running performance on things like liftoff distance, lower leg impact, push-off force, and several other metrics. 

Our task was to make sense of the large amounts of data we were given, analyse it and display it in a web dashboard such that a potential customer could view their running performance, see what they need to improve and what they are doing well. The ultimate goal was to generate useful feedback on how runners could improve.

We created the frontend (this repository, in ReactJS), the backend and API (a Java project in a separate private repository), as well as the database structure. Sample data to populate the database was provided to us.  

# Project Structure:
+ runner-assist
+   - selenium: our selenium IDE tests
    - src: app code
        + assets: images
        + components: main app components
            * folder/index.jsx: main section of app
            * Component.jsx: part of the parent folder component
        + login: login sub app
        + scripts: js files
        + style: css files
            * index.css: global styles
            * Component.css: style for a given component
        + App.jsx: main app file
            * import files here
        + index.js: top level file for app

## Linting
 + eslint
    - airbnb standard

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to start the frontend

To start the frontend,
1. Clone the respository
2. In the root directory of the repo, run `npm install` to install all the dependencies
3. When finished, do `npm start` to start the local development server. 

### Important notes for starting the frontend: 

- You need an extension to get around a CORS error, at least during development; Download the following extension: 
    +  on Firefox, you can use [this extension](https://addons.mozilla.org/en-US/firefox/addon/access-control-allow-origin/)
    +  on Chrome, you can use [this extension](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en)
- You need the backend server running as well! See our other repo for instructions on how to get that running.


## Where to preview our app

Our app is currently hosted on my AWS server, which you can find here: [trimm.farooq.xyz](https://trimm.farooq.xyz/)

**This will probably stop working at some point, as the school will wipe our database**

** You may experience some issues logging in or creating new accounts. We're currently unable to replicate the issues, but there seems to be an intermittent issue with the password hashing. At the time of writing they seem to work.**

***The user that has data assigned to it:***
 - Email: `email@email.email`
 - Password: `Password1!`

***PLEASE NOTE***: To use the frontend, you need to download an extension to enable CORS. We couldn't find a solution in time
to solve this permanently, but for now, 
 - on Firefox, you can use [this extension](https://addons.mozilla.org/en-US/firefox/addon/access-control-allow-origin/)
 - on Chrome, you can use [this extension](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en)

Please be sure to uninstall/disable the extension when you are done, as keeping it enabled may cause you issues loading on other websites, aside from the huge security risk!

The API is also hosted on the same server, which you can find at [tapi.farooq.xyz/app/api](https://tapi.farooq.xyz/app/api)

We would have loved to host this on the University's farm servers, however we found out much too late that we could not 
run our API over HTTPS on the farm servers, so Klaas advised us to just run the API and backend using our own solution.

## Testing

We use the Selenium IDE to automate our tests. This is used to make sure that our input filters are working up to par.
We use the same input filters anywhere we allow user input through input boxes, in the exact same fashion (using the same Regex expressions).
In this way, we're able to prevent XSS attacks.

The Selenium project can be found in `src/selenium/selenium.side`. You can use the following versions of the IDE:
 - [Firefox version](https://addons.mozilla.org/en-GB/firefox/addon/selenium-ide/)
 - [Chrome version](https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
