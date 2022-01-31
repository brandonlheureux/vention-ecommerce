import { ProductList } from '../../components/product-list/product-list';
import Main from '../../layouts/main/main';

/* eslint-disable-next-line */
export interface ShopProps {}

export function Shop(props: ShopProps) {
  return (
    <Main>
      <ProductList
        products={[
          {
            _id: 'Adsfaa',
            avgRating: 3.5,
            description: 'asdfasdf',
            imageUrl: '/assets/images/mxkeys.jpg',
            name: 'Mx Keys',
            price: 1301234,
            ratingCount: 10,
          },
          {
            _id: 'adasfa',
            avgRating: 3.5,
            description: 'asdfasdf',
            imageUrl: '/assets/images/mxkeys.jpg',
            name: 'Mx Keys',
            price: 1300,
            ratingCount: 10,
          },
          {
            _id: 'adssfa',
            avgRating: 3.5,
            description: 'asdfasdf',
            imageUrl: '/assets/images/mxkeys.jpg',
            name: 'Mx Keys',
            price: 1300,
            ratingCount: 10,
          },
          {
            _id: 'adsfda',
            avgRating: 3.5,
            description: 'asdfasdf',
            imageUrl: '/assets/images/mxkeys.jpg',
            name: 'Mx Keys',
            price: 1300,
            ratingCount: 10,
          },
          {
            _id: 'adsffa',
            avgRating: 3.5,
            description: 'asdfasdf',
            imageUrl: '/assets/images/mxkeys.jpg',
            name: 'Mx Keys',
            price: 1300,
            ratingCount: 10,
          },
          {
            _id: 'adddsffa',
            avgRating: 3.5,
            description: 'asdfasdf',
            imageUrl: '/assets/images/mxkeys.jpg',
            name: 'Mx Keys',
            price: 1300,
            ratingCount: 10,
          },
          {
            _id: 'aasddsfda',
            avgRating: 3.5,
            description: 'asdfasdf',
            imageUrl: '/assets/images/mxkeys.jpg',
            name: 'Mx Keys',
            price: 1300,
            ratingCount: 10,
          },
          {
            _id: 'addfa sffa',
            avgRating: 3.5,
            description: 'asdfasdf',
            imageUrl: '/assets/images/mxkeys.jpg',
            name: 'Mx Keys',
            price: 1300,
            ratingCount: 10,
          },
          {
            _id: 'addsafsfa',
            avgRating: 3.5,
            description: 'asdfasdf',
            imageUrl: '/assets/images/mxkeys.jpg',
            name: 'Mx Keys',
            price: 1300,
            ratingCount: 10,
          },
          {
            _id: 'adsafsfa',
            avgRating: 3.5,
            description: 'asdfasdf',
            imageUrl: '/assets/images/mxkeys.jpg',
            name: 'Mx Keys',
            price: 1300,
            ratingCount: 10,
          },
        ]}
      />
    </Main>
  );
}

export default Shop;
