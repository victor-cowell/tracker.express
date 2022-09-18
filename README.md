# tracker.express

## Start instruction

1. Install modules using `npm i command`
2. Start mongo docker container using `npm run mongo:up`
3. Start server using `npm run nodemon:${dev | prod} command` or run script from package.json using IDE
4. Open `http://localhost:${8000, 8100}`. 8000 - dev stage, 8100 - prod stage.


## Dev stage

Dev stage includes Test API module. Dev template includes several additional buttons:
- Test delay 15 events. Clicks 5 times on Test click button and after 100 mls delay clicks again 10 times. You can change number of this request by changing arguments of testTrackDelay method.
- Get Events - request Events from database
- Delete Events - delete all events from database

