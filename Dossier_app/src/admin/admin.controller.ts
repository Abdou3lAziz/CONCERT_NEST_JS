import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Render,
  Redirect,
  // Req,
  Res,
} from '@nestjs/common';
// import { AdminService } from './admin.service';
import { UsersService } from '../users/users.service';
import { ReservationService } from '../reservation/reservation.service';
import { ConcertService } from '../concert/concert.service';
// import { CreateAdminDto } from './dto/create-users-dto';
// import { UpdateUsersDto } from './dto/update-admin.dto';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly UsersService: UsersService,
    private readonly reservationService: ReservationService,
    private readonly ConcertService: ConcertService,
  ) {}

  @Get('createUser')
  @Render('createUser')
  getRegister() {}

  @Get('dashboard')
  @Render('dashboard')
  async root() {
    const GetUsers = await this.UsersService.getUsers();
    const number = await this.UsersService.getUsersNumber();
    const numbers = await this.reservationService.getReservNumbers();
    const numb = await this.ConcertService.getConcertNumber();
    return {
      AllUsers: GetUsers,
      Numbre: number,
      Numbres: numbers,
      numbs: numb,
    };
  }

  @Post('createUser')
  @Redirect()
  async createUsers(
    @Body('name') userName: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
    @Body('password_confirm') userConfirm: string,
    @Body('number') userNumber: string,
    @Body('isAdmin') isAdmin: boolean,
    @Res() res: Response,
  ) {
    if (
      userName == undefined ||
      userEmail == undefined ||
      userPassword == undefined ||
      userConfirm == undefined ||
      userNumber == undefined ||
      userNumber == undefined
    ) {
      return res.render('createUser', {
        message: 'veuillez remplir tous les champs',
      });
    }

    if (userName.length < 3) {
      return res.render('createUser', {
        message: 'veuillez entrer un nom superieur ou egale à 3',
      });
    }

    if (userNumber.length < 10) {
      return res.render('createUser', {
        message: 'Entrez un numéro valide',
      });
    }
    if (userPassword.length < 8) {
      return res.render('createUser', {
        message: 'Le mot de passe ne peut avoir en dessous de 8 caractère',
      });
    }

    if (userPassword != userConfirm) {
      return res.render('createUser', {
        message: 'Mot de passe non conforme',
      });
    }
    const respo = await this.UsersService.insertUser(
      userName,
      userEmail,
      userPassword,
      userNumber,
      isAdmin,
    );
    console.log(respo);
    return { url: 'dashboard' };
  }

  @Get('all')
  async findAll() {
    const users = await this.UsersService.getUsers();
    return users;
  }

  // @Get('numb')
  // async usersnumbers() {
  //   const number = await this.UsersService.getUsersNumber();
  //   return number;
  // }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.UsersService.getSingleUser(id);
    console.log(user);
    return user;
  }

  @Patch(':id')
  @Redirect()
  async updateUser(
    @Param('id') id: string,
    @Body('name') userName: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
    @Body('number') userNumber: string,
    @Body('isAdmin') isAdmin: boolean,
    @Res() res: Response,
  ) {
    const updateResult = await this.UsersService.updateUser(
      id,
      userName,
      userEmail,
      userPassword,
      userNumber,
      isAdmin,
    );
    if (!updateResult) {
      return res.render('error', {
        message: 'update failed',
      });
    }
    console.log(userName, isAdmin);
    console.log(updateResult);
    return updateResult;
  }

  @Post('delete/:id')
  @Redirect()
  async removeUser(@Param('id') id: string) {
    await this.UsersService.deleteUser(id);
    return { url: '/admin/dashboard' };
  }
}
