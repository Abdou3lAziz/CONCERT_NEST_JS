import { CreateAdminDto } from './dto/create-users-dto';
import { UpdateUsersDto } from './dto/update-admin.dto';
export declare class AdminService {
    create(CreateAdminDto: CreateAdminDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAdminDto: UpdateUsersDto): string;
    remove(id: number): string;
}
