import { RequestHandler } from 'express';
import { userServices } from './user_services';

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body;

    const result = await userServices.createUser(payload);

    res.status(201).json({
      status_code: 201,
      status: true,
      message: 'User created successfully !',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
