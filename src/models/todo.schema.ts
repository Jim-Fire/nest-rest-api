import * as mongoose from 'mongoose';
import * as timestamp from 'mongoose-timestamp';

export const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 128,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 1024,
  },
  assignee: [
    {
      type: String,
      required: true,
    },
  ],
  owner: {
    type: String,
    required: true,
  },
  list: {
    type: String,
    required: true,
  },
  comments: [{
    user: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 256,
    },
  }],
}, { versionKey: false });

TodoSchema.plugin(timestamp);