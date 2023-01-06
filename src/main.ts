import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as cookieParser from 'cookie-parser';



async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('Subscription app')
        .setDescription('The API description')
        .setVersion('1.0.0')
        .addTag('Main')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    app.use(cookieParser());
    app.enableCors({
        credentials: true,
        origin: process.env.CLIENT_URL
    })
    await app.listen(PORT, () => console.log(`server started on PORT = ${PORT}`))
}

start();