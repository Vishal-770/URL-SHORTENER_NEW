import { Schema, Document, models, model } from "mongoose";
export interface IUsers extends Document {
  clerkId: string;
  firstName: string;
  lastName: string;
}
const UserSchema = new Schema<IUsers>({
  clerkId: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: { type: String },
});
const User = models.User || model<IUsers>("User", UserSchema);
export default User;
