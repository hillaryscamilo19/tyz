import mongoose, { Document, Schema } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    name: String,
  },
  { timestamps: true }
);

export default mongoose.models.Department || mongoose.model<IDepartment>('Department', DepartmentSchema);
