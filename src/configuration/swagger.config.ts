import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

export function configureSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Footbal Quiz API')
    .setDescription('Is an other football quiz API')
    .setVersion('1.0')
    .addCookieAuth('access_token')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const documentFactory = () => SwaggerModule.createDocument(app, config, options);
  return SwaggerModule.setup('api', app, documentFactory);
}
