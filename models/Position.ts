import mongoose, { Schema, Document } from 'mongoose';

export interface IPosition extends Document {
  title: string;
  isActive: boolean;
  /** Short blurb for careers cards */
  summary: string;
  /** Material Symbols icon name (e.g. computer, work) */
  icon: string;
  /** Display tags e.g. department, location */
  tags: string[];
  /** Longer description for admin / future detail views */
  description: string;
  category: 'engineering' | 'security' | 'operations';
  createdAt?: Date;
  updatedAt?: Date;
}

const PositionSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Position title is required'],
      trim: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    summary: {
      type: String,
      default: '',
      trim: true,
    },
    icon: {
      type: String,
      default: 'work',
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: '',
    },
    /** Filter bucket: Engineering / Security / Operations (careers UI) */
    category: {
      type: String,
      enum: ['engineering', 'security', 'operations'],
      default: 'engineering',
    },
  },
  {
    timestamps: true,
  }
);

const Position = mongoose.models.Position || mongoose.model<IPosition>('Position', PositionSchema);

export default Position;
