import { connect } from 'mongoose';
import { Service } from './app.interfaces';
import { TrackerEventModel } from './models/trackerEvent';
import { templateService } from './template-service';
import { trackerService } from './tracker-service';

const cors = require('cors');

runService(templateService);
runService(trackerService);

connect('mongodb://localhost:27017')
  .then(async () => {
    console.log('dynamoDB connected');
    const events = await TrackerEventModel.find({});
    console.log(events);
  })
  .catch((e) => console.log(`Dynamo connect error: ${e}`));

function runService(service: Service): void {
  service.app.listen(service.port,
    () => console.log(`${service.name} is running on ${service.port} port`)
  );
}
