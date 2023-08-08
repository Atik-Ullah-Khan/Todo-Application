/***
 * Title : Database connection.
 * Author : Atik Ullah Khan.
 * Description : Connect app to the MongoDb database.
 * Date : 24/11/2022.
 ***/

const { set, connect } = require("mongoose");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDatabase = (URI) => {
  try {
    set("strictQuery", false);

    connect(URI, options, () => {
      console.log("Database connected successfully 🚀");
    });
  } catch (error) {
    console.log("Could not connect to the database 🐞");
  }
};

module.exports = connectToDatabase;
