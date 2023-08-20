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
  Response,
} from 'tsoa';
import * as userService from './userService';
import { CreateUserRequest, UpdateUserRequest, User, UserRole } from '../models/user';
import { ApiError, ValidateErrorResponse, GenericErrorResponse } from '../utils/errorHandler';

@Route('users')
export class UsersController extends Controller {
  @Get()
  public async getAllUsers(
    @Query() role?: string
  ): Promise<User[]> {
    const data = await userService.findAll(role as UserRole);

    return data;
  }

  @Response<GenericErrorResponse>('404', 'Not found')
  @Get('{userId}')
  public async getUser(
    @Path() userId: string,
  ): Promise<User | ApiError> {
    const user = await userService.findOne({ id: userId });

    if (!user) {
      this.setStatus(404);
      return {
        message: 'Not found',
      }
    }

    return user;
  }

  @Response<ValidateErrorResponse>('400', 'Validation Error')
  @Response<GenericErrorResponse>('400', 'Username already exists')
  @SuccessResponse('201', 'Created')
  @Post()
  public async createUser(
    @Body() requestBody: CreateUserRequest
  ): Promise<User | ApiError> {

    const existing = await userService.findOne({ username: requestBody.username });
    if (existing) {
      this.setStatus(400);
      return {
        message: 'username already exists'
      };
    }

    await userService.createUser(requestBody);
    
    this.setStatus(201);

    const newUser = await userService.findOne({ username: requestBody.username });

    return newUser;
  }

  @Response<ValidateErrorResponse>('400', 'Validation Error')
  @Response<GenericErrorResponse>('404', 'Not Found')
  @Put('{userId}')
  public async updateUser(
    @Path() userId: string,
    @Body() requestBody: UpdateUserRequest,
  ): Promise<User | ApiError> {

    const existing = await userService.findOne({ id: userId });
    if (!existing) {
      this.setStatus(404);
      return {
        message: 'username not found',
      };
    }

    await userService.updateUser(requestBody);
    return {
      ...existing,
      email: requestBody.email,
      role: requestBody.role,
    };
  }

  @SuccessResponse('204', 'No Content')
  @Delete('{userId}')
  public async deleteUser(
    @Path() userId: string,
  ): Promise<void> {

    await userService.deleteUser(userId);

    this.setStatus(204);
  }
}
