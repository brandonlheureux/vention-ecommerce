import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import session from 'express-session';

import { config } from 'dotenv';
config();

import { ProductSchema } from '@ecommerce/models';

import routes from './routes/root.route';
import { cartSession } from './middleware/cartSession.middleware';

// only run server if mongoose can connect
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then((con) => {
    console.log('connected');

    // init models
    con.model('product', ProductSchema);

    // init server
    const app = express();

    // provide access to mongoose instance
    app.locals.mongoose = con;

    app.use(
      session({
        secret: process.env.SUPER_DUPER_TOP_SECRET_SECURE_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
      })
    );
    app.use(cartSession);

    app.use(morgan('dev'));
    app.use(cors());
    app.use(express.json());

    app.use('/', routes);

    const port = process.env.port || 3333;

    const server = app.listen(port, () => {
      console.log('Listening at http://localhost:' + port + '/api');
    });

    server.on('error', console.error);
  })
  .catch((e) => console.log(e));
