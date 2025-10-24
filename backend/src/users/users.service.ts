import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: any): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    const result = await this.userRepository.insert(user);
    const userId = result.identifiers[0].id;
    return await this.userRepository.findOne({ where: { id: userId } }) as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateData: Partial<User>): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;
    // hash the updated password
    if ((updateData as any).password) {
      const hashed = await bcrypt.hash((updateData as any).password, 10);
      (updateData as any).password = hashed;
    }
    Object.assign(user, updateData);
    await this.userRepository.save(user);
    return this.userRepository.findOne({ where: { id } }) as Promise<User>;
  }
}
