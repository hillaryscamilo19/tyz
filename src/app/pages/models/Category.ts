import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  list_departments: mongoose.Types.ObjectId[];
}

const CategorySchema = new Schema<ICategory>(
  {
    name: String,
    list_departments: [{ type: Schema.Types.ObjectId, ref: 'Department' }],
  },
  { timestamps: true }
);

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
