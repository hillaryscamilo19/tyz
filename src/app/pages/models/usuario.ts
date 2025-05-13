import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  fullname: string;
  email: string;
  phone_ext: number;
  department: mongoose.Types.ObjectId;
  role: number;
  username: string;
  password: string;
  status: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    fullname: String,
    email: String,
    phone_ext: Number,
    department: { type: Schema.Types.ObjectId, ref: 'Department' },
    role: Number,
    username: String,
    password: String,
    status: Boolean,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
