import { Request, Response, NextFunction } from 'express';
import * as postgresRepo from '../repo/postgresRepo';
import { User, UserRole } from '../models/user';

async function getAllUsers(req: Request, res: Response) {
  const data: User[] = await postgresRepo.findAll(req.query.role as UserRole);

  return res.status(200).json(data);
}

async function getUserByUserId(req: Request, res: Response) {
  const id = req.params.id;

  const result: User[] = await postgresRepo.findOne(id);

  if (!result.length) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(result[0]);
}

async function createUser(req: Request, res: Response) {
  const body: User = req.body;

  console.log({
    msg: 'create',
    body: req.body
  });

  try {
    await postgresRepo.createUser(body);
  } catch (err) {
    if (err.code === '23505') {
      throw({
        code: 400,
        message: 'username already exists',
        stack: err.stack,
      });
    }
    throw({
      message: 'error creating user',
      stack: err.stack
    });
  }

  return res.status(201).json({
    message: 'created',
    user: body
  });
}

async function updateUser(req: Request, res: Response) {
  const body: User = req.body;

  try {
    await postgresRepo.updateUser(body);
  } catch (err) {
    throw({
      message: 'error updating user',
      stack: err.stack
    });
  }

  return res.status(200).json({ 
    message: 'updated',
    user: body
  });
}

async function deleteUser(req: Request, res: Response) {
  const id: string = req.params.id;

  await postgresRepo.deleteUser(id);

  return res.status(204).end();
}

export {
  getAllUsers,
  getUserByUserId,
  createUser,
  updateUser,
  deleteUser
}