import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $address: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      address: $address
      password: $password
    ) {
        token
      user {
        _id
      }
    }
}`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
mutation addProduct($name: String!, $price: Float!, $category: ID, $description: String!, $quantity:Int ) {
  addProduct(name: $name, price: $price, category: $ category, description: $description, quantity: $quantity) {
    _id
    name
    price
    description
  }
}
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;