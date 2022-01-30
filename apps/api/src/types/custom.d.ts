import { ICart } from '@ecommerce/models';
import 'express-session';

// declare custom session properties here
// they will be type merged
declare module 'express-session' {
  interface SessionData {
    cart?: ICart;
  }
}
