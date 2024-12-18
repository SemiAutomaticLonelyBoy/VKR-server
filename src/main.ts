import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function start () {
    const PORT = process.env.port || 5000
    const app = await NestFactory.create(AppModule, { cors: true })

    const config = new DocumentBuilder()
        .setTitle('swagger')
        .setDescription('documentation')
        .setVersion('1.0.0')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    await app.listen(PORT, () => {
        console.log(`server starting on port ${PORT}`)
    })
}

start()