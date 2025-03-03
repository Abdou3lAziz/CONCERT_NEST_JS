"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const connectMongo = require("connect-mongodb-session");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const MongoStore = connectMongo(session);
    const store = new MongoStore({
        uri: 'mongodb+srv://username:A5RZBXFLsCZ9vU36@cluster0.ldq0n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
        collection: 'sessions',
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), { prefix: '/uploads' });
    app.setViewEngine('hbs');
    app.use(session({
        secret: 'mysecretKey',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
        store: store,
    }));
    app.use(function (req, res, next) {
        res.locals.session = req.session;
        next();
    });
    const port = process.env.PORT || 10000;
    app.use(cookieParser());
    await app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map