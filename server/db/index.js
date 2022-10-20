const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cygamesmagazine.7fdyl.mongodb.net/CygamesMagazine?retryWrites=true&w=majority`
    );

    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);

    process.exit(1);
  }
};

connectDB();
