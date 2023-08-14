import express from "express";
import * as controller from './controller';
import * as utils from '../utils/handleErrors';
import * as validation from '../utils/validation';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/', utils.handleErrors(controller.getAllUsers));
router.get('/:id', utils.handleErrors(controller.getUserByUserId));
router.post('/', validation.validateUserBody, utils.handleErrors(controller.createUser));
router.put('/:id', validation.validateUserBody, utils.handleErrors(controller.updateUser));
router.delete('/:id', validation.validateUserBody, utils.handleErrors(controller.deleteUser));

export default router;
