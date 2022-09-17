import { Service } from './app.interfaces';
import { templateService } from './template-service/template.service';
import { trackerService } from './tracker-service/tracker.service';

runService(templateService);
runService(trackerService);

function runService(service: Service): void {
  service.app.listen(service.port,
    () => console.log(`${service.name} is running on ${service.port} port`)
  );
}
