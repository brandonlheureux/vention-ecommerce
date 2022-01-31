# Ecommerce API endpoints

Models can be found under libs/models

| Endpoint            | Method | Query           | Param        | Body                                                                 | Response                          |
| ------------------- | ------ | --------------- | ------------ | -------------------------------------------------------------------- | --------------------------------- |
| /api/products       | GET    | limit=20 skip=0 | N/A          | N/A                                                                  | Array of IProduct                 |
| /api/products       | GET    | N/A             | id (product) | M/A                                                                  | Object matching product id        |
| /api/products       | PUT    | N/A             | id (product) | rating=[1-5]                                                         | Success message                   |
| /api/products       | POST   | N/A             | N/A          | name:string, description:string, imageUrl:url, price:number(integer) | success status                    |
| /api/products/pages | GET    | N/A             | N/A          | N/A                                                                  | number of pages of products in db |
| /api/cart           | GET    | N/A             | N/A          | N/A                                                                  | cart object from session          |
| /api/cart           | PUT    | N/A             | N/A          | product: base IProduct                                               | success message                   |
| /api/cart           | PATCH  | newCount:number | id (product) | N/A                                                                  | success message                   |
| /api/cart           | DELETE | N/A             | id (product  | N/A                                                                  | success message + id removed      |
