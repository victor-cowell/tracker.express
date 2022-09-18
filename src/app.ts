import { connect } from 'mongoose';
import { Service } from './app.interfaces';
import { templateService } from './template-service';
import { testService } from './test-service';
import { trackerService } from './tracker-service';

runService(templateService);
runService(trackerService);
if (process.env.NODE_ENV === 'dev') {
  runService(testService);
}

connect('mongodb://localhost:27017').catch((e) => console.log(`Dynamo connect error: ${e}`));

function runService(service: Service): void {
  service.app.listen(service.port,
    () => console.log(`${service.name} is running on ${service.port} port`)
  );
}
