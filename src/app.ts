import { templateService } from './template-service/template';

templateService.app.listen(templateService.port,
  () => console.log(`${templateService.name} is running on ${templateService.port} port`)
);
