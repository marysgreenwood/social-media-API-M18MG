const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// Wrap Mongoose around local connection to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/socialMediaAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection
module.exports = mongoose.connection;
