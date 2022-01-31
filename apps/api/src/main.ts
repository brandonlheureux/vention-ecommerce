import express from 'express';
import cors from 'cors';
import morgan_freeman from 'morgan';
import mongoose from 'mongoose';
import session from 'express-session';

import { config } from 'dotenv';
config();

import { ProductSchema } from '@ecommerce/models';

import routes from './routes/root.route';
import { cartSession } from './middleware/cartSession.middleware';

// init server
const app = express();

app.use(async (req, res, next) => {
  const con = await mongoose.connect(process.env.MONGO_DB_URL);
  // init models
  con.model('product', ProductSchema);
  app.locals.mongoose = con;
  next();
});
// provide access to mongoose instance

app.use(
  session({
    secret: process.env.SUPER_DUPER_TOP_SECRET_SECURE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(cartSession);

app.use(morgan_freeman('dev'));
app.use(cors());
app.use(express.json());

app.use('/', routes);

const port = process.env.port || 3333;

app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
