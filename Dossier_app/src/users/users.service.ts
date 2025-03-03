/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(
    username: string,
    email: string,
    password: string,
    number: string,
    isAdmin: boolean,
  ) {
    const outil = 10;
    const hashpassword = await bcrypt.hash(password, outil);
    const newUser = new this.userModel({
      username: username,
      email: email,
      password: hashpassword,
      number: number,
      isAdmin: isAdmin,
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    const count = await this.userModel.countDocuments();
    console.log(count);
    return users.map((user) => ({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      number: user.number,
      isAdmin: user.isAdmin,
    }));
  }
  async getUsersNumber() {
    const count = await this.userModel.countDocuments();
    return count;
  }

  async getSingleUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      number: user.number,
      isAdmin: user.isAdmin,
    };
  }
  async findUsers(email: string) {
    // console.log(email);
    const user = await this.userModel.findOne({ email: email });
    return user;
  }

  async updateUser(
    userId: string,
    username: string,
    email: string,
    password: string,
    number: string,
    isAdmin: boolean,
  ) {
    const updatedUser = await this.findUser(userId);
    if (username) {
      updatedUser.username = username;
    }
    if (email) {
      updatedUser.email = email;
    }
    if (password) {
      updatedUser.password = password;
    }
    if (number) {
      updatedUser.number = number;
    }
    if (isAdmin != null) {
      updatedUser.isAdmin = isAdmin;
    }
    const savedUser = await updatedUser.save();
    return savedUser;
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find user.');
    }
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (err) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  }
}
