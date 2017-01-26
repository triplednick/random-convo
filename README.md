# random-convo
This is a web application created using Mustache.js to render content in the view. Also on the front end, Axios is being used to make server calls to get data 
from the server. On the back end, the project is ran on an Express server. The back end uses Axios to grab data from the 3 
API(see Credits section) endpoints. The whole project is coded in ES6 with a gulp build process to convert our front end code into ES5 
that can be used in the browser.

## Installation
After cloning or loading the project, run this command from the project directory containing the package.json file:
```
npm install
```

## Usage
To use this application after install dependencies, run this command from the project directory: 
```
node server.js
```
After the server is running hit the web application by typing this following url in the browser:
```
http://localhost:8080/
```

## App Functionality
This app loads a new avatar with a random sentence every 3 seconds. It then gives you the ability to click the avatar and display 
its profile information in a modal screen.

## Credits
These are the api endpoints being used:

1.) http://avatars.adorable.io/
  - This api grabs the avatars

2.) http://randomword.setgetgo.com/get.php
  - This api grabs random words

3.) https://uinames.com/api/
  - This api grabs random fake user information
 
