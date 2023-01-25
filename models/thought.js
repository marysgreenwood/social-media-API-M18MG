const { Schema, Types } = require("mongoose");

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
      type: Date,
      default: Date.now
      // Use a getter method to format the timestamp on query--Date.prototype.toLocaleDateString()
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
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

module.exports = Thought;
