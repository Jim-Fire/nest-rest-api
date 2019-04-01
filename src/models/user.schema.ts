import * as mongoose from 'mongoose';
import * as timestamp from 'mongoose-timestamp';
import { ValidationError } from 'src/util';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    validate: {
      validator: v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
      message: props => `${props.value}${ValidationError.USER_EMAIL}`,
    },
    maxlength: 256,
    required: [true, ValidationError.USER_EMAIL_REQUIRED],
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    validate: {
      validator: v => /^[a-zA-Z]{3,128}$/.test(v),
      message: props => `${props.value}${ValidationError.USER_NAME}`,
    },
    minlength: 3,
    maxlength: 128,
    required: [true, ValidationError.USER_NAME_REQUIRED],
  },
  roles: [{
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  }],
});

UserSchema.plugin(timestamp);
