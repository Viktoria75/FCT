// import { Schema, model, Document } from 'mongoose';

// export interface IUser extends Document {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

// const userSchema = new Schema<IUser>({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// export default model<IUser>('User', userSchema);
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'user' | 'admin'; // Define role as 'user' or 'admin'
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' } // Default role is 'user'
});

export default model<IUser>('User', userSchema);

