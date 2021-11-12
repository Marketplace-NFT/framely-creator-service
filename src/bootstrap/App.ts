import { loggerConfig } from './../utils/logger';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerUi, { JsonObject } from 'swagger-ui-express';
import { createConnection } from 'typeorm';
import expressWinston from 'express-winston';

import { RegisterRoutes } from '@routes/routes';

import path from 'path';
import config from '../config';
import corsConfig from '@config/cors';
import errorMiddleware from '@middlewares/errorMiddleware';

class App {
  public readonly app: express.Express;
  public readonly port: number;
  public readonly isProduction: boolean;

  constructor() {
    this.app = express();
    this.port = config.port || 3000;
    this.isProduction = config.env === 'production';
    this.bootstrap();
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  protected async bootstrap(): Promise<void> {
    this.middlewares();
    this.routes();
    this.startSwagger();
    this.initializeErrorHandling(); // must be after add TSOA routes (https://tsoa-community.github.io/docs/error-handling.html#handling-validation-errors)
    try {
      await createConnection();
    } catch (error) {
      console.error('Unable to connect DB: ', error);
      process.exit(1);
    }
  }

  public express(): express.Express {
    return this.app;
  }

  private routes(): void {
    RegisterRoutes(this.app);
  }

  private middlewares(): void {
    this.app.use(express.urlencoded({ extended: true }));

    if (this.isProduction) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(morgan('combined'));
    } else {
      this.app.use(morgan('dev'));
    }
    this.app.use(cors({ ...corsConfig }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(expressWinston.logger(loggerConfig));
  }

  private startSwagger(): void {
    // Do not use in prod
    if (this.isProduction) return;
    try {
      const swaggerDoc: JsonObject = require(path.resolve(__dirname, '../../', 'swagger.json'));
      this.app.use(`${config.basePath}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    } catch (error) {
      console.error(error);
    }
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }
}

export default App;
