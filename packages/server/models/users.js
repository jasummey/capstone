import mongoose from "mongoose";
import { Schema,model } from "mongoose";
// const { ObjectId } = mongoose.Schema.Types;

const emailformat =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  emailAddress: [
    {
      type: String,
      validate: {
        validator: function (v) {
          return emailformat.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
      required: [true, "User email address required"],
    },
  ],
});

const User = model("User", userSchema);

export default User;
