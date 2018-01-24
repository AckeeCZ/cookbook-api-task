# Ackee Cookbook Node.js

Welcome! Wanna join [Ackee][1]? Or you just don't know what to do on a lazy sunday afternoon?

Here is a task for you! Enhance our Node.js backend app for delicious ackee recipes. You can
- Add more endpoints
- Refactor the current ones
- Add discussions under recipes
- Link to a 3rd party API

It should take you around 2-4 hours to complete.

## How to run

run command "npm install"

after it finished, set NODE_PATH=./app:./config or if you are on Windows NODE_PATH=./app;./config

setup your MongoDB database, this is setting we use with mongoose : mongodb://localhost:27017/cookbook

You can change it in app/config/env-default

Then you can run it with "node --max-old-space-size=128 --harmony_default_parameters server.js ./app;./config"

You can use our "Mongol" db which could be found in production environment but please setup your own DB :)

Or you can set up your Webstrom environment

![Image][image-1]

[image-1]: https://github.com/AckeeCZ/cookbook-rest-api/raw/master/raw/settings.png

## API Documentation

Current API Documentation can be bound on APIARY [https://app.apiary.io/cookbook3/editor]

