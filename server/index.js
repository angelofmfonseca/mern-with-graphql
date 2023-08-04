const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./config/db");
const schema = require("./schema/schema");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  }),
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
