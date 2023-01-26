const { Schema, Types } = require("mongoose");
const dateAdded = require("../utils/createdAt");

//define reaction schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      get: dateAdded,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = reactionSchema;
