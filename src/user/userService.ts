import * as postgresRepo from '../repo/postgresRepo';
import { CreateUserRequest, UpdateUserRequest, User, UserRole } from '../models/user';
import { QueryResult } from 'pg';

type UserOptions = {
  id: string,
  username?: string
} | {
  id?: string,
  username: string
}

async function findAll(role? : UserRole): Promise<User[]> {
  return postgresRepo.findAll(role);
}

async function findOne(options: UserOptions): Promise<User> {
  const {id, username} = options;

  let result: User[];

  if (id) {
    result = await postgresRepo.findById(id);
  } else if (username) {
    result = await postgresRepo.findByUsername(username);
  }

  if (result.length) {
    return result[0];
  }
  return null;
}

async function createUser(userBody: CreateUserRequest): Promise<QueryResult<any>> {  
  return postgresRepo.createUser(userBody);
}

async function updateUser(userBody: UpdateUserRequest): Promise<QueryResult<any>> {
  return postgresRepo.updateUser(userBody);
}

async function deleteUser(id: string): Promise<QueryResult<any>> {
  return await postgresRepo.deleteUser(id);
}

export {
  findAll,
  findOne,
  createUser,
  updateUser,
  deleteUser,
}