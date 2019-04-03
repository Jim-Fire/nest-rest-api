import * as mongoose from 'mongoose';
import * as timestamp from 'mongoose-timestamp';

export const TodoListSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
    maxlength: 128,
  },
  color: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 128,
  }
}, { versionKey: false });

TodoListSchema.plugin(timestamp);