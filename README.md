## How to run

run command "npm install"

after it finished, set NODE_PATH=./app:./config or if you are on Windows NODE_PATH=./app;./config

setup your MongoDB database, this is setting we use with mongoose : mongodb://localhost:27017/cookbook

You can change it in app/config/env-default

Then you can run it with "node --max-old-space-size=128 --harmony_default_parameters server.js ./app;./config"

Or you can set up your Webstrom environment

![Image][image-1]

[image-1]: https://github.com/AckeeCZ/cookbook-rest-api/raw/master/raw/settings.png
