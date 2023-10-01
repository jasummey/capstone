import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxlength: 120,
    },
    author: {
      type: ObjectId,
      ref: "User",
    },
    created: {
      type: Date,
      default: Date.now,
    },

    comments: [
      {
        text: {
          type: String,
          required: true,
          maxlength: 120,
        },
        created: {
          type: Date,
          default: Date.now,
        },
        author: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
