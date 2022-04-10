// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// export type UserDocument = User & Document;

// @Schema({ discriminatorKey: 'email' })
// class User {
//   @Prop({ default: Date.now.toString() })
//   id?: string;

//   @Prop({ type: String, required: true, unique: true })
//   email: string;

//   @Prop({ type: String, required: true })
//   password?: string;

//   @Prop({ type: Number, required: true })
//   role: number;

//   @Prop({ type: String, required: false })
//   fullname?: string;

//   @Prop({ type: Boolean, required: true, default: true })
//   isActive?: boolean;

//   @Prop({ type: Boolean, required: true, default: false })
//   isDeleted?: boolean;

//   @Prop({ type: Date, required: true, default: Date.now })
//   createdDate?: Date;

//   @Prop({ type: String, required: false })
//   accessToken?: string;

//   @Prop({ type: String, required: false })
//   refreshToken?: string;
// }

// const UserSchema = SchemaFactory.createForClass(User);
// UserSchema.plugin(mongoosePaginate);
// const UserModel = mongoose.model('SampleModel', UserSchema);

interface User {
  id?: string;
  email: string;
  password?: string;
  role: number;
  isActive?: boolean;
  isDeleted?: boolean;
  fullname?: string;
  createdDate?: Date;
  accessToken?: string;
  refreshToken?: string;
}

const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, required: true },
  fullname: { type: String, required: false },
  isActive: { type: Boolean, required: true, default: true },
  isDeleted: { type: Boolean, required: true, default: false },
  createdDate: { type: Date, required: true, default: Date.now },
});

// UserSchema.plugin(mongoosePaginate);
// const UserModel = mongoose.model('SampleModel', UserSchema);

export { User, UserSchema };
