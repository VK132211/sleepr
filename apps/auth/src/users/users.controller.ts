import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { CreateUerDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '../current-user.decorator';
import { UserDocument } from './models/user.schema';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}
    @Post()
    async createUser(@Body() createUserDto:CreateUerDto){
        return this.userService.create(createUserDto)

    }

   @Get()
   @UseGuards(JwtAuthGuard)
    async getUser(@CurrentUser() user:UserDocument){
        return user;
    }
}
