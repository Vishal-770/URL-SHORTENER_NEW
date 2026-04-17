import { Schema, Document, models, model } from "mongoose";
export interface IUsers extends Document {
  authUserId: string;
  email: string;
  firstName: string;
  lastName: string;
}
const UserSchema = new Schema<IUsers>({
  authUserId: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    default: "",
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
});
const User = models.User || model<IUsers>("User", UserSchema);
export default User;
