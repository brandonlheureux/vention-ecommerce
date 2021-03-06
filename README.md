# vention-ecommerce

Technical take home assessment project built on the MERN stack with redux-toolko, MUI, NX &amp; typescript

---

## Project requirements

An ecommerce full stack web app that features, at a minimum:

_frontend_:

- A page with a list of products
- A stateful shopping cart with the ability to modify items
- Product cards with add & remove buttons, along with a rating and 'added' indicator.

_backend_:

- CRUD operations for products, cart items & ratings.
- Persisting client side state through the backend
- Implement a database (MongoDB)

_general_:

- A README file with instructions on how to launch this project

## Getting Started

This project uses node 16 & npm 8

1. Install all dependencies

```bash
  $ npm install
```

2. Configure .env for MongoDB & Express-Sessions.

```
  MONGO_DB_URL=<mongo db uri>
  SUPER_DUPER_TOP_SECRET_SECURE_KEY=<express session secret key here>
```

you will need a collection for products following the IProduct described below.

3. Start the api and ecommerce website, this will execute a parallel NX serve command. You will need to fill the .env of the api with a proper MongoDB connection.

```
  $ npm run serve
```

This will start the react web app on port 4200 and the express server on port 3333

## Approach

### Data

Data is represented by models defined in the model shared library

We have 3 main data objects.

- A product object
- A cart session object
- A rating

However, we can include the rating as a property of the product object.
Keeping track of the rating count and avg rating would allow us to add ratings as they come. If we need to implement a review, another method may be required, or they could remain decoupled.

new avg = ((Avg rating \* rating count) + new rating) / (rating count + 1)

new ratings = rating count ++

There is no need to track users, we assume there is a new user per client session. Client sessions will have their corresponding cart sessions.

There is also no need to keep an inventory count.

We DO NOT want to store images in a mongo db database. We will keep relative image paths instead and store them in the assets folder. An image CDN would be optimal.

We end up with 3 models for both our client and api to work with:

- Product

  ```ts
  interface Product {
    _id: string; //uuid
    name: string;
    description: string;
    imageUrl: string;
    avgRating: number;
    ratingCount: number;
    price: number;
    // Price will be an integer. Allows for accurate js calculations.
  }
  ```

- Cart

  ```ts
  interface ICartItem extends IProduct {
    count: number;
  }

  interface ICart {
    _id: string; //uuid
    list: {
      [productId: string]: ICartItem;
    };
  }
  ```

both the api and frontend apps will use the models defined here.

### Api

NodeJS + express + mongoose

- morgan: for request logging when developing.
- cors: just in case...
- mongoose: for connecting to the database with schemas based on our typescript models (MongoDB Atlas)
- express-sessions: for saving and persiting cart. We will not connect it to a database, simply using in-memory storage is sufficient for this project.

### Frontend

React + Redux-toolkit + MUI + emotion

- state will be manged by Redux RTK-Query and sync changes with the api.
- notistack will provide us notifications through MUI snackbars
- custom styling on MUI components using emotion

### Tools

commitizen + NX + typescript

- react components generated through NX, along with the models library.
- commitizen will allow "better" commits (i'm not an expert yet)
- typescript to work with our models and a better bug free experience


### Reference Images:

Home

![image](https://user-images.githubusercontent.com/69240832/151894558-31767d46-1c0b-467a-a3c6-7a4d41d8fad5.png)

Shop + selected items

![image](https://user-images.githubusercontent.com/69240832/151894605-8b9c2039-8e8e-496d-ae39-6db080fc8c96.png)

Hover effect on product rating input

![image](https://user-images.githubusercontent.com/69240832/151894655-89046de6-2e36-458a-8de6-060924946bf4.png)

rating input open

![image](https://user-images.githubusercontent.com/69240832/151894676-0146ec72-b8a9-4484-8467-35f2d01096c0.png)

rating submitted

![image](https://user-images.githubusercontent.com/69240832/151894706-47c10ff8-5b42-4179-9df5-e2f0ea4ae07e.png)

second page with cart open

![image](https://user-images.githubusercontent.com/69240832/151894740-b458f003-5223-43ca-9875-0c0dfc24ecc7.png)

editing cart quantities

![image](https://user-images.githubusercontent.com/69240832/151894777-d1f09bc6-895b-432e-a8fd-eb388e0d0f34.png)

removing an item

![image](https://user-images.githubusercontent.com/69240832/151894808-5bb3f043-9338-44fe-8cc6-4d071068c91e.png)




