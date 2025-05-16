import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  message: string;
  createdById: mongoose.Types.ObjectId;
}

const MessageSchema = new Schema<IMessage>(
  {
    message: String,
    createdById: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
