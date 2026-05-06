import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum UserRole {
  JobSeeker = 'jobseeker',
  JobPoster = 'jobposter',
}

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_doc, ret: Record<string, unknown>) => {
      delete ret.password;
      delete ret.__v;
      return ret;
    },
  },
})
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true, index: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, enum: UserRole })
  role!: UserRole;

  @Prop({ trim: true })
  companyName?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
