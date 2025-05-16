import mongoose, { Document, Schema } from 'mongoose';

export interface ITicket extends Document {
  title: string;
  description: string;
  category: mongoose.Types.ObjectId;
  assigned_department: mongoose.Types.ObjectId;
  assigned_users: mongoose.Types.ObjectId[];
  created_user: mongoose.Types.ObjectId;
  messages: mongoose.Types.ObjectId[];
  status: number;
}

const TicketSchema = new Schema<ITicket>(
  {
    title: String,
    description: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    assigned_department: { type: Schema.Types.ObjectId, ref: 'Department' },
    assigned_users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    created_user: { type: Schema.Types.ObjectId, ref: 'User' },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    status: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Ticket || mongoose.model<ITicket>('Ticket', TicketSchema);
