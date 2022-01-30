# vention-ecommerce

Technical take home assessment project built on the MERN stack with redux-toolko, MUI, NX &amp; typescript

## Project requirements

---

An ecommerce full stack web app that features, at a minimum:

_frontend_:

- A page with a list of products
- A shopping cart
- A product card with add & remove buttons, along with a rating and 'added' indicator.

_backend_:

- CRUD operations for products, cart items & ratings
- Persisting client side state through the backend
- Implement a database (MongoDB)

## Getting Started
---

This project uses node 16 & npm 8

Install all dependencies
```bash
  $ npm install
```

Start the backend and frontend, this will execute a parallel NX serve command. You will need to fill the .env of the api with a proper MongoDB connection. 
```
  $ npm start
```

## Approach

---

### Data

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

Therefore, we end up with two models for both our client and api to work with:

- Product

  ```ts
  interface Product {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    avgRating: number;
    ratingCount: number;
    price: number; // we want to use INT -> representing cents
  }
  ```

- Cart
  ```ts
  interface Cart {
    _id: string;
    productList: [Product];
  }
  ```

both the api and frontend apps will use the models defined here.

### Api

NodeJS + express.

 - morgan for request logging in dev.
 - cors 
 - mongodb for connecting to the database (MongoDB Atlas)


### Frontend

React + Redux-toolkit + MUI
