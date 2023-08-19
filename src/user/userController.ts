import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Delete,
  Query,
  Route,
  SuccessResponse,
} from 'tsoa';
import * as userService from './userService';
import { User, UserRole } from '../models/user';

@Route("users")
export class UsersController extends Controller {
  @Get()
  public async getAllUsers(
    @Query() role?: string
  ): Promise<User[]> {
    const data = await userService.findAll(role as UserRole);

    return data;
  }

  @Get("{userId}")
  public async getUser(
    @Path() userId: string,
  ): Promise<User> {
    const user = await userService.findOne({ id: userId });

    if (!user) {
      this.setStatus(404);
    }

    return user;
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async createUser(
    @Body() requestBody: User
  ): Promise<void> {

    const existing = await userService.findOne({ username: requestBody.username });
    if (existing) {
      this.setStatus(400);
      return;
    }

    await userService.createUser(requestBody);
    
    this.setStatus(201);
  }

  @Put("{userId}")
  public async updateUser(
    @Path() userId: string,
    @Body() requestBody: User,
  ): Promise<void> {

    const existing = await userService.findOne({ id: userId });
    console.log(existing);
    if (!existing) {
      this.setStatus(404);
      return;
    }

    await userService.updateUser(requestBody);
  }

  @SuccessResponse("204", "No Content")
  @Delete("{userId}")
  public async deleteUser(
    @Path() userId: string,
  ): Promise<void> {

    await userService.deleteUser(userId);

    this.setStatus(204);
  }
}
