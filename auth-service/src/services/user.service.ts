import { Injectable } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { UserRepository } from '../repositories/user.repository';
import { PublishService } from './publish.service';
import { generatePassword, comparePassword, generateToken } from '../utils';

@Injectable()
export class UserService {
  private publisher: (msg: string) => void;

  constructor(
    private readonly userRepo: UserRepository,
    pService: PublishService,
  ) {
    pService.execute().then((p) => (this.publisher = p));
  }

  async register(user: User): Promise<User> {
    user.password = generatePassword(user.password || '');
    const result = await this.userRepo.create(user);
    const payload = {
      action: 'CREATE',
      data: {
        id: result.id,
        email: result.email,
        password: result.password,
        role: result.role,
        fullname: result.fullname,
        isActive: result.isActive,
        isDeleted: result.isDeleted,
        createdDate: result.createdDate,
      },
    };
    this.publisher(JSON.stringify(payload));
    return result;
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw Error('User not found');
    }

    if (!comparePassword(password, user.password || '')) {
      throw Error('Wrong email or password');
    }

    const token = generateToken({ id: String(user.id), role: user.role });
    const loggedInUser: User = {
      id: user.id,
      email: user.email,
      role: user.role,
      fullname: user.fullname,
      isActive: user.isActive,
      createdDate: user.createdDate,
      accessToken: token,
    };
    return loggedInUser;
  }

  async createFromUser(user: User): Promise<User> {
    return this.userRepo.createFromUser(user);
  }

  async update(user: User): Promise<User | null> {
    return this.userRepo.update(user);
  }

  async delete(id: string): Promise<User | null> {
    return this.userRepo.delete(id);
  }
}
