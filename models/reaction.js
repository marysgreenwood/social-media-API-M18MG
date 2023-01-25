//reaction schema
const reactionSchema= new Schema (
    {
        reactionId: {
            type: Schema.type.ObjectId(),
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
            type: Date,
            default: Date.now.toLocaleDateString(),
            // Use a getter method to format the timestamp on query
          },
    }
)