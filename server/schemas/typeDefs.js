const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }
  type Product {
    _id: ID
    itemName: String
    itemPrice: Float
    category: String
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
  }
`;

module.exports = typeDefs;
