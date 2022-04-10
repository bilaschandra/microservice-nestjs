import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';

export type UserModel = PaginateModel<User>;

export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: UserModel) {}

  async create(user: User): Promise<User> {
    try {
      const newUser = new this.userModel({
        email: user.email,
        password: user.password,
        role: user.role,
        fullname: user.fullname,
      });
      return await newUser.save();
    } catch (error) {
      throw Error(`Error creating user: ${error}`);
    }
  }

  async createFromUser(user: User): Promise<User> {
    try {
      const newUser = new this.userModel({
        _id: user.id,
        email: user.email,
        password: user.password,
        role: user.role,
        fullname: user.fullname,
        isActive: user.isActive,
        isDeleted: user.isDeleted,
        createdDate: user.createdDate,
      });
      return await newUser.save();
    } catch (error) {
      throw Error(`Error creating user: ${error}`);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.userModel.findOne({ email });
    } catch (error) {
      throw Error(`Error finding user by email: ${error}`);
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      return await this.userModel.findOne({ _id: id });
    } catch (error) {
      throw Error(`Error finding user by email: ${error}`);
    }
  }

  async findAll(skip: number, take: number): Promise<Array<User>> {
    try {
      const result = await this.userModel.paginate({}, { offset: skip, limit: take });
      const { docs } = result;
      return docs;
    } catch (error) {
      throw Error(`Error finding user by email: ${error}`);
    }
  }

  async update(data: User): Promise<User | null> {
    try {
      console.log('data.id', data.id);
      return await this.userModel.findByIdAndUpdate(data.id || '', data, { new: true });
    } catch (error) {
      throw Error(`Error creating user: ${error}`);
    }
  }

  async delete(id: string): Promise<User | null> {
    try {
      return await this.userModel.findByIdAndUpdate(id, { isDeleted: true, isActive: false }, { new: true });
    } catch (error) {
      throw Error(`Error creating user: ${error}`);
    }
  }
}
