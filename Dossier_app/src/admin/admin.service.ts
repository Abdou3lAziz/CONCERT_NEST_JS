import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-users-dto';
import { UpdateUsersDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  create(CreateAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateUsersDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
