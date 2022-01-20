const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    price: Float
    quantity: Int
    category: Category
    description: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Query {
    user: User
    users: [User]
    order(_id: ID): Order
    products(category: ID , name: String): [Product]
    product(_id: ID!): Product

  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateProduct(_id: ID!, quantity: Int!): Product
    addProduct(name: String!, price: Int!, category:ID, description: String, quantity: Int): Product  
  }
`;

module.exports = typeDefs;
