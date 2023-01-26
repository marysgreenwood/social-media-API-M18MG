const { Schema, model } = require("mongoose");

//schema for user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: this,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//virtual to track friend count
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

//define & export model
const User = model("user", userSchema);

module.exports = { User };
