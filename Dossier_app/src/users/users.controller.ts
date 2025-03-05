import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Render,
  Res,
  // Request,
  Req,
  // UseGuards,
  Session,
  Redirect,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from './users.service';
// import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
// import { url } from 'inspector';
// import { url } from 'inspector';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('register')
  @Render('register')
  getRegister() {}

  @Get('login')
  @Render('login')
  getLogin() {}

  @Get('user_profile')
  @Render('user_profile')
  getUser_profile() {}

  @Get('profile/:id')
  // @Render('user_profile')
  async getProfile(@Param('id') userId: string, @Res() res: Response) {
    const user = await this.usersService.getSingleUser(userId);
    return res.render('user_profile', user);
  }

  @Post('register')
  @Redirect()
  async addUser(
    @Body('name') userName: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
    @Body('password_confirm') userConfirm: string,
    @Body('number') userNumber: string,
    @Param('isAdmin') isAdmin: boolean,
    @Res() res: Response,
  ) {
    if (
      userName == undefined ||
      userEmail == undefined ||
      userPassword == undefined ||
      userConfirm == undefined ||
      userNumber == undefined
    ) {
      return res.render('register', {
        message: 'veuillez remplir tous les champs',
      });
    }

    if (userName.length < 3) {
      return res.render('register', {
        message: 'veuillez entrer un nom superieur ou egale à 3',
      });
    }

    if (userNumber.length < 10) {
      return res.render('register', {
        message: 'Entrez un numéro valide',
      });
    }
    if (userPassword.length < 8) {
      return res.render('register', {
        message: 'Le mot de passe ne peut avoir en dessous de 8 caractère',
      });
    }

    if (userPassword != userConfirm) {
      return res.render('register', {
        message: 'Mot de passe non conforme',
      });
    }
    await this.usersService.insertUser(
      userName,
      userEmail,
      userPassword,
      userNumber,
      isAdmin,
    );
    return { url: 'login' };
  }

  @Get('/Users')
  getAllUsers() {
    return this.usersService.getUsers();
  }

  @Get(':email')
  getUser(
    @Param('email') userEmail: string,
    // @Body('password') userPassword: string,
  ) {
    return this.usersService.getSingleUser(userEmail);
  }

  @Post('login')
  async connectuser(
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    const user = await this.usersService.findUsers(userEmail);

    if (user) {
      const hash = user?.password;
      const hashed = await bcrypt.compare(userPassword, hash);
      if (hashed) {
        // Enregistrement de la session
        session.isAdmin = user.isAdmin;
        session.user = user._id;
        session.connected = true;
        await session.save();
        console.log( session);
        
        return res.redirect('/');
      } else {
        return res.render('login', {
          message: 'Mot de passe non conforme',
        });
      }
    } else {
      return res.render('login', {
        message: "utilsateur n'existe pas, inscrivez-vous",
      });
    }
  }

  @Get('/logout')
  cookie(@Req() request: Request, @Res() response: Response) {
    console.log(request.cookies);
    response.cookie('key', 'value');
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('connect.sid'); 
    res.redirect('/');
  }


  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('userName') userUserName: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
    @Body('number') userNUmber: string,
    @Body('isAdmin') isAdmin: boolean,
  ) {
    const updatedUser = await this.usersService.updateUser(
      userId,
      userUserName,
      userEmail,
      userPassword,
      userNUmber,
      isAdmin,
    );
    return { message: 'User updated successfully', updatedUser };
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
    await this.usersService.deleteUser(userId);
    return { message: 'User deleted successfully' };
  }
}
