import mongoose, { Document, Schema } from 'mongoose';

export interface IAttachment extends Document {
  file_name: string;
  file_path: string;
  file_extension: string;
  ticket_id: mongoose.Types.ObjectId;
}

const AttachmentSchema = new Schema<IAttachment>(
  {
    file_name: String,
    file_path: String,
    file_extension: String,
    ticket_id: { type: Schema.Types.ObjectId, ref: 'Ticket' },
  },
  { timestamps: true }
);

export default mongoose.models.Attachment || mongoose.model<IAttachment>('Attachment', AttachmentSchema);
