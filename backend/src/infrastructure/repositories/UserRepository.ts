// import User, { IUser } from '../../domain/models/User';

// class UserRepository {
//   async findById(id: string): Promise<IUser | null> {
//     return User.findById(id);
//   }

//   async findByEmail(email: string): Promise<IUser | null> {
//     return User.findOne({ email });
//   }

//   async findAll(): Promise<IUser[]> {
//     return User.find();
//   }

//   async create(user: IUser): Promise<IUser> {
//     return User.create(user);
//   }

//   async update(id: string, user: Partial<IUser>): Promise<IUser | null> {
//     return User.findByIdAndUpdate(id, user, { new: true });
//   }

//   async delete(id: string): Promise<IUser | null> {
//     return User.findByIdAndDelete(id);
//   }
// }

// export default new UserRepository();

import User, { IUser } from '../../domain/models/User';

class UserRepository {
  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async findAll(): Promise<IUser[]> {
    return User.find();
  }

  async create(user: IUser): Promise<IUser> {
    return User.create(user);
  }

  async update(id: string, user: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(id);
  }
}

export default new UserRepository();
