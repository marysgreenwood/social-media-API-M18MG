const { Schema, model } = require("mongoose");
const reaction = require("./reaction");
const dateAdded = require("../utils/createdAt");

//define schema for thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: String,
      get: dateAdded,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);
// virtual that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//define & export model
const Thought = model("thought", thoughtSchema);

module.exports = { Thought };
