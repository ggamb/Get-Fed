const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Order, Product } = require("../models");
//Test stripe key, not sensitive
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find().select("-__v -password");
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Product.find(params).populate("category");
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("category");
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const line_items = [];

      //Takes in products from args parameter to be used below in loop
      const productsArray = args.product;

      for (let i = 0; i < productsArray.length; i++) {
        //Creates stripe products
        const product = await stripe.products.create({
          name: productsArray[i].itemName,
          description: productsArray[i].description,
        });

        //Creates stripe prices
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: productsArray[i].itemPriceFloat * 100,
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      //Creates Stripe session and directs to correct URL
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addProduct: async (parent, args) => {
      const product = await Product.create(args);

      return product;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
